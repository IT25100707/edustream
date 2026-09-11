# Contributing — how our team uses Git

Everyone follows the same steps so `main` always works and every member's work is visible in the history.

## One-time setup (each member)

1. Install Git: https://git-scm.com/download/win
2. Tell Git who you are (use the same name/email as your GitHub account):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```
3. Clone the repository (get the URL from the green **Code** button on GitHub):
   ```bash
   git clone https://github.com/<owner>/edustream.git
   cd edustream
   ```
4. Set up the backend:
   ```bash
   cd backend
   npm install
   copy .env.example .env
   ```
   Edit `.env` and put in your MongoDB connection string.

## Rules

- **Never commit directly to `main`.** All work goes through a pull request.
- **One branch per member/module.** Use the branch name from the table in `README.md`.
- **Commit small and often**, with clear messages: `feat(comment): add moderation endpoint`, `fix(playlist): validate video order`.
- **Never commit `.env` or `node_modules`** — `.gitignore` already blocks them.
- Only edit files inside **your own module folder** (`backend/src/modules/<yours>/`). If you need a change in a shared file (`app.js`, `errorHandler.js`, the frontend), say so in the group chat first so two people don't edit the same lines.

## Daily workflow

```bash
# 1. Start from the latest main
git checkout main
git pull origin main

# 2. Switch to your branch (create it the first time with -b)
git checkout feature/comment        # or: git checkout -b feature/comment

# 3. Bring your branch up to date with main
git merge main

# 4. Do your work, then check what changed
git status
git diff

# 5. Stage and commit
git add .
git commit -m "feat(comment): add reply endpoint"

# 6. Push your branch to GitHub
git push origin feature/comment
```

## Opening a pull request (PR)

1. Go to the repository on GitHub. A yellow banner offers **Compare & pull request** for your branch — click it (or **Pull requests → New pull request**).
2. Base: `main` ← Compare: `feature/<yours>`.
3. Title it clearly, e.g. `CommentManager: comment CRUD + moderation`.
4. In the description, list what you added and how you tested it (Postman / Thunder Client screenshots are great).
5. Ask one teammate to review. They click **Files changed**, read it, then **Review changes → Approve**.
6. Click **Merge pull request** → **Confirm merge** → **Delete branch** is optional (keep it if you're still working).

## Resolving a merge conflict

If GitHub says the branch has conflicts:

```bash
git checkout feature/comment
git pull origin main
```

Git marks the conflicting lines with `<<<<<<<`, `=======`, `>>>>>>>`. Open the file, keep the correct version, delete the markers, then:

```bash
git add .
git commit -m "merge main into feature/comment"
git push origin feature/comment
```

## Testing your API

Use Postman, Thunder Client (VS Code extension) or `curl`:

```bash
curl http://localhost:5000/api/health
curl -X POST http://localhost:5000/api/categories -H "Content-Type: application/json" -d "{\"name\":\"Programming\"}"
```
