"""Database models for the book marketing application."""

from datetime import datetime, timezone

from app import db


class Book(db.Model):
    """Represents a book available for marketing services."""

    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    isbn = db.Column(db.String(20), unique=True, nullable=True)
    description = db.Column(db.Text, nullable=True)
    published_at = db.Column(db.Date, nullable=True)
    created_at = db.Column(
        db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False
    )
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    campaigns = db.relationship("Campaign", back_populates="book", lazy=True)

    def to_dict(self) -> dict:
        """Serialize the model to a dictionary."""
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "isbn": self.isbn,
            "description": self.description,
            "published_at": (
                self.published_at.isoformat() if self.published_at else None
            ),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

    def __repr__(self) -> str:
        return f"<Book {self.title!r} by {self.author!r}>"


class Campaign(db.Model):
    """Represents a marketing campaign for a book."""

    __tablename__ = "campaigns"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), nullable=False, default="draft")
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)
    created_at = db.Column(
        db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False
    )
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    book = db.relationship("Book", back_populates="campaigns")

    def to_dict(self) -> dict:
        """Serialize the model to a dictionary."""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "status": self.status,
            "book_id": self.book_id,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

    def __repr__(self) -> str:
        return f"<Campaign {self.name!r} (status={self.status!r})>"
