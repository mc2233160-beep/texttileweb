import os
import sys

# Hostinger Setup Python App often places the root of the app in the folder you select.
# Add the project directory to the sys.path
sys.path.append(os.getcwd())

from textile_project.wsgi import application
