"""API routes for repository analysis."""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from analyzer.repository_scanner import RepositoryScanner
from app.services.github_service import (
    GitHubAPIError,
    GitHubAuthError,
    GitHubNotFoundError,
    GitHubRateLimitError,
    GitHubService,
    InvalidGitHubURLError,
)

router = APIRouter()


class RepositoryAnalyzeRequest(BaseModel):
    """Request payload for repository analysis."""

    github_url: str = Field(
        ...,
        description="Public GitHub repository URL (e.g., https://github.com/octocat/Hello-World)",
        examples=["https://github.com/octocat/Hello-World"],
    )


class RepositoryMetadata(BaseModel):
    """Metadata details of the GitHub repository."""

    name: str
    full_name: str
    description: Optional[str] = ""
    private: Optional[bool] = False
    default_branch: str = "main"
    stars: int = 0
    forks: int = 0
    open_issues: Optional[int] = 0
    language: Optional[str] = "Unknown"


class RepositoryAnalysisDetails(BaseModel):
    """Structural analysis details of the repository."""

    total_files: int
    total_directories: int
    languages: Dict[str, int]
    important_files: List[str]
    important_directories: List[str]


class RepositoryAnalyzeResponse(BaseModel):
    """Combined response payload for repository analysis."""

    repository: RepositoryMetadata
    analysis: RepositoryAnalysisDetails


@router.post(
    "/analyze",
    response_model=RepositoryAnalyzeResponse,
    status_code=status.HTTP_200_OK,
    summary="Analyze a GitHub repository",
    description="Fetches repository information and performs structural, language, and file analysis.",
)
def analyze_repository(request: RepositoryAnalyzeRequest) -> RepositoryAnalyzeResponse:
    """Analyze a GitHub repository from its URL.

    1. Validates the GitHub URL.
    2. Connects to GitHub API and fetches repository metadata.
    3. Scans repository tree to count files/directories and detect languages.
    4. Identifies key configuration files and important directories.
    5. Returns a structured JSON response.
    """
    github_service = GitHubService()
    scanner = RepositoryScanner()

    # Step 1 & 2: Fetch PyGithub repository and metadata
    try:
        repo = github_service.get_pygithub_repo(request.github_url)
        repo_metadata = {
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
    except InvalidGitHubURLError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc) or "Invalid repository URL",
        ) from exc
    except GitHubAuthError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="GitHub authentication problem. Check your GITHUB_TOKEN.",
        ) from exc
    except GitHubNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="GitHub repository not found",
        ) from exc
    except GitHubRateLimitError as exc:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="GitHub API rate limit exceeded. Please configure a personal access token.",
        ) from exc
    except GitHubAPIError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error communicating with GitHub API.",
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unexpected server error while fetching repository.",
        ) from exc

    # Step 3 & 4: Scan repository structure
    try:
        analysis_data = scanner.scan_github_repository(repo)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unexpected server error while scanning repository files.",
        ) from exc

    # Step 5: Return combined JSON response
    return RepositoryAnalyzeResponse(
        repository=RepositoryMetadata(**repo_metadata),
        analysis=RepositoryAnalysisDetails(**analysis_data),
    )
