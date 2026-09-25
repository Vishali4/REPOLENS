import sys
from pathlib import Path

# Add backend and root directory to sys.path so app and analyzer are found
ROOT_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = ROOT_DIR / "backend"
for path in [str(BACKEND_DIR), str(ROOT_DIR)]:
    if path not in sys.path:
        sys.path.insert(0, path)

from unittest.mock import MagicMock, patch
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.services.github_service import (
    GitHubNotFoundError,
    GitHubService,
    InvalidGitHubURLError,
)
from analyzer.repository_scanner import RepositoryScanner

client = TestClient(app)


def test_read_root():
    """Test the root endpoint returns 200 and expected greeting."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "RepoLens API is running"}


def test_health_check():
    """Test the health check endpoint returns 200 and healthy status."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_analyze_invalid_url_format():
    """Test analyze endpoint returns 400 when an invalid URL format is provided."""
    response = client.post(
        "/api/repositories/analyze",
        json={"github_url": "invalid-url"},
    )
    assert response.status_code == 400
    assert "detail" in response.json()


def test_analyze_non_github_url():
    """Test analyze endpoint returns 400 when a non-GitHub URL is provided."""
    response = client.post(
        "/api/repositories/analyze",
        json={"github_url": "https://gitlab.com/owner/repo"},
    )
    assert response.status_code == 400
    assert "detail" in response.json()


def test_analyze_missing_body():
    """Test analyze endpoint returns 422 Unprocessable Entity when body is missing."""
    response = client.post("/api/repositories/analyze", json={})
    assert response.status_code == 422


def test_github_service_url_extraction():
    """Test owner and repo extraction from various URL formats."""
    valid_cases = [
        ("https://github.com/octocat/Hello-World", ("octocat", "Hello-World")),
        ("https://github.com/octocat/Hello-World/", ("octocat", "Hello-World")),
        ("https://github.com/octocat/Hello-World.git", ("octocat", "Hello-World")),
        ("http://github.com/octocat/Hello-World", ("octocat", "Hello-World")),
        ("github.com/octocat/Hello-World", ("octocat", "Hello-World")),
        ("https://www.github.com/octocat/Hello-World", ("octocat", "Hello-World")),
    ]

    for url, expected in valid_cases:
        assert GitHubService.extract_owner_and_repo(url) == expected

    invalid_cases = [
        "",
        "https://google.com/foo/bar",
        "https://github.com",
        "https://github.com/only-owner",
    ]

    for url in invalid_cases:
        with pytest.raises(InvalidGitHubURLError):
            GitHubService.extract_owner_and_repo(url)


def test_repository_scanner_tree_items():
    """Test that repository scanner accurately counts files, detects languages, and ignores directories."""
    scanner = RepositoryScanner()

    items = [
        ("src/main.py", "blob"),
        ("src/utils.py", "blob"),
        ("frontend/index.js", "blob"),
        ("frontend/app.jsx", "blob"),
        ("frontend/style.css", "blob"),
        ("index.html", "blob"),
        ("README.md", "blob"),
        ("requirements.txt", "blob"),
        ("package.json", "blob"),
        # Ignored files/directories
        (".git/config", "blob"),
        ("node_modules/express/index.js", "blob"),
        ("backend/__pycache__/main.cpython-312.pyc", "blob"),
        (".venv/lib/python.py", "blob"),
        # Directories
        ("src", "tree"),
        ("frontend", "tree"),
        ("backend", "tree"),
        ("node_modules", "tree"),
    ]

    result = scanner.scan_tree_items(items)

    assert result["total_files"] == 9  # 9 valid files (excluding ignored ones)
    assert result["total_directories"] == 3  # src, frontend, backend (excluding node_modules)

    # Check languages detected
    assert result["languages"]["Python"] == 2
    assert result["languages"]["JavaScript"] == 2
    assert result["languages"]["HTML"] == 1
    assert result["languages"]["CSS"] == 1

    # Check important files detected
    assert "README.md" in result["important_files"]
    assert "requirements.txt" in result["important_files"]
    assert "package.json" in result["important_files"]

    # Check important directories detected
    assert "src" in result["important_directories"]
    assert "frontend" in result["important_directories"]
    assert "backend" in result["important_directories"]


@patch("app.routes.repositories.GitHubService")
@patch("app.routes.repositories.RepositoryScanner")
def test_analyze_repository_success_mocked(mock_scanner_cls, mock_service_cls):
    """Test successful repository analysis endpoint using mocked services."""
    mock_service = MagicMock()
    mock_service_cls.return_value = mock_service

    # Mock PyGithub Repository
    mock_repo = MagicMock()
    mock_repo.name = "Hello-World"
    mock_repo.full_name = "octocat/Hello-World"
    mock_repo.description = "My first repo"
    mock_repo.private = False
    mock_repo.default_branch = "main"
    mock_repo.stargazers_count = 100
    mock_repo.forks_count = 25
    mock_repo.open_issues_count = 4
    mock_repo.language = "Python"

    mock_service.get_pygithub_repo.return_value = mock_repo

    # Mock Scanner
    mock_scanner = MagicMock()
    mock_scanner_cls.return_value = mock_scanner
    mock_scanner.scan_github_repository.return_value = {
        "total_files": 12,
        "total_directories": 3,
        "languages": {"Python": 10, "HTML": 2},
        "important_files": ["README.md", "requirements.txt"],
        "important_directories": ["src"],
    }

    response = client.post(
        "/api/repositories/analyze",
        json={"github_url": "https://github.com/octocat/Hello-World"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["repository"]["name"] == "Hello-World"
    assert data["repository"]["stars"] == 100
    assert data["analysis"]["total_files"] == 12
    assert data["analysis"]["languages"]["Python"] == 10
    assert "README.md" in data["analysis"]["important_files"]


@patch("app.routes.repositories.GitHubService")
def test_analyze_repository_not_found(mock_service_cls):
    """Test 404 response when repository is not found."""
    mock_service = MagicMock()
    mock_service_cls.return_value = mock_service
    mock_service.get_pygithub_repo.side_effect = GitHubNotFoundError("GitHub repository not found")

    response = client.post(
        "/api/repositories/analyze",
        json={"github_url": "https://github.com/octocat/nonexistent-repo"},
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "GitHub repository not found"}
