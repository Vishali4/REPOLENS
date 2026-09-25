/**
 * Mock data for RepoLens Frontend.
 * Centralized data store for repository details, analytics, architecture, and AI assistant.
 */

export const mockRepository = {
  name: "repolens",
  owner: "vishali",
  full_name: "vishali/repolens",
  description: "AI-Powered GitHub Repository Intelligence Platform — analyze codebases, inspect architecture, detect dependencies, and query repositories.",
  default_branch: "main",
  stars: 1420,
  forks: 215,
  open_issues: 14,
  language: "Python",
  primary_language: "Python",
  private: false,
  html_url: "https://github.com/vishali/repolens",
  license: "Apache 2.0",
  last_commit: "2 hours ago",
  created_at: "2024-02-10",
  contributors_count: 8,
};

export const mockStatistics = [
  {
    id: "files",
    label: "Total Files",
    value: "42",
    description: "Source code & asset files",
    icon: "FileCode2",
    change: "+4 this week",
  },
  {
    id: "languages",
    label: "Languages",
    value: "5",
    description: "Detected programming languages",
    icon: "Code2",
    change: "Python primary",
  },
  {
    id: "dependencies",
    label: "Dependencies",
    value: "18",
    description: "Backend & frontend packages",
    icon: "Package",
    change: "100% healthy",
  },
  {
    id: "directories",
    label: "Directories",
    value: "8",
    description: "Organized module folders",
    icon: "FolderGit2",
    change: "Modular layout",
  },
];

export const mockLanguages = [
  { name: "Python", percentage: 60, files: 25, color: "#8B5CF6" },
  { name: "JavaScript", percentage: 25, files: 10, color: "#A855F7" },
  { name: "HTML", percentage: 8, files: 4, color: "#C084FC" },
  { name: "CSS", percentage: 5, files: 2, color: "#6366F1" },
  { name: "Other", percentage: 2, files: 1, color: "#4C1D95" },
];

export const mockFileTree = [
  {
    id: "src",
    name: "src",
    type: "directory",
    children: [
      {
        id: "src-components",
        name: "components",
        type: "directory",
        children: [
          { id: "navbar", name: "Navbar.jsx", type: "file", size: "3.2 KB", language: "JavaScript" },
          { id: "dashboard", name: "Dashboard.jsx", type: "file", size: "4.8 KB", language: "JavaScript" },
          { id: "filetree", name: "FileTree.jsx", type: "file", size: "2.9 KB", language: "JavaScript" },
          { id: "langchart", name: "LanguageChart.jsx", type: "file", size: "3.5 KB", language: "JavaScript" },
          { id: "statcard", name: "StatCard.jsx", type: "file", size: "1.8 KB", language: "JavaScript" },
        ],
      },
      {
        id: "src-services",
        name: "services",
        type: "directory",
        children: [
          { id: "api-js", name: "api.js", type: "file", size: "2.1 KB", language: "JavaScript" },
        ],
      },
      { id: "app-jsx", name: "App.jsx", type: "file", size: "3.4 KB", language: "JavaScript" },
      { id: "main-jsx", name: "main.jsx", type: "file", size: "1.1 KB", language: "JavaScript" },
      { id: "index-css", name: "index.css", type: "file", size: "2.8 KB", language: "CSS" },
    ],
  },
  {
    id: "backend",
    name: "backend",
    type: "directory",
    children: [
      {
        id: "backend-app",
        name: "app",
        type: "directory",
        children: [
          { id: "main-py", name: "main.py", type: "file", size: "2.4 KB", language: "Python" },
          { id: "config-py", name: "config.py", type: "file", size: "1.9 KB", language: "Python" },
          {
            id: "routes",
            name: "routes",
            type: "directory",
            children: [
              { id: "repo-routes", name: "repositories.py", type: "file", size: "4.1 KB", language: "Python" },
            ],
          },
          {
            id: "services",
            name: "services",
            type: "directory",
            children: [
              { id: "github-srv", name: "github_service.py", type: "file", size: "4.6 KB", language: "Python" },
            ],
          },
        ],
      },
      { id: "requirements", name: "requirements.txt", type: "file", size: "148 B", isImportant: true },
    ],
  },
  {
    id: "analyzer",
    name: "analyzer",
    type: "directory",
    children: [
      { id: "scanner-py", name: "repository_scanner.py", type: "file", size: "5.2 KB", language: "Python" },
      { id: "code-py", name: "code_analyzer.py", type: "file", size: "1.2 KB", language: "Python" },
      { id: "dep-py", name: "dependency_analyzer.py", type: "file", size: "1.1 KB", language: "Python" },
    ],
  },
  { id: "readme", name: "README.md", type: "file", size: "6.8 KB", isImportant: true },
  { id: "pkg-json", name: "package.json", type: "file", size: "840 B", isImportant: true },
  { id: "license", name: "LICENSE", type: "file", size: "11.5 KB" },
  { id: "env-example", name: ".env.example", type: "file", size: "416 B", isImportant: true },
];

