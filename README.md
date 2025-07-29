# TaskFlow Frontend

## Technologies Used

- React (with Vite)
- TypeScript
- Tailwind CSS
- Axios
- React Router
- Context API

##  Project Structure

```
taskflow-frontend/
│
├── api/
├── components/
├── context/
├── pages/
├── App.tsx
├── main.tsx
```

##  Getting Started

1. Clone the project:

```bash
git clone https://github.com/OlaSot/tasks.git
cd taskflow/taskflow-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

> App runs at `http://localhost:5173`

##  Features

- User registration and login
- Auth token stored in `localStorage`
- Protected routes based on user role
- Tasks page (create/update status)
- Admin-only logs page with IP, login/logout time, and user-agent
- Logout tracking via PATCH request

##  Pages

- `/login` — Sign in
- `/register` — Sign up
- `/home` — View and create tasks
- `/logs` — Admin-only login activity

##  Note

- After login, the backend creates a log.
- On logout, `logoutTime` is updated for that log.
- Admin can delete logs via frontend UI.


# TaskFlow Backend

This is the backend part of the TaskFlow project — a task management system built with the MERN stack.

##  Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- JWT Authentication
- dotenv
- CORS

##  Project Structure

```
taskflow-backend/
│
├── controllers/
├── models/
├── routes/
├── .env (excluded)
├── server.js
├── package.json
```

##  Environment Variables

Create a `.env` file in the root with the following values:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

##  Getting Started

1. Clone the project:

```bash
git clone https://github.com/OlaSot/tasks.git
cd taskflow/taskflow-backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node server.js
```

Or install `nodemon` globally and run in development mode:

```bash
npm install -g nodemon
npm run dev
```

> Server will run on `http://localhost:5000`

##  API Routes

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT

### Tasks

- `GET /api/tasks` — Get all tasks (protected)
- `POST /api/tasks` — Create a new task (protected)
- `PUT /api/tasks/:id` — Update task status (protected)

### User Logs (Admin only)

- `GET /api/logs` — View all login/logout logs
- `PATCH /api/logs/:id/logout` — Set logout time
- `DELETE /api/logs/:id` — Delete a log

##  Notes

- `req.user` is set via a JWT middleware on protected routes
- MongoDB must be running (or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

