# RepoLens

RepoLens is an AI-powered GitHub Repository Intelligence Platform designed to automatically inspect GitHub repositories, analyze code structures, identify programming languages, quantify file distributions, and detect architectural components.

---

## Current Features (Phase 1)

- **FastAPI Backend**: High-performance, modular Python backend with asynchronous support and automated OpenAPI documentation.
- **GitHub Repository Analysis**: Direct integration with the GitHub REST API using PyGithub to retrieve repository metadata and tree hierarchies.
- **Repository Metadata Extraction**: Extracts owner, repository name, description, stars, forks, default branch, and visibility status.
- **File and Directory Analysis**: Traverses git trees to calculate total files and directories while ignoring build/vendor artifacts (such as `node_modules/`, `.git/`, and `__pycache__/`).
- **Programming Language Detection**: Maps file extensions to programming languages and computes repository language breakdowns.
- **Key File & Architecture Detection**: Identifies critical setup files (`README.md`, `requirements.txt`, `package.json`, `Dockerfile`, etc.) and core architectural directories (`src`, `backend`, `frontend`, etc.).

---

## Project Structure

```text
REPOLENS/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # FastAPI entrypoint & middleware
│   │   ├── config.py                  # Secure configuration & environment loader
│   │   │
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── repositories.py        # POST /api/repositories/analyze endpoint
│   │   │
│   │   └── services/
│   │       ├── __init__.py
│   │       └── github_service.py      # PyGithub service & error handling
│   │
│   └── requirements.txt               # Backend dependencies
│
├── analyzer/
│   ├── __init__.py
│   ├── repository_scanner.py          # File tree, language & architecture scanner
│   ├── code_analyzer.py               # Placeholder for AST analysis (Phase 2)
│   └── dependency_analyzer.py         # Placeholder for dependency graph (Phase 2)
│
├── tests/
│   ├── __init__.py
│   └── test_api.py                    # Automated test suite
│
├── frontend/                          # Reserved for Phase 3 UI
│
├── .env                               # Local environment variables (not in git)
├── .env.example                       # Environment template
├── .gitignore                         # Git exclusion rules
├── README.md                          # Project documentation
└── LICENSE                            # License file
```

---

## Running Locally

Follow these steps to set up and run RepoLens on your local machine:

### 1. Create a Virtual Environment

Open your terminal in the `REPOLENS` root directory and run:

```bash
# Windows (PowerShell / CMD)
python -m venv venv

# macOS / Linux
python3 -m venv venv
```

### 2. Activate the Virtual Environment

```bash
# Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# Windows (Command Prompt)
.\venv\Scripts\activate.bat

# macOS / Linux
source venv/bin/activate
```

### 3. Install Dependencies

Install the required packages from `backend/requirements.txt`:

```bash
pip install -r backend/requirements.txt
```

### 4. Configure Environment Variables

Create your local `.env` file from `.env.example`:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

### 5. Add GitHub Token (Optional for public repositories)

Open `.env` in your editor and configure your GitHub personal access token:

```env
GITHUB_TOKEN=ghp_your_actual_token_here
```

> **Note:** A GitHub token is optional for scanning public repositories, but highly recommended to avoid GitHub's unauthenticated rate limit (60 requests/hour vs 5,000 requests/hour).

### 6. Start the FastAPI Server

Navigate to the `backend` directory (or run from root with Python path):

```bash
cd backend
uvicorn app.main:app --reload
```

The backend server will start at:
- **API URL**: [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Alternative ReDoc Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## API Endpoints

### 1. Health Check
- **Endpoint**: `GET /health`
- **Response**:
```json
{
  "status": "healthy"
}
```

### 2. Service Verification
- **Endpoint**: `GET /`
- **Response**:
```json
{
  "message": "RepoLens API is running"
}
```

### 3. Analyze Repository
- **Endpoint**: `POST /api/repositories/analyze`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "github_url": "https://github.com/octocat/Hello-World"
}
```
- **Response (200 OK)**:
```json
{
  "repository": {
    "name": "Hello-World",
    "full_name": "octocat/Hello-World",
    "description": "My first repository on GitHub!",
    "private": false,
    "default_branch": "master",
    "stars": 2400,
    "forks": 1800,
    "open_issues": 12,
    "language": "C"
  },
  "analysis": {
    "total_files": 4,
    "total_directories": 0,
    "languages": {
      "C": 1
    },
    "important_files": [
      "README"
    ],
    "important_directories": []
  }
}
```

---

## Running Automated Tests

Run the test suite using `pytest`:

```bash
python -m pytest tests/ -v
```
