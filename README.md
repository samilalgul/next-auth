# Next.js Auth0 OAuth + JWT Role-Based Authentication

This project implements a role-based authentication and authorization system using Next.js 14+ (App Router), Auth0 as OAuth provider, NextAuth.js for JWT-based session management, and middleware for route protection. The architecture follows SOLID principles and 12Factor app methodology.

---

## Features

- Auth0 OAuth integration
- JWT-based session handling with NextAuth.js
- Role-based access control (e.g., admin, user)
- Dynamic route protection via Next.js Middleware
- 12Factor App compliant configuration
- TailwindCSS powered modern login page
- Docker & Docker Compose support for easy dev/prod setups
- Code quality best practices & validation tests

---

## Technologies

- Next.js 14+ (App Router)
- NextAuth.js
- Auth0 OAuth Provider
- JSON Web Tokens (JWT)
- TypeScript
- TailwindCSS
- Docker & Docker Compose

---

## Getting Started

### Requirements

- Node.js 18+
- Docker (optional, for containerized environment)
- Auth0 account and application credentials

### Environment Variables (`.env`)

```env
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
AUTH0_ISSUER_BASE_URL=https://your-auth0-domain/
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
ROLE_CACHE_TTL=300000  # Cache duration for role permissions in milliseconds (optional)
BASE_URL=domain-where-project-deployed