# API Design Guide

## REST Conventions
| Action | Method | Path | Status |
|--------|--------|------|--------|
| List | GET | `/api/v1/transactions` | 200 |
| Read | GET | `/api/v1/transactions/:id` | 200, 404 |
| Create | POST | `/api/v1/transactions` | 201, 400, 409 |
| Update | PUT | `/api/v1/transactions/:id` | 200, 404 |
| Partial | PATCH | `/api/v1/transactions/:id` | 200, 404 |
| Delete | DELETE | `/api/v1/transactions/:id` | 204, 404 |

## Response Envelope
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalCount": 142
  }
}
```

## Error Response
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "field": "amount", "message": "Must be positive" }
    ]
  }
}
```

## Pagination
- Use cursor-based pagination for large/real-time datasets
- Use offset-based pagination for admin/dashboard views
- Always include `totalCount` for offset pagination
- Default page size: 20, max: 100

## Idempotency
For payment endpoints, require `Idempotency-Key` header:
```
POST /api/v1/payments
Idempotency-Key: unique-client-generated-uuid
```
- Store the response keyed by idempotency key
- Return cached response for duplicate requests
- Expire keys after 24 hours

## Versioning
- Use URL path versioning: `/api/v1/`, `/api/v2/`
- Support previous version for minimum 6 months after deprecation
- Return `Deprecation` header on sunset-bound endpoints

## Rate Limiting
- Return `429 Too Many Requests` with `Retry-After` header
- Use sliding window algorithm
- Different limits per endpoint sensitivity (auth endpoints: stricter)
