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

    // Hero navigation circles functionality
    const navCircles = document.querySelectorAll('.nav-circle');
    let currentSlide = 0;
    
    // ОБНОВЛЕННЫЙ МАССИВ СЛАЙДОВ С НАСТОЯЩИМИ ИЗОБРАЖЕНИЯМИ
    const slides = [
        {
            title: 'Misr Ehromlari',
            subtitle: 'Sharm al-Sheyx',
            image: 'images/egypt-sharm.jpg', // Ваше изображение Египта
            alt: 'Красивый пейзаж Шарм-эль-Шейха'
        },
        {
            title: 'Buyuk Turkiya',
            subtitle: 'Istanbul',
            image: 'images/turkey-istanbul.jpg', // Ваше изображение Турции
            alt: 'Красивый пейзаж Стамбула'
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
        
        // Обновляем фоновое изображение
        hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${slides[currentSlide].image}')`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
        hero.style.backgroundRepeat = 'no-repeat';
        
        // Обновляем текст
        heroTitle.textContent = slides[currentSlide].title;
        heroLocation.textContent = slides[currentSlide].subtitle;
        
        // Добавляем плавный переход
        hero.style.transition = 'background-image 0.5s ease-in-out';
    }

    function updateNavCircles() {
        navCircles.forEach((circle, index) => {
            circle.classList.toggle('active', index === currentSlide);
        });
    }

    // Предзагрузка изображений для плавной смены
    function preloadImages() {
        slides.forEach(slide => {
            const img = new Image();
            img.src = slide.image;
        });
    }

    // Запускаем предзагрузку
    preloadImages();

    // Инициализируем первый слайд
    updateHeroSlide();
    updateNavCircles();

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
    if (contactForm) {
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
                    submitBtn.style.background = '#131142';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '#f39c12';
                        submitBtn.disabled = false;
                        this.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }

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

    // Mobile menu toggle
    const logo = document.querySelector('.logo');
    let mobileMenuVisible = false;

    if (logo) {
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
    }

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
            if (navMenu) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'row';
                navMenu.style.position = 'static';
                navMenu.style.background = 'none';
                navMenu.style.padding = '0';
                navMenu.style.gap = '40px';
                mobileMenuVisible = false;
            }
        } else {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && !mobileMenuVisible) {
                navMenu.style.display = 'none';
            }
        }
    });

    // Add loading animation for tour buttons
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
                alert('Sayohat sahifasiga yo\'naltirilmoqda...');
            }, 1500);
        });
    });
});