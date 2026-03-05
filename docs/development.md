# Development Guide

## Project Structure

```
FullServiceBookMarketing/
├── app/
│   ├── __init__.py      # Application factory
│   ├── config.py        # Configuration classes
│   ├── models.py        # SQLAlchemy models
│   └── routes.py        # Flask blueprints / routes
├── tests/
│   ├── conftest.py      # pytest fixtures
│   └── test_routes.py   # Route tests
├── docs/                # MkDocs documentation source
├── .github/
│   └── workflows/
│       └── ci.yml       # GitHub Actions CI/CD
├── Dockerfile
├── docker-compose.yml
├── mkdocs.yml
├── pyproject.toml       # Black configuration
├── requirements.txt
├── requirements-dev.txt
├── setup.cfg            # flake8 & pytest configuration
└── wsgi.py              # WSGI entry point
```

## Technology Stack

| Concern          | Tool / Library          |
|------------------|-------------------------|
| Language         | Python 3.12             |
| Web Framework    | Flask 3.x               |
| ORM              | SQLAlchemy 2.x          |
| Database         | PostgreSQL 16           |
| Migrations       | Flask-Migrate           |
| Testing          | pytest + pytest-cov     |
| Linting          | flake8                  |
| Formatting       | black                   |
| Containerization | Docker / Docker Compose |
| CI/CD            | GitHub Actions          |
| Documentation    | MkDocs Material         |

## CI/CD Pipeline

Every push and pull request triggers:

1. **Lint job** – runs `flake8` and `black --check`
2. **Test job** – runs `pytest` with coverage reporting (SQLite in-memory DB)
