// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
   

    // Hero navigation circles functionality
    const navCircles = document.querySelectorAll('.nav-circle');
    let currentSlide = 0;
    const slides = [
        {
            title: 'Quyoshli Misr',
            subtitle: 'Sharm al-Sheyx',
            background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900"><rect fill="%23D4A574" width="1400" height="900"/><polygon fill="%23C19660" points="0,500 350,300 700,450 1050,200 1400,350 1400,900 0,900"/><circle fill="%23E6D7C3" cx="300" cy="200" r="80" opacity="0.7"/></svg>\')'
        },
        {
            title: 'Buyuk Turkiya',
            subtitle: 'Istanbul',
            background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900"><rect fill="%23E74C3C" width="1400" height="900"/><polygon fill="%23C0392B" points="0,400 400,250 800,400 1200,200 1400,300 1400,900 0,900"/><circle fill="%23F1C40F" cx="600" cy="180" r="60"/></svg>\')'
        }
    ];

    navCircles.forEach((circle, index) => {
        circle.addEventListener('click', function() {
            currentSlide = index;
            updateHeroSlide();
            updateNavCircles();
        });
    });

    function updateHeroSlide() {
        const hero = document.querySelector('.hero');
        const heroTitle = document.querySelector('.hero-title');
        const heroLocation = document.querySelector('.hero-location');
        
        hero.style.background = slides[currentSlide].background;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
        
        heroTitle.textContent = slides[currentSlide].title;
        heroLocation.textContent = slides[currentSlide].subtitle;
    }

    function updateNavCircles() {
        navCircles.forEach((circle, index) => {
            circle.classList.toggle('active', index === currentSlide);
        });
    }

    // Auto-slide functionality
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateHeroSlide();
        updateNavCircles();
    }, 5000);

    // Tour card hover effects
    const tourCards = document.querySelectorAll('.tour-card');
    tourCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Place card hover effects
    const placeCards = document.querySelectorAll('.place-card');
    placeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox-overlay';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            `;
            
            const img = document.createElement('div');
            const originalBg = window.getComputedStyle(this.querySelector('.gallery-image')).backgroundImage;
            img.style.cssText = `
                width: 80%;
                height: 80%;
                background-image: ${originalBg};
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                border-radius: 15px;
            `;
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            // Close on click
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        
        if (name && phone) {
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'YUBORILMOQDA...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'YUBORILDI ✓';
                submitBtn.style.background = '#27ae60';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '#f39c12';
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        }
    });

    // Testimonials carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-nav .nav-dot');
    let currentTestimonial = 0;

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentTestimonial = index;
            updateTestimonials();
        });
    });

    function updateTestimonials() {
        // This would be more complex with actual carousel functionality
        // For now, just update the active dot
        testimonialDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }

    // Animate statistics on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
                
                animateNumber(target, 0, numericValue, 2000, finalNumber.includes('+'));
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateNumber(element, start, end, duration, hasPlus) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + (hasPlus ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Mobile menu toggle (for responsive design)
    const logo = document.querySelector('.logo');
    let mobileMenuVisible = false;

    logo.addEventListener('click', function() {
        if (window.innerWidth <= 992) {
            const navMenu = document.querySelector('.nav-menu');
            
            if (!mobileMenuVisible) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'rgba(60, 60, 60, 0.98)';
                navMenu.style.padding = '20px';
                navMenu.style.gap = '15px';
                mobileMenuVisible = true;
            } else {
                navMenu.style.display = 'none';
                mobileMenuVisible = false;
            }
        }
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.nav-menu a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992 && mobileMenuVisible) {
                document.querySelector('.nav-menu').style.display = 'none';
                mobileMenuVisible = false;
            }
        });
    });

    // Resize handler for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.background = 'none';
            navMenu.style.padding = '0';
            navMenu.style.gap = '40px';
            mobileMenuVisible = false;
        } else {
            const navMenu = document.querySelector('.nav-menu');
            if (!mobileMenuVisible) {
                navMenu.style.display = 'none';
            }
        }
    });

    // Add loading animation
    const tourButtons = document.querySelectorAll('.tour-btn');
    tourButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.textContent;
            this.textContent = 'YUKLANMOQDA...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                // Here you would typically redirect to booking page
                alert('Sayohat sahifasiga yo\'naltirilmoqda...');
            }, 1500);
        });
    });
});