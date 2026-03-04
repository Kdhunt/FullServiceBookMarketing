"""Shared pytest fixtures."""

import pytest

from app import create_app, db as _db


@pytest.fixture(scope="session")
def app():
    """Create application for testing."""
    _app = create_app("testing")
    with _app.app_context():
        _db.create_all()
        yield _app
        _db.drop_all()


@pytest.fixture()
def client(app):
    """Test client for the application."""
    return app.test_client()


@pytest.fixture(autouse=True)
def clean_db(app):
    """Roll back database changes after each test."""
    with app.app_context():
        yield
        _db.session.rollback()
