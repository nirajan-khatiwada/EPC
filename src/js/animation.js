document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with optimized settings
    AOS.init({
        duration: 800,
        once: true,
        mirror: false,
        offset: 100,
        easing: 'ease-out-cubic',
        disable: 'mobile'
    });

    // Optimized counter animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter-value');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = parseInt(counter.dataset.duration) || 2000;
            const decimals = parseInt(counter.dataset.decimals) || 0;
            let startTime;
            
            const easeOutQuart = t => 1 - (--t) * t * t * t;
            
            function updateCounter(currentTime) {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const easedProgress = easeOutQuart(progress);
                
                const currentValue = Math.round(easedProgress * target * Math.pow(10, decimals)) / Math.pow(10, decimals);
                counter.textContent = currentValue.toLocaleString('en-US', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals
                });
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            }, {
                threshold: 0.2
            });
            
            observer.observe(counter);
        });
    };

    // Utility function for debouncing
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

    // Initialize animations
    animateCounters();

    // Refresh animations on dynamic content changes
    document.addEventListener('contentChanged', debounce(() => {
        AOS.refresh();
        animateCounters();
    }, 150));
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