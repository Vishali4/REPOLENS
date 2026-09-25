"""Repository Scanner for RepoLens.

Analyzes GitHub repository file trees, identifies programming languages,
counts files and directories, and detects important files and directories.
"""

import os
from collections import Counter
from typing import Any, Dict, Iterable, List, Set, Tuple


class RepositoryScanner:
    """Scans and analyzes repository file trees."""

    # Directories that should be ignored during analysis
    IGNORED_DIRECTORIES: Set[str] = {
        ".git",
        "node_modules",
        "__pycache__",
        ".venv",
        "venv",
        "dist",
        "build",
        ".idea",
        ".vscode",
        ".next",
        ".nuxt",
        "target",
        "coverage",
        ".pytest_cache",
        ".mypy_cache",
        "eggs",
        ".eggs",
    }

    # Common programming language extension mappings
    EXTENSION_LANGUAGE_MAP: Dict[str, str] = {
        ".py": "Python",
        ".js": "JavaScript",
        ".jsx": "JavaScript",
        ".mjs": "JavaScript",
        ".cjs": "JavaScript",
        ".ts": "TypeScript",
        ".tsx": "TypeScript",
        ".java": "Java",
        ".cpp": "C++",
        ".cc": "C++",
        ".cxx": "C++",
        ".hpp": "C++",
        ".h": "C",
        ".c": "C",
        ".html": "HTML",
        ".htm": "HTML",
        ".css": "CSS",
        ".scss": "SCSS",
        ".sass": "Sass",
        ".less": "Less",
        ".go": "Go",
        ".rs": "Rust",
        ".php": "PHP",
        ".rb": "Ruby",
        ".swift": "Swift",
        ".kt": "Kotlin",
        ".kts": "Kotlin",
        ".scala": "Scala",
        ".sh": "Shell",
        ".bash": "Shell",
        ".zsh": "Shell",
        ".sql": "SQL",
        ".dart": "Dart",
        ".cs": "C#",
        ".r": "R",
        ".lua": "Lua",
        ".vue": "Vue",
    }

    # Filenames considered important for repository architecture & build setup
    IMPORTANT_FILE_NAMES: Set[str] = {
        "readme.md",
        "readme",
        "readme.txt",
        "readme.rst",
        "requirements.txt",
        "pyproject.toml",
        "setup.py",
        "setup.cfg",
        "pipfile",
        "package.json",
        "package-lock.json",
        "yarn.lock",
        "pnpm-lock.yaml",
        "dockerfile",
        "docker-compose.yml",
        "docker-compose.yaml",
        "cargo.toml",
        "go.mod",
        "go.sum",
        "pom.xml",
        "build.gradle",
        "build.gradle.kts",
        ".env.example",
        "license",
        "license.md",
        "license.txt",
        "makefile",
        "cmakeLists.txt",
    }

    # Directory names that signal key application architecture
    IMPORTANT_DIRECTORY_NAMES: Set[str] = {
        "src",
        "backend",
        "frontend",
        "app",
        "api",
        "routes",
        "services",
        "controllers",
        "models",
        "components",
        "lib",
        "core",
        "tests",
        "test",
        "docs",
        "config",
        "utils",
        "analyzer",
        "public",
        "scripts",
    }

    def is_ignored_path(self, path: str) -> bool:
        """Check if any segment in the path belongs to ignored directories."""
        segments = path.replace("\\", "/").strip("/").split("/")
        return any(segment.lower() in self.IGNORED_DIRECTORIES for segment in segments)

    def scan_tree_items(self, items: Iterable[Tuple[str, str]]) -> Dict[str, Any]:
        """Scan a collection of (path, item_type) tuples.

        item_type: 'blob' for files, 'tree' for directories.
        """
        total_files = 0
        total_directories = 0
        language_counts: Counter[str] = Counter()
        important_files: List[str] = []
        important_directories: Set[str] = set()

        seen_files: Set[str] = set()

        for path, item_type in items:
            normalized_path = path.replace("\\", "/").strip("/")

            # Skip ignored paths
            if self.is_ignored_path(normalized_path):
                continue

            if item_type == "blob":
                total_files += 1
                filename = os.path.basename(normalized_path)
                _, ext = os.path.splitext(filename)
                ext = ext.lower()

                # Detect programming language
                if ext in self.EXTENSION_LANGUAGE_MAP:
                    lang = self.EXTENSION_LANGUAGE_MAP[ext]
                    language_counts[lang] += 1

                # Detect important files
                if filename.lower() in self.IMPORTANT_FILE_NAMES:
                    # Prefer root-level basename or relative path for nested important files
                    if filename not in seen_files:
                        important_files.append(filename)
                        seen_files.add(filename)

            elif item_type == "tree":
                total_directories += 1
                dirname = os.path.basename(normalized_path)
                if dirname.lower() in self.IMPORTANT_DIRECTORY_NAMES:
                    important_directories.add(dirname)

        # Sort languages by count descending
        sorted_languages = dict(
            sorted(language_counts.items(), key=lambda item: item[1], reverse=True)
        )

        # Sort important directories alphabetically
        sorted_directories = sorted(list(important_directories))

        return {
            "total_files": total_files,
            "total_directories": total_directories,
            "languages": sorted_languages,
            "important_files": important_files,
            "important_directories": sorted_directories,
        }

    def scan_github_repository(self, repo: Any) -> Dict[str, Any]:
        """Scan a PyGithub Repository object using the Git Tree API."""
        default_branch = repo.default_branch or "main"
        
        try:
            git_tree = repo.get_git_tree(sha=default_branch, recursive=True)
            items = [(element.path, element.type) for element in git_tree.tree]
            return self.scan_tree_items(items)
        except Exception:
            # Fallback for empty repository or failed recursive git tree:
            # Traverse repository contents at root level
            items = []
            try:
                contents = repo.get_contents("")
                while contents:
                    file_content = contents.pop(0)
                    if file_content.type == "dir":
                        items.append((file_content.path, "tree"))
                        if not self.is_ignored_path(file_content.path):
                            try:
                                contents.extend(repo.get_contents(file_content.path))
                            except Exception:
                                pass
                    else:
                        items.append((file_content.path, "blob"))
            except Exception:
                pass
            return self.scan_tree_items(items)
