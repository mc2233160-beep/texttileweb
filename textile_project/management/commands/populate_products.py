from django.core.management.base import BaseCommand
from textile_project.models import Category, Product

class Command(BaseCommand):
    help = 'Populates the database with initial product data.'

    def handle(self, *args, **options):
        self.stdout.write('Starting product data population...')

        # Create Categories
        table_linen_cat, _ = Category.objects.get_or_create(name='Table Linen', defaults={'slug': 'table-linen'})
        bed_linen_cat, _ = Category.objects.get_or_create(name='Bed Linen', defaults={'slug': 'bed-linen'})
        bath_linen_cat, _ = Category.objects.get_or_create(name='Bath Linen', defaults={'slug': 'bath-linen'})
        chair_linen_cat, _ = Category.objects.get_or_create(name='Chair Linen', defaults={'slug': 'chair-linen'})
        napkins_cat, _ = Category.objects.get_or_create(name='Napkins', defaults={'slug': 'napkins'})

        # Create Products for Table Linen
        Product.objects.get_or_create(
            name='Formal Tablecloth',
            category=table_linen_cat,
            defaults={
                'slug': 'formal-tablecloth',
                'description': 'Elegant tablecloths for formal occasions.',
                'image': 'products/tl1.jpg',
                'is_featured': True
            }
        )

        Product.objects.get_or_create(
            name='Table Underlay',
            category=table_linen_cat,
            defaults={
                'slug': 'table-underlay',
                'description': 'Provides a soft and protective layer for your tables.',
                'image': 'products/tl2.2.jpg',
                'is_featured': True
            }
        )

        Product.objects.get_or_create(
            name='Table Overlay',
            category=table_linen_cat,
            defaults={
                'slug': 'table-overlay',
                'description': 'Decorative overlays to add a touch of style.',
                'image': 'products/tl3.4.jpeg',
                'is_featured': True
            }
        )

        Product.objects.get_or_create(
            name='Spandex Lycra Fitted Cover',
            category=table_linen_cat,
            defaults={
                'slug': 'spandex-lycra-fitted-cover',
                'description': 'Sleek and modern fitted table covers.',
                'image': 'products/tl4.jpeg',
                'is_featured': False
            }
        )

        Product.objects.get_or_create(
            name='Moulton Table Protectors',
            category=table_linen_cat,
            defaults={
                'slug': 'moulton-table-protectors',
                'description': 'Heat-resistant and waterproof table protectors.',
                'image': 'products/tl5.jpg',
                'is_featured': False
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated table linen products.'))

        # Create Products for Bed Linen
        Product.objects.get_or_create(
            name='Bed Sheets',
            category=bed_linen_cat,
            defaults={
                'slug': 'bed-sheets',
                'description': 'Comfortable and stylish bed sheets.',
                'image': 'products/bl1.3.jpeg',
                'is_featured': True
            }
        )

        Product.objects.get_or_create(
            name='Bed Covers',
            category=bed_linen_cat,
            defaults={
                'slug': 'bed-covers',
                'description': 'A variety of bed covers to suit your style.',
                'image': 'products/bl1.1.jpeg',
                'is_featured': True
            }
        )

        Product.objects.get_or_create(
            name='Duvet Covers',
            category=bed_linen_cat,
            defaults={
                'slug': 'duvet-covers',
                'description': 'High-quality duvet covers for a cozy night\'s sleep.',
                'image': 'products/bl1.4.jpeg',
                'is_featured': True
            }
        )

        Product.objects.get_or_create(
            name='Pillow Covers',
            category=bed_linen_cat,
            defaults={
                'slug': 'pillow-covers',
                'description': 'Soft and durable pillow covers.',
                'image': 'products/bl1.2.jpeg',
                'is_featured': False
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated bed linen products.'))

        # Create Products for Bath Linen
        Product.objects.get_or_create(
            name='Bath Robes',
            category=bath_linen_cat,
            defaults={
                'slug': 'bath-robes',
                'description': 'Plush and absorbent bath robes.',
                'image': 'products/bl.jpeg',
                'is_featured': True
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated bath linen products.'))

        # Create Products for Chair Linen
        Product.objects.get_or_create(
            name='Chair Covers',
            category=chair_linen_cat,
            defaults={
                'slug': 'chair-covers',
                'description': 'Stylish and protective chair covers.',
                'image': 'products/cl.jpeg',
                'is_featured': True
            }
        )

        Product.objects.get_or_create(
            name='Chair Bows',
            category=chair_linen_cat,
            defaults={
                'slug': 'chair-bows',
                'description': 'Decorative bows to adorn your chairs.',
                'image': 'products/cl2.jpeg',
                'is_featured': True
            }
        )

        Product.objects.get_or_create(
            name='Chair Caps',
            category=chair_linen_cat,
            defaults={
                'slug': 'chair-caps',
                'description': 'Elegant chair caps for a sophisticated look.',
                'image': 'products/cl3.jpeg',
                'is_featured': False
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated chair linen products.'))

        # Create Products for Napkins
        Product.objects.get_or_create(
            name='Fine Dining Napkins',
            category=napkins_cat,
            defaults={
                'slug': 'fine-dining-napkins',
                'description': 'Exquisite napkins for a fine dining experience.',
                'image': 'products/n1.1.jpeg',
                'is_featured': True
            }
        )

        Product.objects.get_or_create(
            name='Banquet Napkins',
            category=napkins_cat,
            defaults={
                'slug': 'banquet-napkins',
                'description': 'Durable and elegant napkins for banquets.',
                'image': 'products/n1.2.jpeg',
                'is_featured': True
            }
        )

        Product.objects.get_or_create(
            name='Public Area Napkins',
            category=napkins_cat,
            defaults={
                'slug': 'public-area-napkins',
                'description': 'Napkins for use in public areas.',
                'image': 'products/n1.3.jpg',
                'is_featured': False
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated napkins.'))