export const mockImportantFiles = [
  { name: "README.md", path: "README.md", type: "Documentation", size: "6.8 KB" },
  { name: "requirements.txt", path: "backend/requirements.txt", type: "Python Dependencies", size: "148 B" },
  { name: "package.json", path: "package.json", type: "Node Manifest", size: "840 B" },
  { name: "main.py", path: "backend/app/main.py", type: "API Entrypoint", size: "2.4 KB" },
  { name: "repository_scanner.py", path: "analyzer/repository_scanner.py", type: "Analysis Engine", size: "5.2 KB" },
];

export const mockImportantDirectories = [
  { name: "src", description: "Frontend React interface components & state", count: 12 },
  { name: "backend", description: "FastAPI server, routes, and services", count: 8 },
  { name: "analyzer", description: "Deterministic AST scanner & language detector", count: 4 },
  { name: "tests", description: "Automated test suite and fixtures", count: 5 },
];

export const mockReadmeContent = `# RepoLens

> **AI-Powered GitHub Repository Intelligence Platform**  
> Transform complex codebases into structured insights, interactive architecture graphs, and context-grounded AI intelligence.

## Overview
RepoLens is a developer intelligence platform that ingests any public or private GitHub repository to analyze code quality, dependencies, module interactions, and project architecture.

### Key Features
- **Deterministic Static Scanner**: Traverses Git tree hierarchies without downloading heavy blobs.
- **Language & Metric Profiling**: Quantifies extension distributions and file sizes.
- **Component Relationship Graphs**: Visualizes frontend, backend, and external API interfaces.
- **Context-Grounded AI Assistant**: Answers repository questions with direct references to actual source code.
`;

export const mockAnalysis = {
  metrics: [
    { label: "Code Quality", value: "87%", status: "success", detail: "High test coverage & clear lint compliance" },
    { label: "Complexity", value: "Low", status: "success", detail: "Low cyclomatic complexity across modules" },
    { label: "Potential Issues", value: "4", status: "warning", detail: "Minor dependency updates recommended" },
    { label: "Maintainability", value: "82%", status: "success", detail: "Modular directory separation & low coupling" },
  ],
  insights: [
    { type: "positive", text: "Clean and modular project structure with strict domain boundaries." },
    { type: "positive", text: "Decoupled FastAPI service layer with clean route delegation." },
    { type: "positive", text: "Zero credential leaks: Environment configurations load safely from .env." },
    { type: "warning", text: "3 dependencies have minor security patches available upstream." },
    { type: "warning", text: "2 files in the analyzer module exceed 150 lines and may benefit from decomposition." },
    { type: "error", text: "End-to-end integration test coverage for tree recursion needs automated mock verification." },
  ],
};

export const mockDependencies = [
  { name: "FastAPI", version: "0.115.0", type: "Backend", status: "Healthy", license: "MIT", latest: "0.115.0", ecosystem: "Python / PyPI" },
  { name: "React", version: "18.3.1", type: "Frontend", status: "Healthy", license: "MIT", latest: "19.0.0", ecosystem: "Node / npm" },
  { name: "PyGithub", version: "2.5.0", type: "Backend", status: "Healthy", license: "LGPL-3.0", latest: "2.5.0", ecosystem: "Python / PyPI" },
  { name: "Lucide React", version: "0.460.0", type: "Frontend", status: "Healthy", license: "ISC", latest: "0.460.0", ecosystem: "Node / npm" },
  { name: "Uvicorn", version: "0.32.0", type: "Backend", status: "Healthy", license: "BSD-3-Clause", latest: "0.32.0", ecosystem: "Python / PyPI" },
  { name: "Tailwind CSS", version: "3.4.17", type: "Frontend", status: "Healthy", license: "MIT", latest: "3.4.17", ecosystem: "Node / npm" },
  { name: "Pydantic", version: "2.9.2", type: "Backend", status: "Healthy", license: "MIT", latest: "2.9.2", ecosystem: "Python / PyPI" },
  { name: "React Router", version: "6.28.0", type: "Frontend", status: "Healthy", license: "MIT", latest: "6.28.0", ecosystem: "Node / npm" },
  { name: "Python-Dotenv", version: "1.0.1", type: "Backend", status: "Healthy", license: "BSD-3-Clause", latest: "1.0.1", ecosystem: "Python / PyPI" },
  { name: "HTTPX", version: "0.27.2", type: "Backend", status: "Healthy", license: "BSD-3-Clause", latest: "0.27.2", ecosystem: "Python / PyPI" },
];

