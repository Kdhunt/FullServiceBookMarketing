"""Flask application factory."""

import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()


def create_app(config_name: str | None = None) -> Flask:
    """Create and configure the Flask application."""
    app = Flask(__name__, instance_relative_config=True)

    # Load configuration
    if config_name is None:
        config_name = os.environ.get("FLASK_ENV", "development")

    from app.config import config_map

    app.config.from_object(config_map[config_name])

    # Ensure the instance folder exists
    os.makedirs(app.instance_path, exist_ok=True)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    from app.routes import main as main_blueprint

    app.register_blueprint(main_blueprint)

    return app
