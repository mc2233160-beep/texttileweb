# Deployment Guide for Jyoti Creation

This guide explains how to deploy the Django project to a hosting provider using a MySQL database.

## 1. Prerequisites (Hosting environment)
- **Python 3.10+** installed.
- **MySQL Database** created.
- **Git** (optional, for pulling code).
- **Access to terminal/SSH**.

## 2. Dependencies
Install the required packages.
```bash
pip install -r requirements.txt
```
> **Note**: If `mysqlclient` fails to install, ensure you have MySQL development libraries installed (e.g., `libmysqlclient-dev` on Ubuntu/Debian). Alternatively, you can use `pymysql` by installing it (`pip install pymysql`) and adding the following to `textile_project/__init__.py`:
> ```python
> import pymysql
> pymysql.install_as_MySQLdb()
> ```

## 3. Environment Variables (.env)
Create a `.env` file in the project root (where `manage.py` is located) based on `.env.example`.
The file should contain your production secrets. **Do not commit this file to version control.**

```bash
# .env file content
DEBUG=False
SECRET_KEY=generate-a-long-random-string-here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database Credentials
DB_NAME=your_db_name
DB_USER=your_db_user_name
DB_PASSWORD=your_db_strong_password
DB_HOST=localhost  # or the IP of your DB server
DB_PORT=3306
```

## 4. Static Files
In production, we use WhiteNoise to serve static files efficiently. Run the following command to collect all static assets into a single directory (`staticfiles`).

```bash
python manage.py collectstatic
```

## 5. Database Migrations
Apply the database migrations to your production MySQL database.

```bash
python manage.py migrate
```

## 6. Create Superuser
Create an admin account to access the dashboard.

```bash
python manage.py createsuperuser
```

## 7. Run the Server (Gunicorn)
Use Gunicorn to serve the application in production.

```bash
gunicorn textile_project.wsgi:application
```
You can verify it works by visiting `http://your-server-ip:8000`.

## 8. Setup Nginx (Recommended Reverse Proxy)
It is best practice to run Gunicorn behind Nginx.
Example Nginx config snippet:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static/ {
        alias /path/to/your/project/staticfiles/;
    }
}
```
