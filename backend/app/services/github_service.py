"""GitHub Service for interacting with GitHub REST API via PyGithub."""

import re
from typing import Any, Dict, Optional, Tuple
from urllib.parse import urlparse
from github import Auth, Github, GithubException, RateLimitExceededException
from app.config import settings


class GitHubServiceError(Exception):
    """Base exception for GitHub service errors."""
    pass


class InvalidGitHubURLError(GitHubServiceError):
    """Raised when the provided GitHub URL is malformed or invalid."""
    pass


class GitHubNotFoundError(GitHubServiceError):
    """Raised when the repository cannot be found (404)."""
    pass


class GitHubAuthError(GitHubServiceError):
    """Raised when GitHub authentication fails (401/403)."""
    pass


class GitHubRateLimitError(GitHubServiceError):
    """Raised when GitHub API rate limits are exceeded."""
    pass


class GitHubAPIError(GitHubServiceError):
    """Raised when an unexpected GitHub API error occurs."""
    pass


class GitHubService:
    """Service to interact with GitHub API and extract repository data."""

    def __init__(self, token: Optional[str] = None) -> None:
        """Initialize GitHub client with optional token."""
        self._token = token if token is not None else settings.GITHUB_TOKEN
        if self._token:
            auth = Auth.Token(self._token)
            # retry=None prevents PyGithub from sleeping for minutes on rate limit
            self._client = Github(auth=auth, retry=None)
        else:
            # Unauthenticated client (fail fast on 60 req/hr rate limit)
            self._client = Github(retry=None)

    @staticmethod
    def extract_owner_and_repo(github_url: str) -> Tuple[str, str]:
        """Extract owner and repository name from a GitHub URL.

        Supported formats:
        - https://github.com/owner/repo
        - http://github.com/owner/repo
        - github.com/owner/repo
        - https://github.com/owner/repo.git
        - https://github.com/owner/repo/
        """
        if not github_url or not isinstance(github_url, str):
            raise InvalidGitHubURLError("A GitHub repository URL is required.")

        cleaned = github_url.strip()

        # Handle git@ SSH style URLs if provided
        if cleaned.startswith("git@github.com:"):
            path = cleaned[len("git@github.com:"):]
        else:
            if not cleaned.startswith(("http://", "https://")):
                cleaned = "https://" + cleaned

            parsed = urlparse(cleaned)
            hostname = (parsed.netloc or "").lower()
            if hostname not in ("github.com", "www.github.com"):
                raise InvalidGitHubURLError(
                    "Invalid URL. Only github.com repositories are supported (e.g. https://github.com/owner/repo)."
                )
            path = parsed.path.strip("/")

        parts = [segment for segment in path.split("/") if segment]
        if len(parts) < 2:
            raise InvalidGitHubURLError(
                "Invalid GitHub repository URL. Expected format: https://github.com/owner/repository"
            )

        owner = parts[0].strip()
        repo = parts[1].strip()

        if repo.endswith(".git"):
            repo = repo[:-4]

        # Validate owner and repo name format (letters, numbers, hyphens, underscores, dots)
        name_pattern = re.compile(r"^[a-zA-Z0-9_\-\.]+$")
        if not name_pattern.match(owner) or not name_pattern.match(repo):
            raise InvalidGitHubURLError("Repository owner and name must contain valid alphanumeric characters.")

        return owner, repo

    def get_pygithub_repo(self, github_url: str):
        """Fetch the PyGithub Repository instance with sanitized error handling."""
        owner, repo_name = self.extract_owner_and_repo(github_url)
        full_name = f"{owner}/{repo_name}"

        try:
            return self._client.get_repo(full_name)
        except RateLimitExceededException as exc:
            raise GitHubRateLimitError(
                "GitHub API rate limit reached (60/60 unauthenticated requests used). "
                "Add your free GITHUB_TOKEN to .env for 5,000 requests/hr."
            ) from exc
        except GithubException as exc:
            # Never expose tokens or sensitive data in errors
            if exc.status == 404:
                raise GitHubNotFoundError("GitHub repository not found or is private.") from exc
            if exc.status == 401:
                raise GitHubAuthError("GitHub authentication failed. Please check your GITHUB_TOKEN.") from exc
            if exc.status == 403:
                error_msg = str(getattr(exc, 'data', '')).lower()
                if 'rate limit' in error_msg:
                    raise GitHubRateLimitError(
                        "GitHub API rate limit reached. Add your free GITHUB_TOKEN to .env."
                    ) from exc
                raise GitHubAuthError("GitHub access forbidden. Check token permissions or rate limits.") from exc
            raise GitHubAPIError(f"GitHub API error occurred (status {exc.status}).") from exc
        except Exception as exc:
            raise GitHubAPIError("Failed to communicate with GitHub API.") from exc

    def get_repository_info(self, github_url: str) -> Dict[str, Any]:
        """Fetch standardized metadata for a given GitHub repository URL."""
        repo = self.get_pygithub_repo(github_url)

        return {
            "name": repo.name,
            "full_name": repo.full_name,
            "description": repo.description or "",
            "private": repo.private,
            "default_branch": repo.default_branch or "main",
            "stars": repo.stargazers_count,
            "forks": repo.forks_count,
            "open_issues": repo.open_issues_count,
            "language": repo.language or "Unknown",
        }