export const mockArchitecture = {
  layers: [
    {
      name: "Client Layer",
      role: "User Interaction & Visualization",
      nodes: [
        { id: "react", title: "React Single Page App", tech: "React 18 + Vite", detail: "Interactive dashboard, graphs, and chat UI" },
        { id: "tailwind", title: "Design System", tech: "Tailwind CSS", detail: "Dark Black + Purple glowing aesthetic" },
      ],
    },
    {
      name: "API & Gateway Layer",
      role: "Routing & Security",
      nodes: [
        { id: "fastapi", title: "FastAPI Backend", tech: "FastAPI / Uvicorn", detail: "Asynchronous REST endpoints, CORS, Swagger docs" },
        { id: "config", title: "Config Guard", tech: "python-dotenv", detail: "Sanitizes tokens and prevents secret leaks" },
      ],
    },
    {
      name: "Analysis Engine",
      role: "Deterministic Code Inspection",
      nodes: [
        { id: "scanner", title: "Repository Scanner", tech: "PyGithub + Tree Parser", detail: "Recursive Git tree inspection & language detection" },
        { id: "analyzer", title: "Code & Dependency Engine", tech: "AST Analyzer", detail: "Calculates complexity, file metrics, and dependencies" },
      ],
    },
    {
      name: "External Services",
      role: "External Data Integration",
      nodes: [
        { id: "github-api", title: "GitHub REST API", tech: "api.github.com", detail: "Authenticated repository metadata and commit history" },
      ],
    },
  ],
};

export const mockAIResponses = {
  "Explain this repository": `**RepoLens** is an AI-powered GitHub repository intelligence platform.

### Core Architecture:
1. **Frontend**: Built with **React 18, Vite, and Tailwind CSS**, featuring an intuitive Black + Purple developer theme with interactive graphs.
2. **Backend**: Powered by **FastAPI and Uvicorn**, serving asynchronous REST endpoints for repository metadata and file hierarchy scanning.
3. **Scanner**: Uses **PyGithub** and deterministic file tree algorithms to detect programming languages, filter build artifacts (like \`node_modules\` and \`.git\`), and surface critical project manifests.`,

  "How does the backend work?": `The backend follows a clean, decoupled service architecture:

- **Entrypoint (\`main.py\`)**: Initializes FastAPI, attaches CORS middleware, and mounts API routers.
- **Configuration (\`config.py\`)**: Loads environment variables safely from \`.env\` and validates configuration without ever printing or leaking secrets.
- **GitHub Service (\`github_service.py\`)**: Authenticates with GitHub API using tokens or anonymous fallback, extracting repository owners and names.
- **Repository Route (\`repositories.py\`)**: Exposes \`POST /api/repositories/analyze\`, validating requests with Pydantic and returning structured JSON.`,

  "Explain the architecture": `RepoLens operates on a four-tier architecture:

1. **Presentation Tier**: React SPA with Tailwind CSS, providing dashboards, language donut charts, and an interactive file tree.
2. **Gateway Tier**: FastAPI REST API providing route validation, error shielding, and automated OpenAPI documentation.
3. **Analysis Tier**: Custom repository scanner executing tree traversal, language extension mapping, and key file heuristics.
4. **Integration Tier**: GitHub REST API communicating via PyGithub for real-time repository metadata.`,

  "Find potential issues": `Based on the repository scan, here are notable observations:

- ⚠️ **Dependency Maintenance**: 3 dependencies have minor security patches available upstream.
- ⚠️ **File Size Decompositions**: \`repository_scanner.py\` contains multiple mapping dictionaries and could be modularized into a dedicated constants module.
- 💡 **Rate Limiting**: Without a configured \`GITHUB_TOKEN\`, GitHub limits requests to 60/hour. Adding a personal access token increases this to 5,000/hour.`,

  "What technologies are used?": `### Primary Technology Stack:

- **Languages**: Python (60%), JavaScript (25%), HTML (8%), CSS (5%)
- **Backend**: FastAPI, Uvicorn, PyGithub, Python-Dotenv, Pydantic
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, React Router
- **Testing**: Pytest, HTTPX TestClient
- **Design System**: Custom Black + Purple glowing dark theme`,
};

export const defaultAIResponse = `I've analyzed the repository structure. RepoLens is designed with a modular architecture featuring a React frontend, a FastAPI backend, and a specialized GitHub repository analysis engine. Feel free to ask about specific files, dependencies, or architectural connections!`;
