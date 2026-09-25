"""RepoLens FastAPI Application.

Main entrypoint for the RepoLens backend service.
"""

import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure the project root is added to sys.path so 'analyzer' is importable
# regardless of whether the app is started from REPOLENS/ or REPOLENS/backend/
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# Also ensure backend directory is in sys.path
BACKEND_DIR = Path(__file__).resolve().parent.parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from app.config import settings
from app.routes.repositories import router as repositories_router

# Initialize FastAPI application
app = FastAPI(
    title="RepoLens API",
    description=(
        "RepoLens is an AI-powered GitHub Repository Intelligence Platform. "
        "Phase 1 provides repository analysis, file structure inspection, "
        "and programming language detection."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(repositories_router, prefix="/api/repositories", tags=["Repositories"])


@app.get(
    "/",
    summary="Root Endpoint",
    description="Returns backend status confirmation.",
    tags=["General"],
)
def read_root():
    """Return welcome message indicating the API is running."""
    return {"message": "RepoLens API is running"}


@app.get(
    "/health",
    summary="Health Check",
    description="Returns health status of the application.",
    tags=["General"],
)
def health_check():
    """Health check endpoint for monitoring."""
    return {"status": "healthy"}
