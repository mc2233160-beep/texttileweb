# Deployment Steps for Render

Since you already have PostgreSQL credentials, you have two options for deployment.

## Option 1: Use your existing Database (Recommended if you already have data)

If you want to connect this app to a PostgreSQL database you already have (external or on Render):

1.  **Commit and Push** your changes to GitHub.
2.  **Go to Render Dashboard** and create a **Web Service** (NOT a Blueprint).
    *   Connect your repo.
    *   Runtime: **Python 3**.
    *   Build Command: `./build.sh`
    *   Start Command: `gunicorn textile_project.wsgi:application`
3.  **Environment Variables**:
    *   Scroll down to "Environment Variables".
    *   Add `DATABASE_URL` with your value: `postgres://USER:PASSWORD@HOST:PORT/NAME`
    *   Add `SECRET_KEY` (generate a random string).
    *   Add `WEB_CONCURRENCY` = `4`.

## Option 2: Let Render create a NEW Database (Blueprint)

This uses the `render.yaml` file I created. It will spin up a fresh database for you.

1.  **Commit and Push** your changes to GitHub.
2.  **Go to Render Dashboard**.
3.  Select **New +** -> **Blueprint**.
4.  Connect your repo.
5.  Render will read `render.yaml` and prompt you to apply the changes.
    *   **Note**: This creates a *new* empty database named `textile_db`.
    *   If you want to use your *own* credentials *after* using the Blueprint, you can go to the Web Service settings in Render and override the `DATABASE_URL` environment variable.

## Verification
- Once deployed, check the logs in the Render dashboard.
- Visit the URL provided by Render.
