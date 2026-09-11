# EduStream API

Node.js + Express + MongoDB (Mongoose).

## Setup

```bash
npm install
copy .env.example .env      # edit MONGO_URI
npm run dev                 # starts with nodemon on http://localhost:5000
```

Health check: `GET /api/health` → `{ "status": "ok" }`

### MongoDB options
- **Local:** install MongoDB Community Server, then `MONGO_URI=mongodb://127.0.0.1:27017/edustream`
- **Cloud (recommended for a team):** create a free cluster at https://www.mongodb.com/atlas, add a database user, allow access from anywhere (0.0.0.0/0) for development, and paste the connection string into `.env`. Everyone on the team can share one Atlas cluster.

## Project structure

```
src/
├─ server.js                 starts the server after MongoDB connects
├─ app.js                    Express app, middleware, mounts one router per module
├─ config/db.js              Mongoose connection
├─ middleware/errorHandler.js central error → JSON response
├─ utils/asyncHandler.js     wraps async controllers so errors reach errorHandler
└─ modules/
   ├─ category/              ← reference implementation (complete)
   │  ├─ category.model.js      Mongoose schema
   │  ├─ category.controller.js request handlers
   │  └─ category.routes.js     Express router
   ├─ content/               ContentCreator
   ├─ playlist/              PlaylistManager
   ├─ favorite/              FavoriteManager
   ├─ comment/               CommentManager
   └─ support/               TechnicalSupporter
```

Every module follows the same three-file pattern. `getAll`, `getOne`, `create`, `update`, `remove` are wired for all six; the module owner completes validation and adds module-specific endpoints.

## Endpoints

All modules expose the same base CRUD:

| Method | Path                | Action        |
|--------|---------------------|---------------|
| GET    | `/api/<module>`     | list all      |
| GET    | `/api/<module>/:id` | get one       |
| POST   | `/api/<module>`     | create        |
| PUT    | `/api/<module>/:id` | update        |
| DELETE | `/api/<module>/:id` | delete        |

Base paths: `/api/categories`, `/api/content`, `/api/playlists`, `/api/favorites`, `/api/comments`, `/api/support`.

### Suggested module-specific endpoints (owners to implement)

| Module   | Endpoint idea                                             |
|----------|-----------------------------------------------------------|
| content  | `PATCH /api/content/:id/publish` — publish/unpublish       |
| playlist | `PUT /api/playlists/:id/reorder` — change lesson order    |
| favorite | `GET /api/favorites/user/:userId` — one learner's saves   |
| comment  | `PATCH /api/comments/:id/moderate` — approve / hide       |
| support  | `PATCH /api/support/:id/status` — open → in-progress → resolved |
| category | `GET /api/categories/slug/:slug` — lookup by slug         |

## Example requests

```bash
# create a category
curl -X POST http://localhost:5000/api/categories ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Programming\",\"description\":\"Software, data and systems\",\"icon\":\"i-code\"}"

# list categories
curl http://localhost:5000/api/categories
```

## Error format

Errors always return JSON: `{ "message": "...", "errors"?: [...] }` with a matching HTTP status (400 validation, 404 not found, 409 duplicate, 500 server).
