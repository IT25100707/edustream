# EduStream

An online learning platform where expert tutors upload short, high-quality video tutorials on topics like programming, design and business. Students learn practical skills at their own pace with structured playlists and moderated discussion spaces.

## Repository layout

```
.
├─ edustream-it-is-an-website/   Frontend — static HTML, CSS and vanilla JS
├─ backend/                      Backend — Node.js + Express + MongoDB REST API
├─ questionnaire.md              Client brief the site was built from
├─ CONTRIBUTING.md               How the team works with Git (read this first)
└─ README.md
```

## Team & stakeholder modules

Each team member owns one backend module (one folder under `backend/src/modules/`) and one Git branch.

| Stakeholder        | Module folder          | API base path      | Branch              |
|--------------------|------------------------|--------------------|---------------------|
| ContentCreator     | `modules/content/`     | `/api/content`     | `feature/content`   |
| CategoryManager    | `modules/category/`    | `/api/categories`  | `feature/category`  |
| PlaylistManager    | `modules/playlist/`    | `/api/playlists`   | `feature/playlist`  |
| FavoriteManager    | `modules/favorite/`    | `/api/favorites`   | `feature/favorite`  |
| CommentManager     | `modules/comment/`     | `/api/comments`    | `feature/comment`   |
| TechnicalSupporter | `modules/support/`     | `/api/support`     | `feature/support`   |

The **Category** module is complete and is the reference implementation — copy its pattern (model → controller → routes).

## Running the frontend

It's a static site. Either open `edustream-it-is-an-website/index.html` directly, or serve it:

```bash
cd edustream-it-is-an-website
python -m http.server 8765
```

Then open http://localhost:8765.

## Running the backend

```bash
cd backend
npm install
copy .env.example .env        # then edit .env with your MongoDB URI
npm run dev
```

Check it's up: http://localhost:5000/api/health

Full API reference: [`backend/README.md`](backend/README.md).

## Tech stack

- **Frontend:** HTML5, CSS3 (design tokens in `css/tokens.css`), vanilla JavaScript
- **Backend:** Node.js, Express 4, Mongoose 8, MongoDB
- **Tooling:** nodemon (dev), Git + GitHub (pull-request workflow)
