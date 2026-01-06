# Deploying to Hostinger (Shared Hosting)

Hostinger's Shared Hosting uses hPanel with a "Python App" feature.

## 1. Prepare Your Files
Ensure you have the following files (I have created them for you):
- `passenger_wsgi.py`: The entry point for Hostinger.
- `requirements.txt`: Using `pymysql` for database compatibility.
- `textile_project/__init__.py`: Configured to use `pymysql`.

## 2. Setup Database in hPanel
1. Log in to hPanel.
2. Go to **Databases** -> **Management**.
3. Create a new MySQL Database.
4. Note down the **Database Name**, **MySQL Username**, and **Password**.

## 3. Setup Python App
1. in hPanel, go to **Advanced** -> **Python App** (or searching "Python").
2. Click **Create Application**.
3. **Python Version**: Choose the latest available (e.g., 3.9 or higher).
4. **App Directory**: `textileWeb` (or any name you prefer).
5. **App Domain**: Select your domain.
6. Click **Create**.

## 4. Upload Files
1. Go to **File Manager**.
2. Navigate to the folder you created (e.g., `textileWeb`).
3. You will see a default `passenger_wsgi.py`. **Delete it.**
4. Upload all your project files (including the `passenger_wsgi.py` I created, `manage.py`, `requirements.txt`, `textile_project`, `web`, etc.).
   - *Tip: You can zip your local project folder, upload the zip, and extract it in File Manager.*

## 5. Configure Dependencies & Environment
1. Back in the **Python App** page in hPanel.
2. Under "Configuration files", ensure `requirements.txt` is listed.
3. Click **Install** under "pip install requirements.txt".
4. Wait for installation to complete.

## 6. Configure Environment Variables
You typically cannot use a `.env` file easily with Hostinger's default setup without some path tweaking. The easiest way is to edit `textile_project/settings.py` directly OR set environment variables in the **passenger_wsgi.py** (not recommended for secrets) OR just create the `.env` file in the **same directory** as `manage.py` on the server.
**I recommended creating the `.env` file on the server**:
1. In File Manager, inside `textileWeb` folder, create a new file named `.env`.
2. Paste the content from your local `.env` (with the correct DB credentials you created in step 2).

## 7. Run Migrations & Static Files
Hostinger Shared Hosting gives you a virtual environment command.
1. In the **Python App** page, look for the "Enter to Virtual Environment" command (something like `source /home/u123/virtualenv/.../activate`).
2. Copy that command.
3. Open **Terminal** (in hPanel) or connect via SSH.
4. Paste the command to activate the virtual environment.
5. Navigate to your app folder: `cd textileWeb`
6. Run migrations:
   ```bash
   python manage.py migrate
   ```
7. Collect static files:
   ```bash
   python manage.py collectstatic
   ```
8. Create superuser:
   ```bash
   python manage.py createsuperuser
   ```

## 8. Restart App
1. Go back to **Python App** page.
2. Click **Restart**.
3. Visit your website.
