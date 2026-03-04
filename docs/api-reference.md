# API Reference

Base URL: `http://localhost:8000`

## Health Check

### `GET /`

Returns the API status.

**Response**

```json
{"message": "Full Service Book Marketing API", "status": "ok"}
```

---

## Books

### `GET /books`

Returns a list of all books.

### `POST /books`

Creates a new book.

**Request Body**

| Field         | Type   | Required | Description                   |
|---------------|--------|----------|-------------------------------|
| title         | string | ✅        | Book title                    |
| author        | string | ✅        | Author name                   |
| isbn          | string | ❌        | ISBN-13 identifier            |
| description   | string | ❌        | Short description             |
| published_at  | string | ❌        | Publication date (YYYY-MM-DD) |

### `GET /books/<id>`

Returns a single book by ID.

---

## Campaigns

### `GET /campaigns`

Returns a list of all campaigns.

### `POST /campaigns`

Creates a new marketing campaign.

**Request Body**

| Field       | Type    | Required | Description                      |
|-------------|---------|----------|----------------------------------|
| name        | string  | ✅        | Campaign name                    |
| book_id     | integer | ✅        | ID of the associated book        |
| description | string  | ❌        | Campaign description             |
| status      | string  | ❌        | `draft` (default), `active`, etc.|

### `GET /campaigns/<id>`

Returns a single campaign by ID.
