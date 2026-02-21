# 🗂️ Full Stack Todo & Admin Management System

A production-structured MERN stack application with authentication, role-based access control, pagination, and per-action loading states.

---

## Features

### Authentication

- JWT-based authentication
- Access + Refresh token mechanism
- Silent token refresh using Axios interceptors
- Protected routes
- Role-based access (Admin / User)

---

### Todo Management (User)

- Create todo
- Edit todo
- Delete todo
- Toggle status (Pending / Completed)
- Pagination
- Form validation using React Hook Form
- Per-action loading states
- Fully responsive UI

---

### Admin Panel

- View paginated users
- Toggle user roles
- Delete user with confirmation modal
- Per-row loading indicators
- Proper mutation state handling (React Query)
- Responsive table + mobile card layout

---

## Tech Stack

### Frontend

- React (Vite + TypeScript)
- Tailwind CSS
- React Query
- React Hook Form
- Axios (centralized instance)
- Lucide Icons

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication

---

## Architecture Highlights

### 1. Centralized Axios Instance

- API key injection
- Automatic access token injection
- Silent refresh logic
- Request queueing during token refresh

---

### 2. Mutation Ownership Pattern

- Mutations live in parent components (AdminPage / TodoPage)
- Loading state passed down as props
- No duplicated async state
- Single source of truth

---

### 3. Per-Row Loading

- Toggle role shows spinner only for that row
- Delete modal disables while processing
- Todos support independent loading states

---

### 4. Type Safety

- Strict TypeScript interfaces
- Unified role type
- Reusable pagination interface
- Strongly typed API responses

---

## Installation

```bash
git clone <https://github.com/Rishi2929/Todo-Management-.git>
cd project
npm install
```

## Run Development

Frontend

```
npm run dev
```

## Environment Variables

```bash
VITE_API_KEY=your_api_key
```

## Folder Structure (Frontend)

```bash
src/
 ├── app/
 ├── features/
 ├── layout/
 ├── lib/
 ├── routes/
 ├── types/
 └── api/
```
