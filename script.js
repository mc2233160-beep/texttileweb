// Ensure all scripts run only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // --- Navbar background style (Removed scroll listener) ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Set fixed background color and shadow properties on load
        navbar.style.background = '#1E3A8A'; // your blue color
        navbar.style.boxShadow = 'none';
    }


    // --- Product Detail Page Functionality ---
    
    // Get product parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');

    if (productParam && document.getElementById('productName')) {
        loadProductDetails(productParam);
    }

    // Color and Design Selection
    const colorOptions = document.getElementById('colorOptions');
    const designOptions = document.getElementById('designOptions');
    const mainImage = document.getElementById('mainProductImage');

    if (colorOptions) {
        colorOptions.addEventListener('click', function(e) {
            if (e.target.classList.contains('variant-btn')) {
                // Remove active class from all color buttons
                colorOptions.querySelectorAll('.variant-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                e.target.classList.add('active');

                // Change main image based on color selection
                const color = e.target.dataset.color;
                updateProductImage(color);
                updateProductForm(); // Update form on color change
            }
        });
    }

    if (designOptions) {
        designOptions.addEventListener('click', function(e) {
            if (e.target.classList.contains('variant-btn')) {
                // Remove active class from all design buttons
                designOptions.querySelectorAll('.variant-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                e.target.classList.add('active');

                // Update product name in form
                updateProductForm();
            }
        });
    }

    function loadProductDetails(productId) {
        const products = {
            'formal-tablecloth': {
                name: 'Premium Formal Tablecloth',
                category: 'Table Linen',
                description: 'Our premium formal tablecloth is crafted from the finest materials to provide elegance and durability for fine dining establishments. Features stain-resistant treatment and long-lasting color retention.',
                image: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'table-overlay': {
                name: 'Decorative Table Overlay',
                category: 'Table Linen',
                description: 'Elegant table overlays that add sophistication and style to any table setting. Perfect for special events and fine dining establishments.',
                image: 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=600'
            },
            'table-underlay': {
                name: 'Table Underlay Protector',
                category: 'Table Linen',
                description: 'High-quality table underlays that provide cushioning, noise reduction, and surface protection for your valuable furniture.',
                image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'spandex-table-cover': {
                name: 'Spandex Lycra Fitted Table Cover',
                category: 'Table Linen',
                description: 'Stretchy, form-fitting table covers that provide a sleek, modern look for events and exhibitions. Easy to install and maintain.',
                image: 'https://images.pexels.com/photos/236111/pexels-photo-236111.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'moulton-protector': {
                name: 'Moulton Table Protector',
                category: 'Table Linen',
                description: 'Premium table protectors that shield surfaces from heat, moisture, and scratches while maintaining an elegant appearance.',
                image: 'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'chair-cover': {
                name: 'Universal Chair Cover',
                category: 'Chair Linen',
                description: 'Versatile chair covers that fit most standard chairs, providing protection and elegant styling for any event or venue.',
                image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'chair-cap': {
                name: 'Decorative Chair Cap',
                category: 'Chair Linen',
                description: 'Stylish chair caps that add a decorative touch to chair backs, perfect for weddings and special occasions.',
                image: 'https://images.pexels.com/photos/236111/pexels-photo-236111.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'chair-cover-cut': {
                name: 'Custom Chair Cover Cut',
                category: 'Chair Linen',
                description: 'Custom-cut chair covers designed for specific chair types and styles, ensuring a perfect fit and professional appearance.',
                image: 'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'fine-dining-napkins': {
                name: 'Fine Dining Napkins',
                category: 'Napkins',
                description: 'Luxury napkins crafted from premium materials, perfect for upscale restaurants and fine dining establishments.',
                image: 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=600'
            },
            'banquet-napkins': {
                name: 'Banquet Napkins',
                category: 'Napkins',
                description: 'Durable and elegant napkins designed for large events, banquet halls, and catering services.',
                image: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'public-area-napkins': {
                name: 'Public Area Napkins',
                category: 'Napkins',
                description: 'Cost-effective napkins suitable for cafeterias, food courts, and high-traffic dining areas.',
                image: 'https://images.pexels.com/photos/236111/pexels-photo-236111.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'bed-sheets': {
                name: 'Premium Bed Sheets',
                category: 'Bed Linen',
                description: 'High-quality bed sheets designed for commercial use in hotels, hospitals, and care facilities.',
                image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'bed-cover': {
                name: 'Luxury Bed Cover',
                category: 'Bed Linen',
                description: 'Elegant bed covers that provide warmth, comfort, and style for hospitality and healthcare applications.',
                image: 'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'duvet-cover': {
                name: 'Premium Duvet Cover',
                category: 'Bed Linen',
                description: 'Luxurious duvet covers that combine comfort with easy maintenance for commercial hospitality use.',
                image: 'https://images.pexels.com/photos/236111/pexels-photo-236111.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'pillow-cover': {
                name: 'Professional Pillow Cover',
                category: 'Bed Linen',
                description: 'High-quality pillow covers designed for maximum comfort, durability, and easy laundering.',
                image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            'bath-robe': {
                name: 'Luxury Bath Robe',
                category: 'Bath Linen',
                description: 'Premium bathrobes crafted from the finest materials for hotels, spas, and wellness centers.',
                image: 'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=600'
            }
        };

        const product = products[productId];
        if (product) {
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productDescription').textContent = product.description;
            // Set the initial image source. For lazy loading to work, this should be the fallback image or use data-src
            // Since this function runs on DOMContentLoaded, we'll set the src directly for now.
            document.getElementById('mainProductImage').src = product.image;
            document.getElementById('breadcrumb-category').textContent = product.category;
            document.getElementById('breadcrumb-product').textContent = product.name;

            updateProductForm();
        }
    }

    function updateProductImage(color) {
        const colorImages = {
            'white': 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600',
            'red': 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=600',
            'blue': 'https://images.pexels.com/photos/236111/pexels-photo-236111.jpeg?auto=compress&cs=tinysrgb&w=600',
            'green': 'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=600'
        };

        if (colorImages[color] && mainImage) {
            // Apply a quick fade transition for a smoother color change effect
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = colorImages[color];
                mainImage.style.opacity = '1';
            }, 150);
        }
    }

    function updateProductForm() {
        const productName = document.getElementById('productName')?.textContent || '';
        const activeDesign = document.querySelector('#designOptions .variant-btn.active')?.textContent || '';
        const activeColor = document.querySelector('#colorOptions .variant-btn.active')?.textContent || '';

        let productString = productName;
        if (activeDesign && activeDesign !== 'Plain') {
            productString += ` - ${activeDesign}`;
        }
        if (activeColor && activeColor !== 'White') {
            productString += ` - ${activeColor}`;
        }

        const productField = document.getElementById('product');
        if (productField) {
            productField.value = productString;
        }
    }


    // --- Form Handling ---
    
    // Enquiry Form
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'enquiry');
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'contact');
        });
    }

    function handleFormSubmission(form, type) {
        // Basic form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#dc2626'; // Tailwind red-600
                isValid = false;
            } else {
                field.style.borderColor = '#d1d5db'; // Tailwind gray-300
            }
        });

        // Email validation
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                emailField.style.borderColor = '#dc2626';
                isValid = false;
            }
        }

        if (isValid) {
            // Show success message
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#16a34a'; // Tailwind green-600

                // Reset form after 2 seconds
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '#004080'; // Original button color
                    submitBtn.disabled = false;

                    // Show thank you message
                    alert('Thank you for your inquiry! We will get back to you within 24 hours.');
                }, 2000);
            }, 1000);
        } else {
            // Show error message
            alert('Please fill in all required fields correctly.');
        }
    }


    // --- Smooth scrolling for anchor links ---
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // --- Lazy loading for images ---
    const images = document.querySelectorAll('img[data-src]'); // Only observe images with data-src

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.05 }); // Lower threshold to start loading slightly sooner

    images.forEach(img => {
        // Only apply transition if the image hasn't loaded immediately
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
        imageObserver.observe(img);
        
        // If image is already in the DOM but hasn't had the opacity set yet (e.g., cached image on refresh)
        if (img.complete && img.style.opacity === '0') {
            img.style.opacity = '1';
        }
    });


    // --- Add loading and reveal animation ---
    
    // Remove loading class once page is loaded
    document.body.classList.add('loaded');

    // Add smooth reveal animation to cards
    const cards = document.querySelectorAll('.category-card, .product-card, .fabric-card, .mission-card, .trust-item');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply a staggered delay based on the card's position in the visible area (index is for the array of observed elements)
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target); // Stop observing after animation
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });
});