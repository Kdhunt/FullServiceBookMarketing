"""Tests for the main routes."""


def test_index(client):
    """GET / returns a 200 JSON health-check response."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "ok"


class TestBooks:
    """Tests for /books endpoints."""

    def test_list_books_empty(self, client):
        """GET /books returns an empty list when no books exist."""
        response = client.get("/books")
        assert response.status_code == 200
        assert response.get_json() == []

    def test_create_book(self, client):
        """POST /books creates a new book and returns 201."""
        payload = {"title": "Marketing Your Book", "author": "Jane Author"}
        response = client.post("/books", json=payload)
        assert response.status_code == 201
        data = response.get_json()
        assert data["title"] == "Marketing Your Book"
        assert data["author"] == "Jane Author"
        assert data["id"] is not None

    def test_create_book_missing_fields(self, client):
        """POST /books without required fields returns 400."""
        response = client.post("/books", json={"title": "No Author"})
        assert response.status_code == 400

    def test_get_book(self, client):
        """GET /books/<id> returns the requested book."""
        create_resp = client.post(
            "/books", json={"title": "Test Book", "author": "Test Author"}
        )
        book_id = create_resp.get_json()["id"]

        response = client.get(f"/books/{book_id}")
        assert response.status_code == 200
        assert response.get_json()["id"] == book_id

    def test_get_book_not_found(self, client):
        """GET /books/<id> with unknown ID returns 404."""
        response = client.get("/books/99999")
        assert response.status_code == 404


class TestCampaigns:
    """Tests for /campaigns endpoints."""

    def test_list_campaigns_empty(self, client):
        """GET /campaigns returns an empty list when no campaigns exist."""
        response = client.get("/campaigns")
        assert response.status_code == 200
        assert response.get_json() == []

    def test_create_campaign(self, client):
        """POST /campaigns creates a campaign linked to a book."""
        book_resp = client.post(
            "/books", json={"title": "Campaign Book", "author": "Campaign Author"}
        )
        book_id = book_resp.get_json()["id"]

        payload = {"name": "Summer Promo", "book_id": book_id}
        response = client.post("/campaigns", json=payload)
        assert response.status_code == 201
        data = response.get_json()
        assert data["name"] == "Summer Promo"
        assert data["book_id"] == book_id
        assert data["status"] == "draft"

    def test_create_campaign_missing_fields(self, client):
        """POST /campaigns without required fields returns 400."""
        response = client.post("/campaigns", json={"name": "No Book"})
        assert response.status_code == 400

    def test_create_campaign_invalid_book(self, client):
        """POST /campaigns with a non-existent book_id returns 404."""
        response = client.post(
            "/campaigns", json={"name": "Ghost Campaign", "book_id": 99999}
        )
        assert response.status_code == 404

    def test_get_campaign_not_found(self, client):
        """GET /campaigns/<id> with unknown ID returns 404."""
        response = client.get("/campaigns/99999")
        assert response.status_code == 404
