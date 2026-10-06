# Node.js + Express + MongoDB Sample API

A sample REST API built with **Node.js**, **Express** and **MongoDB (Mongoose)**, based on the lessons in [`Docs/`](Docs/):

- *Introduction to the Backend*: Node.js, Express, routes, middleware, REST and CRUD
- *The Full MERN Stack*: MongoDB, Mongoose models, async/await, error handling and CORS
- *Node.js API with MongoDB Setup*: project init, MongoDB Atlas and the connection string

## Folder structure

```
.
├── Docs/                        # Lesson slides
├── src/
│   ├── server.js                # Entry point: connect to DB, start server, graceful shutdown
│   ├── app.js                   # Express app: middleware + routes (no listen)
│   ├── config/
│   │   ├── env.js               # Loads .env (dotenv) and exports settings
│   │   └── db.js                # mongoose.connect() / connection.close()
│   ├── models/                  # Mongoose schemas + models
│   │   ├── Recipe.js
│   │   └── User.js
│   ├── controllers/             # Route handlers (the CRUD logic)
│   │   ├── recipeController.js
│   │   └── userController.js
│   ├── routes/                  # URL → controller mapping
│   │   ├── index.js             # Mounts everything under /api
│   │   ├── recipeRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── logger.js            # Logs each request
│   │   ├── validate.js          # Returns 400 if express-validator rules fail
│   │   ├── notFound.js          # 404 for unknown routes
│   │   └── errorHandler.js      # Central error → HTTP status mapping
│   └── validators/              # express-validator rules per resource
│       ├── recipeValidator.js
│       └── userValidator.js
├── requests.http                # Ready-made requests (VS Code REST Client)
├── .env.example                 # Template for your .env
├── .gitignore
└── package.json
```

How a request flows through the app:

```
request → app.js (cors, json, logger) → routes/ → validators/ + validate → controllers/ → models/ → MongoDB
                                                                                   ↓ on error
                                                                         middleware/errorHandler.js
```

## Getting started

**Requirements:** Node.js 20.19 or later, and a MongoDB Atlas cluster (or a local MongoDB).

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env
#    then set MONGO_URI to your Atlas connection string, e.g.
#    mongodb+srv://<username>:<db_password>@<cluster_host>/sample_database

# 3. Run in development mode (auto-restarts with nodemon)
npm run dev

# or run normally
npm start
```

When it's running you should see:

```
MongoDB connected: <host>/<db_name>
Server running on http://localhost:4000
```

> Never commit your `.env` file. It is already listed in `.gitignore`.

## API endpoints

Base URL: `http://localhost:4000/api`

| Method | URL                 | Action                        | Success |
|--------|---------------------|-------------------------------|---------|
| GET    | `/health`           | Server + database status      | 200 |
| GET    | `/recipes`          | List recipes (`?search=name`) | 200 |
| GET    | `/recipes/:id`      | Get one recipe                | 200 |
| POST   | `/recipes`          | Create a recipe               | 201 |
| PUT    | `/recipes/:id`      | Update a recipe               | 200 |
| DELETE | `/recipes/:id`      | Delete a recipe               | 204 |
| GET    | `/users`            | List users                    | 200 |
| GET    | `/users/:id`        | Get one user                  | 200 |
| POST   | `/users`            | Create a user                 | 201 |
| PUT    | `/users/:id`        | Update a user                 | 200 |
| DELETE | `/users/:id`        | Delete a user                 | 204 |

Example recipe body:

```json
{
  "name": "Chicken Adobo",
  "servings": 4,
  "ingredients": [
    { "name": "Chicken", "qty": "1 kg" },
    { "name": "Soy Sauce", "qty": "1/2 cup" }
  ],
  "instructions": "Marinate, simmer, reduce."
}
```

Example user body:

```json
{ "firstName": "Juan", "lastName": "Dela Cruz", "email": "juan@example.com", "age": 20 }
```

## Error responses

| Status | When |
|--------|------|
| 400 | Body fails validation (express-validator or a Mongoose `ValidationError`), or the JSON is malformed |
| 404 | Document not found, invalid ObjectId (`CastError`), or unknown route |
| 409 | Duplicate value on a unique field (e.g. an email that's already used) |
| 500 | Unexpected server error |

## Connecting a React front end

CORS is enabled for the origin in `CLIENT_ORIGIN` (default `http://localhost:5173`, the Vite dev server).

```jsx
useEffect(() => {
  fetch('http://localhost:4000/api/recipes')
    .then((res) => res.json())
    .then((data) => setRecipes(data))
    .catch((err) => console.error('Fetch failed:', err));
}, []);
```
