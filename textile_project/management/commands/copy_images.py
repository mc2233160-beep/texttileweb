import os
import shutil
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    help = 'Copies images from oldimages to static/images directory'

    def handle(self, *args, **options):
        source_dir = os.path.join(settings.BASE_DIR, 'oldimages', 'images')
        target_dir = os.path.join(settings.BASE_DIR, 'static', 'images')
        
        # Create target directory if it doesn't exist
        os.makedirs(target_dir, exist_ok=True)
        
        # Copy files
        for filename in os.listdir(source_dir):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                source_path = os.path.join(source_dir, filename)
                target_path = os.path.join(target_dir, filename)
                shutil.copy2(source_path, target_path)
                self.stdout.write(self.style.SUCCESS(f'Copied {filename}'))
        
        self.stdout.write(self.style.SUCCESS('Successfully copied all images!'))
