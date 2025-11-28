function initializeThemeToggle() {
            const themeToggle = document.getElementById('themeToggle');
            
            if (!themeToggle) {
                console.warn('Theme toggle element not found');
                return;
            }
            
            const themeIcon = themeToggle.querySelector('i');
            
            // Check for saved theme preference or default to light
            const currentTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            
            // Update icon based on current theme
            updateThemeIcon(themeIcon, currentTheme);
            
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Update icon
                updateThemeIcon(themeIcon, newTheme);
            });
        }

        function updateThemeIcon(themeIcon, theme) {
            if (!themeIcon) return;
            
            if (theme === 'dark') {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        }

        // Mobile Navigation Toggle
        function initializeMobileNavigation() {
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            if (!hamburger || !navLinks) {
                console.warn('Mobile navigation elements not found');
                return;
            }
            
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
            
            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                }
            });
        }

        // Header scroll effect
        function initializeHeaderScroll() {
            const header = document.getElementById('header');
            
            if (!header) {
                console.warn('Header element not found');
                return;
            }
            
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            };
            
            window.addEventListener('scroll', handleScroll);
            // Initialize on load
            handleScroll();
        }

        // Form submission
        function initializeContactForm() {
            const contactForm = document.querySelector('.contact-form');
            
            if (!contactForm) {
                console.warn('Contact form not found');
                return;
            }
            
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Basic form validation
                const formData = new FormData(contactForm);
                const name = formData.get('name')?.toString().trim();
                const email = formData.get('email')?.toString().trim();
                const message = formData.get('message')?.toString().trim();
                
                if (!name || !email || !message) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    alert('Thank you for your message! I\'ll get back to you soon.');
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1000);
            });
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Fade in animation on scroll
        function initializeScrollAnimations() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            if (fadeElements.length === 0) {
                return;
            }
            
            // Use Intersection Observer for better performance
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                fadeElements.forEach(element => {
                    observer.observe(element);
                });
            } else {
                // Fallback for older browsers
                const fadeInOnScroll = () => {
                    fadeElements.forEach(element => {
                        const elementTop = element.getBoundingClientRect().top;
                        const elementVisible = 150;
                        
                        if (elementTop < window.innerHeight - elementVisible) {
                            element.classList.add('visible');
                        }
                    });
                };
                
                window.addEventListener('scroll', fadeInOnScroll);
                fadeInOnScroll();
            }
        }

        // Smooth scrolling for anchor links
        function initializeSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Initialize all functionality when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initializeThemeToggle();
            initializeMobileNavigation();
            initializeHeaderScroll();
            initializeContactForm();
            initializeScrollAnimations();
            initializeSmoothScrolling();
        });

        // Handle page visibility changes (for theme consistency)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                const currentTheme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', currentTheme);
            }
        });