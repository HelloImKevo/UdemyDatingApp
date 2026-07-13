---
name: fullstack-web
description: "Full-stack web development workflow — TypeScript, React, Next.js, Node.js, Spring Boot, .NET, REST APIs, database design. Use when building web features, APIs, frontend components, or full-stack features."
---

# Full-Stack Web Development Skill

## When to Use
- Building new web pages, components, or features
- Creating or modifying REST/GraphQL API endpoints
- Working with databases (schema changes, queries, migrations)
- Setting up authentication, authorization, or middleware
- Configuring build tools, bundlers, or deployment

## Architecture Patterns

### Frontend (React/Next.js)
```
src/
├── app/              # Next.js App Router pages
├── components/       # Shared UI components
│   ├── ui/           # Design system primitives
│   └── features/     # Feature-specific composed components
├── hooks/            # Custom React hooks
├── lib/              # Utilities, API clients, constants
├── types/            # TypeScript type definitions
└── styles/           # Global styles, theme tokens
```

### Backend (Node.js/Spring Boot)
```
src/
├── controllers/      # Request handlers (thin — delegate to services)
├── services/         # Business logic
├── repositories/     # Data access layer
├── models/           # Domain models / entities
├── middleware/        # Auth, validation, error handling, logging
├── config/           # App configuration
└── types/            # Shared type definitions
```

## Procedure

### New API Endpoint
1. Define the API contract: method, path, request body, response shape, error codes
2. Add input validation at the controller level (Zod, class-validator, Bean Validation)
3. Implement business logic in the service layer
4. Add database queries in the repository layer (parameterized — never string concat)
5. Write integration tests hitting the endpoint
6. Document the endpoint (OpenAPI/Swagger or inline docs)

### New Frontend Feature
1. Design the component tree and data flow
2. Define TypeScript interfaces for props and API responses
3. Implement data fetching (React Query / Server Components)
4. Build UI components with proper loading, error, and empty states
5. Write component tests with React Testing Library
6. Verify accessibility (keyboard navigation, screen reader, contrast)

### Database Migration
1. Create a new migration file (timestamped, descriptive name)
2. Write the `up` migration (additive changes preferred)
3. Write the `down` migration (rollback capability)
4. Test migration on a fresh database and on existing data
5. Review for index needs, constraint changes, data backfill

## Security Checklist (Every Endpoint)
- [ ] Input validated and sanitized
- [ ] Authentication verified
- [ ] Authorization checked (user can access this resource)
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (output encoding)
- [ ] Rate limiting applied
- [ ] CORS configured correctly
- [ ] Sensitive data not in response unless needed

## References
- [React Patterns](./references/react-patterns.md)
- [API Design Guide](./references/api-design.md)
