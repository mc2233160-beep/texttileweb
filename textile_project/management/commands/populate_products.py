from django.core.management.base import BaseCommand
from textile_project.models import Category, Product, Color, Design

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

        # Sample colors
        colors = {
            'white': Color.objects.get_or_create(name='White')[0],
            'ivory': Color.objects.get_or_create(name='Ivory')[0],
            'beige': Color.objects.get_or_create(name='Beige')[0],
            'gold': Color.objects.get_or_create(name='Gold')[0],
            'silver': Color.objects.get_or_create(name='Silver')[0],
        }

        # Sample designs
        designs = {
            'plain': Design.objects.get_or_create(name='Plain')[0],
            'embroidered': Design.objects.get_or_create(name='Embroidered')[0],
            'striped': Design.objects.get_or_create(name='Striped')[0],
            'floral': Design.objects.get_or_create(name='Floral')[0],
        }

        # Products data with image mappings
        products_data = [
            # Table Linen
            {
                'name': 'Formal Tablecloth',
                'slug': 'formal-tablecloth',
                'category': table_linen_cat,
                'description': 'Elegant tablecloths for formal occasions.',
                'image': 'tableLinen.jpeg',
                'colors': ['white', 'ivory', 'beige'],
                'designs': ['plain', 'embroidered'],
                'is_featured': True
            },
            {
                'name': 'Table Runner',
                'slug': 'table-runner',
                'category': table_linen_cat,
                'description': 'Stylish table runners to complement your table setting.',
                'image': 'tableLinen.jpeg',
                'colors': ['white', 'gold', 'silver'],
                'designs': ['striped', 'floral'],
                'is_featured': True
            },
            # Bed Linen
            {
                'name': 'Luxury Bed Sheets',
                'slug': 'luxury-bed-sheets',
                'category': bed_linen_cat,
                'description': 'Premium quality bed sheets for ultimate comfort.',
                'image': 'bedLinen.jpeg',
                'colors': ['white', 'ivory', 'beige'],
                'designs': ['plain', 'striped'],
                'is_featured': True
            },
            # Bath Linen
            {
                'name': 'Plush Bath Towels',
                'slug': 'plush-bath-towels',
                'category': bath_linen_cat,
                'description': 'Soft and absorbent bath towels for ultimate comfort.',
                'image': 'bathLinen.jpeg',
                'colors': ['white', 'beige'],
                'designs': ['plain', 'embroidered'],
                'is_featured': True
            },
            # Chair Linen
            {
                'name': 'Elegant Chair Covers',
                'slug': 'elegant-chair-covers',
                'category': chair_linen_cat,
                'description': 'Stylish covers to protect and enhance your chairs.',
                'image': 'ChairLinen.jpeg',
                'colors': ['white', 'ivory'],
                'designs': ['plain', 'striped'],
                'is_featured': True
            },
            # Napkins
            {
                'name': 'Linen Napkins',
                'slug': 'linen-napkins',
                'category': napkins_cat,
                'description': 'Elegant napkins for any dining occasion.',
                'image': 'Napkins.jpeg',
                'colors': ['white', 'ivory', 'beige'],
                'designs': ['plain', 'embroidered', 'floral'],
                'is_featured': True
            },
        ]

        # Create products
        for product_data in products_data:
            image_name = product_data.pop('image', None)
            colors_data = product_data.pop('colors', [])
            designs_data = product_data.pop('designs', [])
            
            # Set the image path relative to static
            if image_name:
                product_data['image'] = f'images/{image_name}'
            
            product, created = Product.objects.get_or_create(
                slug=product_data['slug'],
                defaults=product_data
            )
            
            # Add colors and designs
            for color_name in colors_data:
                if color_name in colors:
                    product.available_colors.add(colors[color_name])
            
            for design_name in designs_data:
                if design_name in designs:
                    product.available_designs.add(designs[design_name])
            
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created product: {product.name}'))

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
