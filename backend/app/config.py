"""Configuration management for RepoLens backend.

Loads environment variables safely and defines application settings.
"""

import json
import os
from pathlib import Path
from typing import List, Optional
from dotenv import load_dotenv

# Locate project root (REPOLENS) to find .env file
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
ENV_PATH = PROJECT_ROOT / ".env"

# Load environment variables from .env if present
if ENV_PATH.exists():
    load_dotenv(dotenv_path=ENV_PATH)
else:
    load_dotenv()


class Settings:
    """Application settings class loaded from environment variables."""

    def __init__(self) -> None:
        self.ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development").strip()
        self.SECRET_KEY: str = os.getenv("SECRET_KEY", "change_this_to_a_secure_random_string").strip()
        self.DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL")
        
        # GitHub configuration
        github_token = os.getenv("GITHUB_TOKEN", "").strip()
        # Treat placeholder value as empty
        if github_token == "your_github_personal_access_token_here":
            github_token = ""
        self.GITHUB_TOKEN: Optional[str] = github_token if github_token else None

        # LLM configuration (reserved for future phases)
        self.LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "gemini").strip()
        llm_api_key = os.getenv("LLM_API_KEY", "").strip()
        if llm_api_key == "your_llm_api_key_here":
            llm_api_key = ""
        self.LLM_API_KEY: Optional[str] = llm_api_key if llm_api_key else None

        # CORS Origins configuration
        self.BACKEND_CORS_ORIGINS: List[str] = self._parse_cors_origins(
            os.getenv("BACKEND_CORS_ORIGINS", '["http://localhost:3000","http://localhost:5173"]')
        )

        self._validate_required_settings()

    def _parse_cors_origins(self, raw_cors: str) -> List[str]:
        """Safely parse CORS origins from JSON list or comma-separated string."""
        if not raw_cors:
            return ["http://localhost:3000", "http://localhost:5173"]
        try:
            parsed = json.loads(raw_cors)
            if isinstance(parsed, list):
                return [str(origin).strip() for origin in parsed]
        except (json.JSONDecodeError, TypeError):
            # Fallback to comma-separated parsing
            return [origin.strip() for origin in raw_cors.split(",") if origin.strip()]
        return ["http://localhost:3000", "http://localhost:5173"]

    def _validate_required_settings(self) -> None:
        """Validate critical settings without leaking sensitive information."""
        if not self.SECRET_KEY:
            raise ValueError("Configuration Error: SECRET_KEY must not be empty.")
        if self.ENVIRONMENT == "production" and self.SECRET_KEY == "change_this_to_a_secure_random_string":
            raise ValueError("Configuration Error: Default SECRET_KEY cannot be used in production.")

    @property
    def is_development(self) -> bool:
        """Check if current environment is development."""
        return self.ENVIRONMENT.lower() == "development"

    def __repr__(self) -> str:
        """Safe string representation that hides sensitive credentials."""
        masked_github = "***" if self.GITHUB_TOKEN else "None"
        masked_llm = "***" if self.LLM_API_KEY else "None"
        return (
            f"<Settings environment='{self.ENVIRONMENT}', "
            f"github_token_configured={bool(self.GITHUB_TOKEN)}, "
            f"cors_origins={self.BACKEND_CORS_ORIGINS}>"
        )


# Global settings instance
settings = Settings()
