# IntelliSQR Todo Platform

A complete React + Node.js implementation of the assignment brief: authenticated users can manage todos, recover access with reset tokens, and see every change reflected in a polished UI.
## Stack Overview
- **Frontend:** React 18, TypeScript, Vite, React Router, Zustand, TanStack Query, React Hook Form, Zod, Tailwind CSS.
- **Backend:** Node.js, TypeScript, Express, MongoDB via Mongoose, JWT authentication, bcrypt, centralized error logging.

## Features Delivered
- Account lifecycle: signup, login, logout, forgot-password, reset-password.
- Secure API access with JWT middleware and protected todo routes.
- Todo management: create, list, update (including completed flag), delete.
- Client-side schema validation with Zod for every form and API response.
- Error logging stored in MongoDB `logs` collection for auditability.

## Getting Started
1. **Clone** this repository.
2. **Backend setup**
   - Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`.
   - Run `npm install` then `npm run dev` inside `server/`.
3. **Frontend setup**
   - Inside `client/`, run `npm install` followed by `npm run dev`.
   - Vite defaults to `http://localhost:5173`; update `FRONTEND_URL` if needed.
4. Open the frontend URL, create an account, and start adding todos.

## Additional Notes
- The forgot-password endpoint returns the reset token in the JSON payload to simplify testing; in production send the token via email.
- Every server error funnels through the shared error handler which writes a `Log` document before returning a 500.
- Tailwind’s `glass-panel` utility plus responsive layouts make the UI presentation-ready without extra component libraries.
