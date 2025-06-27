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
```

## Installation

```bash
npm install
```

##Run Development Server
```bash
npm run dev
```

##Running with Docker
```bash
docker build -t my-nextapp .
docker run -p 3000:3000 --env-file .env my-nextapp
```

##Project Structure
```bash
/app                    # Next.js app router directory
/pages/api/auth         # NextAuth.js API routes
/pages/api/rolePermission # Role permissions API (mock/simulation)
/components             # React components
/lib/services           # Role service and helpers
/middleware.ts          # Authorization middleware
/Dockerfile             # Docker image configuration
/docker-compose.yml     # Docker Compose configuration
/.env                   # Environment variables
```

---
## Middleware and Authorization

-Middleware verifies JWT token on each request.
-Role-based access is checked dynamically via cached permissions fetched from API.
-Public paths (login, auth API) are open.
-Unauthorized or unauthenticated users get redirected accordingly.
-Prevents logged-in users from accessing login page unnecessarily.
---

## Logout Handling with Auth0

-Custom /api/auth/logout endpoint redirects to Auth0’s logout endpoint to clear cookies both on app domain and Auth0 domain.

-Ensures proper sign-out without automatic re-login.
---

## 12Factor App Compliance

-Configuration stored in environment variables.
-Stateless service design.
-Separate dev, test, and production environments.
-Logs output to console for centralized logging.
---

##Contact
Şamil Algül - samilalgul@softcaveware.com