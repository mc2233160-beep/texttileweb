/**
 * Main application initialization
 * Handles DOM setup, event listeners, and core functionality
 */
(function() {
    'use strict';

    // Cache DOM elements
    const domElements = {};
    
    // Initialize the application when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        try {
            initializeElements();
            setupEventListeners();
            setupNavigation();
            handleProductPage();
            setupFormHandlers();
            setupPageTransitions();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    });

    /**
     * Initialize DOM elements
     */
    function initializeElements() {
        domElements.navToggle = document.getElementById('navToggle');
        domElements.navMenu = document.getElementById('navMenu');
        domElements.navbar = document.querySelector('.navbar');
        domElements.mainImage = document.getElementById('mainProductImage');
        domElements.colorOptions = document.getElementById('colorOptions');
        domElements.designOptions = document.getElementById('designOptions');
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Navigation
        if (domElements.navToggle && domElements.navMenu) {
            domElements.navToggle.addEventListener('click', toggleMobileMenu);
            document.addEventListener('click', handleOutsideClick);
        }

        // Product options
        if (domElements.colorOptions) {
            domElements.colorOptions.addEventListener('click', handleColorSelection);
        }
        
        if (domElements.designOptions) {
            domElements.designOptions.addEventListener('click', handleDesignSelection);
        }
    }

    /**
     * Toggle mobile navigation menu
     */
    function toggleMobileMenu() {
        domElements.navToggle.classList.toggle('active');
        domElements.navMenu.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        const isExpanded = domElements.navToggle.classList.contains('active');
        domElements.navToggle.setAttribute('aria-expanded', isExpanded);
        domElements.navMenu.setAttribute('aria-hidden', !isExpanded);
    }

    /**
     * Handle clicks outside the navigation
     * @param {Event} e - The click event
     */
    function handleOutsideClick(e) {
        if (!domElements.navToggle.contains(e.target) && !domElements.navMenu.contains(e.target)) {
            domElements.navToggle.classList.remove('active');
            domElements.navMenu.classList.remove('active');
            domElements.navToggle.setAttribute('aria-expanded', 'false');
            domElements.navMenu.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Set up navigation styles and behaviors
     */
    function setupNavigation() {
        if (domElements.navbar) {
            // Set fixed background color and shadow properties on load
            Object.assign(domElements.navbar.style, {
                background: '#1E3A8A',
                boxShadow: 'none',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
            });
        }
    }


    /**
     * Handle product page specific functionality
     */
    function handleProductPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const productParam = urlParams.get('product');

        if (productParam && document.getElementById('productName')) {
            try {
                loadProductDetails(productParam);
            } catch (error) {
                console.error('Error loading product details:', error);
                // Show user-friendly error message
                const productContainer = document.querySelector('.product-detail');
                if (productContainer) {
                    productContainer.innerHTML = `
                        <div class="error-message">
                            <h2>Product Not Found</h2>
                            <p>We're sorry, but we couldn't find the requested product. Please try again later or browse our <a href="/products">products page</a>.</p>
                        </div>
                    `;
                }
            }
        }
    }

    /**
     * Handle color selection for products
     * @param {Event} e - The click event
     */
    function handleColorSelection(e) {
        const target = e.target.closest('.variant-btn');
        if (!target) return;

        e.preventDefault();
        
        // Update active state
        const buttons = domElements.colorOptions.querySelectorAll('.variant-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');

        // Update product image
        const color = target.dataset.color;
        if (color) {
            updateProductImage(color);
            updateProductForm();
        }
    }

    /**
     * Handle design selection for products
     * @param {Event} e - The click event
     */
    function handleDesignSelection(e) {
        const target = e.target.closest('.variant-btn');
        if (!target) return;

        e.preventDefault();
        
        // Update active state
        const buttons = domElements.designOptions.querySelectorAll('.variant-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');

        // Update product form
        updateProductForm();
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

        if (colorImages[color] && domElements.mainImage) {
            // Apply a quick fade transition for a smoother color change effect
            domElements.mainImage.style.opacity = '0';
            setTimeout(() => {
                domElements.mainImage.src = colorImages[color];
                domElements.mainImage.style.opacity = '1';
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


    /**
     * Set up page transitions for smoother navigation
     */
    function setupPageTransitions() {
        // Create transition overlay if it doesn't exist
        let transitionOverlay = document.getElementById('page-transition');
        let loadingSpinner = document.getElementById('loading-spinner');
        
        if (!transitionOverlay) {
            transitionOverlay = document.createElement('div');
            transitionOverlay.id = 'page-transition';
            transitionOverlay.className = 'page-transition';
            document.body.appendChild(transitionOverlay);
        }
        
        if (!loadingSpinner) {
            loadingSpinner = document.createElement('div');
            loadingSpinner.id = 'loading-spinner';
            loadingSpinner.className = 'loading-spinner';
            document.body.appendChild(loadingSpinner);
        }

        // Intercept all internal link clicks
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href]');
            if (!link) return;
            
            const href = link.getAttribute('href');
            // Only handle internal links (same domain)
            if (href && 
                !href.startsWith('#') && 
                !href.startsWith('mailto:') && 
                !href.startsWith('tel:') &&
                !href.startsWith('http') &&
                href.endsWith('.html')) {
                
                e.preventDefault();
                
                // Show transition
                transitionOverlay.classList.add('active');
                loadingSpinner.classList.add('active');
                
                // Prefetch the page
                const linkElement = document.createElement('link');
                linkElement.rel = 'prefetch';
                linkElement.href = href;
                document.head.appendChild(linkElement);
                
                // Navigate after a brief delay for smooth transition
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            }
        });

        // Hide transition when page loads
        window.addEventListener('load', function() {
            transitionOverlay.classList.remove('active');
            loadingSpinner.classList.remove('active');
        });

        // Also hide on DOMContentLoaded for faster pages
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
            loadingSpinner.classList.remove('active');
        }, 100);
    }

    /**
     * Set up form handlers
     */
    function setupFormHandlers() {
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


    /**
     * Initialize smooth scrolling for anchor links
     */
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Use smooth scroll if supported
                    if ('scrollBehavior' in document.documentElement.style) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    } else {
                        // Fallback for browsers that don't support smooth scrolling
                        target.scrollIntoView();
                    }
                }
            });
        });
    }

    /**
     * Initialize lazy loading for images
     */
    function initLazyLoading() {
        // Only initialize if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: Load all images immediately
            document.querySelectorAll('img[data-src]').forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
            return;
        }

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        // Use requestIdleCallback if available for better performance
                        const loadImage = () => {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.style.opacity = '1';
                        };
                        
                        if ('requestIdleCallback' in window) {
                            window.requestIdleCallback(loadImage, { timeout: 2000 });
                        } else {
                            loadImage();
                        }
                    }
                    observer.unobserve(img);
                }
            });
        }, { 
            rootMargin: '200px', // Start loading images 200px before they're in viewport
            threshold: 0.01 
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            // Only apply transition if the image hasn't loaded immediately
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                // Handle image load errors
                img.addEventListener('error', function() {
                    this.style.opacity = '1';
                    this.alt = 'Image could not be loaded';
                    // Optionally set a placeholder image
                    // this.src = 'path/to/placeholder.jpg';
                });
            }
            
            imageObserver.observe(img);
        });
    }

    /**
     * Initialize reveal animations for cards and sections
     */
    function initRevealAnimations() {
        // Remove loading class once page is loaded
        document.body.classList.add('loaded');

        // Only use IntersectionObserver if supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: Show all cards immediately
            document.querySelectorAll('.category-card, .product-card, .fabric-card, .mission-card, .trust-item')
                .forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            return;
        }

        const cards = document.querySelectorAll('.category-card, .product-card, .fabric-card, .mission-card, .trust-item');
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Use requestAnimationFrame for smoother animations
                    requestAnimationFrame(() => {
                        // Apply staggered delay based on the card's position
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                            cardObserver.unobserve(entry.target);
                        }, Math.min(index * 50, 300)); // Cap the maximum delay at 300ms
                    });
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Start animation when element is 50px from bottom of viewport
        });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.willChange = 'opacity, transform';
            cardObserver.observe(card);
        });
    }

    // Initialize all components
    initSmoothScrolling();
    initLazyLoading();
    initRevealAnimations();

    }); // End of DOMContentLoaded
})(); // End of IIFE