function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        offset: 50,
        anchorPlacement: 'top-bottom',
        disable: false
    });

    // Custom animation sequences for specific elements
    const animationSequences = {
        'fade-up-slow': { duration: 1200, delay: 100 },
        'fade-up-medium': { duration: 800, delay: 200 },
        'fade-up-fast': { duration: 600, delay: 300 },
        'zoom-in-slow': { duration: 1000, delay: 150 },
        'slide-right': { duration: 800, delay: 200 },
        'slide-left': { duration: 800, delay: 200 }
    };

    // Apply custom animations to elements
    Object.entries(animationSequences).forEach(([animation, settings]) => {
        document.querySelectorAll(`[data-aos=${animation}]`).forEach(element => {
            element.setAttribute('data-aos-duration', settings.duration);
            element.setAttribute('data-aos-delay', settings.delay);
        });
    });

    // Enhanced counter animation with easing
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter-value');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            
            const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
            const animationDuration = 2000;
            const framesPerSecond = 60;
            const totalFrames = (animationDuration / 1000) * framesPerSecond;
            let frame = 0;
            
            const updateCounter = () => {
                if (frame <= totalFrames) {
                    const progress = easeOutQuart(frame / totalFrames);
                    current = Math.round(progress * target);
                    counter.textContent = current.toLocaleString();
                    frame++;
                    requestAnimationFrame(updateCounter);
                }
            };

            // Use Intersection Observer for triggering
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    };

    // Scroll-triggered parallax effects
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Initialize animations
    animateCounters();

    // Refresh animations on dynamic content changes
    const refreshAnimations = debounce(() => {
        AOS.refresh();
        animateCounters();
    }, 150);

    document.addEventListener('contentChanged', refreshAnimations);
});

// Add smooth scrolling for anchor links
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

const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});