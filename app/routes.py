"""Application routes / views."""

from flask import Blueprint, jsonify, request

from app import db
from app.models import Book, Campaign

main = Blueprint("main", __name__)


@main.get("/")
def index():
    """Health-check / landing endpoint."""
    return jsonify({"message": "Full Service Book Marketing API", "status": "ok"})


# ---------------------------------------------------------------------------
# Books
# ---------------------------------------------------------------------------


@main.get("/books")
def list_books():
    """Return all books."""
    books = db.session.execute(db.select(Book).order_by(Book.id)).scalars().all()
    return jsonify([b.to_dict() for b in books])


@main.post("/books")
def create_book():
    """Create a new book."""
    data = request.get_json(force=True)
    required = ("title", "author")
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    book = Book(
        title=data["title"],
        author=data["author"],
        isbn=data.get("isbn"),
        description=data.get("description"),
        published_at=data.get("published_at"),
    )
    db.session.add(book)
    db.session.commit()
    return jsonify(book.to_dict()), 201


@main.get("/books/<int:book_id>")
def get_book(book_id: int):
    """Return a single book by ID."""
    book = db.session.get(Book, book_id)
    if book is None:
        return jsonify({"error": "Book not found"}), 404
    return jsonify(book.to_dict())


# ---------------------------------------------------------------------------
# Campaigns
# ---------------------------------------------------------------------------


@main.get("/campaigns")
def list_campaigns():
    """Return all campaigns."""
    campaigns = (
        db.session.execute(db.select(Campaign).order_by(Campaign.id)).scalars().all()
    )
    return jsonify([c.to_dict() for c in campaigns])


@main.post("/campaigns")
def create_campaign():
    """Create a new marketing campaign."""
    data = request.get_json(force=True)
    required = ("name", "book_id")
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    book = db.session.get(Book, data["book_id"])
    if book is None:
        return jsonify({"error": "Book not found"}), 404

    campaign = Campaign(
        name=data["name"],
        description=data.get("description"),
        status=data.get("status", "draft"),
        book_id=data["book_id"],
    )
    db.session.add(campaign)
    db.session.commit()
    return jsonify(campaign.to_dict()), 201


@main.get("/campaigns/<int:campaign_id>")
def get_campaign(campaign_id: int):
    """Return a single campaign by ID."""
    campaign = db.session.get(Campaign, campaign_id)
    if campaign is None:
        return jsonify({"error": "Campaign not found"}), 404
    return jsonify(campaign.to_dict())
