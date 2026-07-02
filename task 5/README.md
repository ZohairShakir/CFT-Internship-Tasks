# Task Management API

A RESTful Task Management API built with **NestJS** and **TypeScript**, featuring JWT-based authentication and role-based access control (RBAC).

---

## Features

- **User Authentication** — Sign up and log in with hashed passwords (bcrypt) and JWT tokens
- **Role-Based Access Control** — Two roles: `User` and `Admin`
- **Task Management** — Create, read, update, and delete tasks
- **Ownership Enforcement** — Users can only manage their own tasks; Admins have full access
- **In-Memory Storage** — No database required; data is stored in-memory at runtime

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [NestJS](https://nestjs.com/) | Backend framework |
| TypeScript | Language |
| Passport + JWT | Authentication strategy |
| bcrypt | Password hashing |
| uuid | Unique ID generation |
| class-validator | Request DTO validation |

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd task2

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the project root (one is already included):

```env
JWT_SECRET=jwtsecret
JWT_EXPIRES_IN=3600s
```

> **Note:** Change `JWT_SECRET` to a strong, random secret before deploying to production.

### Running the App

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run start:prod
```

The server starts on **http://localhost:3000** by default.

---

## API Reference

### Authentication

All task endpoints require a valid JWT. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_access_token>
```

---

#### `POST /auth/signup`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "User"
}
```

> `role` is optional. Accepted values: `User` (default), `Admin`.

**Response `201`:**
```json
{
  "accessToken": "<jwt_token>"
}
```

---

#### `POST /auth/login`

Log in with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response `200`:**
```json
{
  "accessToken": "<jwt_token>"
}
```

---

### Tasks

> All task endpoints require a valid JWT (`Authorization: Bearer <token>`).

---

#### `GET /tasks`

Retrieve tasks.

- **Admin** — returns all tasks in the system
- **User** — returns only tasks belonging to the authenticated user

**Response `200`:**
```json
[
  {
    "id": "uuid",
    "title": "My Task",
    "description": "Task details",
    "status": "OPEN",
    "createdAt": "2026-06-29T12:00:00.000Z",
    "userId": "user-uuid"
  }
]
```

---

#### `POST /tasks`

Create a new task. The task is automatically assigned to the authenticated user.

**Request Body:**
```json
{
  "title": "My Task",
  "description": "Optional description"
}
```

**Response `201`:**
```json
{
  "id": "uuid",
  "title": "My Task",
  "description": "Optional description",
  "status": "OPEN",
  "createdAt": "2026-06-29T12:00:00.000Z",
  "userId": "user-uuid"
}
```

---

#### `PATCH /tasks/:id`

Update an existing task.

- **Admin** — can update any task
- **User** — can only update their own tasks

**Request Body** (all fields optional):
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "IN_PROGRESS"
}
```

> Accepted `status` values: `OPEN`, `IN_PROGRESS`, `DONE`

**Response `200`:** Updated task object.

---

#### `DELETE /tasks/:id`

Delete a task by ID. **Restricted to Admins only.**

**Response `200`:**
```json
{
  "message": "Task \"My Task\" has been deleted successfully"
}
```

---

## Role Permissions Summary

| Endpoint | User | Admin |
|---|:---:|:---:|
| `POST /auth/signup` | YES | YES |
| `POST /auth/login` | YES | YES |
| `GET /tasks` | Own tasks only | All tasks |
| `POST /tasks` | YES | YES |
| `PATCH /tasks/:id` | Own tasks only | Any task |
| `DELETE /tasks/:id` | NO | YES |

---

## Project Structure

```
src/
├── auth/
│   ├── dto/              # SignupDto, LoginDto
│   ├── enums/            # Role enum (User, Admin)
│   ├── interfaces/       # JwtPayload interface
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
├── decorators/
│   └── roles.decorator.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   └── roles.guard.ts
├── middleware/
├── tasks/
│   ├── dto/              # CreateTaskDto, UpdateTaskDto
│   ├── interfaces/       # Task interface, TaskStatus enum
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   └── tasks.service.ts
├── app.module.ts
└── main.ts
```

---

## Running Tests

```bash
# Unit tests
npm run test

# Unit tests in watch mode
npm run test:watch

# Test coverage report
npm run test:cov

# End-to-end tests
npm run test:e2e
```

---

## License

This project is **UNLICENSED** and intended for private use only.
