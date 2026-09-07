# SAGAR AI Backend

This folder is a Spring Boot backend package added to the recovered GitHub Pages site.

## Important recovery note
The original Rocket.new HAR capture did **not** contain the original backend source tree, Maven/Gradle project, database schema, or server code. Therefore this backend is a clean Spring Boot implementation based on the SAGAR AI stack discussed for the project (Java/Spring Boot, JPA/Hibernate, PostgreSQL) rather than a byte-for-byte recovery of the original backend.

## Packages
- `config` — CORS and password encoding
- `controller` — REST endpoints
- `dto` — API request/response models
- `entity` — JPA entities
- `repository` — Spring Data JPA repositories
- `service` — business logic
- `exception` — API error handling

## Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET/POST /api/vessels`
- `GET/POST /api/ports`
- `GET /api/freight/quotes`
- `POST /api/freight/optimize`

Default development database is H2. Set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` for PostgreSQL.

GitHub Pages cannot execute this Java backend. Run it separately on a Java-capable server and point the frontend API calls to that server when real server-side authentication is required.
