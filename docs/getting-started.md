# Getting Started

## Prerequisites

- Python 3.12+
- Docker & Docker Compose (recommended)
- PostgreSQL 16 (if running without Docker)

## Run with Docker Compose

```bash
docker compose up --build
```

The API will be available at <http://localhost:8000>.

## Run Locally (without Docker)

### 1. Create a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements-dev.txt
```

### 3. Set environment variables

```bash
export FLASK_ENV=development
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/bookmarketing_dev
export SECRET_KEY=your-secret-key
```

### 4. Apply database migrations

```bash
flask db upgrade
```

### 5. Start the development server

```bash
flask run
```

## Running Tests

```bash
pytest
```

## Code Quality

```bash
# Format code
black app/ tests/ wsgi.py

# Lint
flake8 app/ tests/ wsgi.py
```
