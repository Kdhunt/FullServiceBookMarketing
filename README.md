# Full Service Book Marketing

A RESTful API platform for managing books and marketing campaigns, built with
**Python 3.12**, **Flask**, **SQLAlchemy**, and **PostgreSQL**.

[![CI](https://github.com/Kdhunt/FullServiceBookMarketing/actions/workflows/ci.yml/badge.svg)](https://github.com/Kdhunt/FullServiceBookMarketing/actions/workflows/ci.yml)

## Tech Stack

| Concern          | Tool / Library          |
|------------------|-------------------------|
| Language         | Python 3.12             |
| Web Framework    | Flask 3.x               |
| ORM              | SQLAlchemy 2.x          |
| Database         | PostgreSQL 16           |
| Migrations       | Flask-Migrate (Alembic) |
| Testing          | pytest + pytest-cov     |
| Linting          | flake8                  |
| Formatting       | black                   |
| Containerization | Docker / Docker Compose |
| CI/CD            | GitHub Actions          |
| Documentation    | MkDocs Material         |

## Quick Start

### With Docker Compose

```bash
docker compose up --build
```

The API will be available at <http://localhost:8000>.

### Without Docker

```bash
# Create & activate virtual environment
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements-dev.txt

# Set environment variables
export FLASK_ENV=development
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/bookmarketing_dev
export SECRET_KEY=your-secret-key

# Apply database migrations
flask db upgrade

# Start the development server
flask run
```

## Running Tests

```bash
pytest
```

## Code Quality

```bash
black app/ tests/ wsgi.py   # format
flake8 app/ tests/ wsgi.py  # lint
```

## Documentation

```bash
mkdocs serve   # live-reload docs at http://127.0.0.1:8080
```

## API Endpoints

| Method | Path                | Description              |
|--------|---------------------|--------------------------|
| GET    | /                   | Health check             |
| GET    | /books              | List all books           |
| POST   | /books              | Create a book            |
| GET    | /books/\<id\>       | Get a book               |
| GET    | /campaigns          | List all campaigns       |
| POST   | /campaigns          | Create a campaign        |
| GET    | /campaigns/\<id\>   | Get a campaign           |

## License

See [LICENSE](LICENSE).