// ================================================
// FIXED: MOBILE MENU NOW WORKS PERFECTLY
// ================================================

$(document).ready(function() {
    console.log('✅ Landing Page Loaded!');
    
    // Initialize everything
    initAOS();
    initMobileMenu(); // FIXED!
    initNavbar();
    initCounters();
    initScrollAnimations();
    initFormSubmission();
    initBackToTop();
});

// ================================================
// FIXED MOBILE MENU - NOW WORKS ON TOUCH DEVICES
// ================================================
function initMobileMenu() {
    const $navToggle = $('.navbar-toggler');
    const $navCollapse = $('.navbar-collapse');
    const $navLinks = $('.nav-link');
    const $body = $('body');
    
    console.log('🔧 Initializing mobile menu...');
    
    // Remove old event listeners
    $navToggle.off('click touchend');
    
    // Toggle menu on click/touch
    $navToggle.on('click touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('📱 Menu button clicked');
        
        const isOpen = $navCollapse.hasClass('show');
        
        if (isOpen) {
            // Close menu
            $navCollapse.removeClass('show');
            $(this).removeClass('active');
            $body.css('overflow', 'auto');
            console.log('❌ Menu closed');
        } else {
            // Open menu
            $navCollapse.addClass('show');
            $(this).addClass('active');
            $body.css('overflow', 'hidden');
            console.log('✅ Menu opened');
        }
    });
    
    // Close menu when clicking a nav link
    $navLinks.on('click touchend', function(e) {
        console.log('🔗 Nav link clicked');
        
        setTimeout(function() {
            $navCollapse.removeClass('show');
            $navToggle.removeClass('active');
            $body.css('overflow', 'auto');
        }, 300);
    });
    
    // Close menu when clicking outside
    $(document).on('click touchend', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            if ($navCollapse.hasClass('show')) {
                $navCollapse.removeClass('show');
                $navToggle.removeClass('active');
                $body.css('overflow', 'auto');
                console.log('🚪 Menu closed (clicked outside)');
            }
        }
    });
    
    // Close menu on window resize
    $(window).on('resize', function() {
        if ($(window).width() > 991) {
            $navCollapse.removeClass('show');
            $navToggle.removeClass('active');
            $body.css('overflow', 'auto');
        }
    });
    
    console.log('✅ Mobile menu initialized');
}

// ================================================
// NAVBAR SCROLL EFFECT
// ================================================
function initNavbar() {
    const $navbar = $('.navbar');
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });
    
    // Smooth scroll for all anchor links
    $('a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        
        // Skip if it's just "#" or empty
        if (href === '#' || !href) {
            e.preventDefault();
            return;
        }
        
        const target = $(href);
        
        if (target.length) {
            e.preventDefault();
            
            const offset = $(window).width() < 768 ? 70 : 80;
            
            $('html, body').animate({
                scrollTop: target.offset().top - offset
            }, 800, 'swing');
        }
    });
}

// ================================================
// INITIALIZE AOS ANIMATIONS
// ================================================
function initAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: false // Enable on all devices
    });
}

// ================================================
// COUNTER ANIMATION
// ================================================
function initCounters() {
    const $counters = $('.counter');
    let animated = false;
    
    function animateCounters() {
        if (animated) return;
        
        const firstCounter = $counters.first();
        if (!isInViewport(firstCounter)) return;
        
        animated = true;
        
        $counters.each(function() {
            const $this = $(this);
            const target = parseInt($this.data('target'));
            
            $({ count: 0 }).animate({ count: target }, {
                duration: 2500,
                easing: 'swing',
                step: function() {
                    $this.text(Math.ceil(this.count));
                },
                complete: function() {
                    $this.text(target);
                }
            });
        });
    }
    
    $(window).on('scroll', animateCounters);
    animateCounters();
}

// ================================================
// SCROLL ANIMATIONS - ACTIVE NAV LINKS
// ================================================
function initScrollAnimations() {
    const $sections = $('section[id]');
    const $navLinks = $('.nav-link');
    
    $(window).on('scroll', function() {
        const scrollY = $(this).scrollTop();
        
        $sections.each(function() {
            const $section = $(this);
            const sectionHeight = $section.outerHeight();
            const sectionTop = $section.offset().top - 100;
            const sectionId = $section.attr('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                $navLinks.removeClass('active');
                $(`.nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    });
}

// ================================================
// FORM SUBMISSION
// ================================================
function initFormSubmission() {
    const $ctaForm = $('#ctaForm');
    const $emailInput = $('#emailInput');
    
    $ctaForm.on('submit', function(e) {
        e.preventDefault();
        
        const email = $emailInput.val().trim();
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        const $submitBtn = $ctaForm.find('button[type="submit"]');
        const originalText = $submitBtn.html();
        
        $submitBtn.prop('disabled', true)
                  .html('<i class="fas fa-spinner fa-spin"></i> Processing...');
        
        setTimeout(function() {
            $ctaForm[0].reset();
            
            $submitBtn.prop('disabled', false)
                      .html(originalText);
            
            // Show success modal
            const successModal = new bootstrap.Modal($('#successModal')[0]);
            successModal.show();
            
            showNotification('Welcome aboard! Check your email 🎉', 'success');
        }, 2000);
    });
    
    // Get Started buttons
    $('.btn-primary, .btn-outline').on('click touchend', function(e) {
        const btnText = $(this).text().toLowerCase();
        
        if (btnText.includes('start') || btnText.includes('trial') || btnText.includes('get started')) {
            e.preventDefault();
            
            $('html, body').animate({
                scrollTop: $('#contact').offset().top - 80
            }, 800, function() {
                $('#emailInput').focus();
            });
        }
    });
    
    // Pricing buttons
    $('.btn-pricing').on('click touchend', function(e) {
        e.preventDefault();
        
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 80
        }, 800, function() {
            $('#emailInput').focus();
        });
    });
}

// ================================================
// BACK TO TOP BUTTON
// ================================================
function initBackToTop() {
    const $backToTop = $('#backToTop');
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 500) {
            $backToTop.addClass('show');
        } else {
            $backToTop.removeClass('show');
        }
    });
    
    $backToTop.on('click touchend', function(e) {
        e.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
}

// ================================================
// NOTIFICATION SYSTEM
// ================================================
function showNotification(message, type = 'success') {
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const bgColor = type === 'success' ? '#10b981' : '#ef4444';
    
    const $notification = $(`
        <div class="notification">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `);
    
    $notification.css({
        position: 'fixed',
        top: '100px',
        right: '-400px',
        background: bgColor,
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 10000,
        fontWeight: '500',
        minWidth: '300px'
    });
    
    $('body').append($notification);
    
    $notification.animate({ right: '30px' }, 300);
    
    setTimeout(function() {
        $notification.animate({ right: '-400px' }, 300, function() {
            $(this).remove();
        });
    }, 4000);
}

// ================================================
// UTILITY FUNCTIONS
// ================================================
function isInViewport($element) {
    if (!$element.length) return false;
    
    const elementTop = $element.offset().top;
    const elementBottom = elementTop + $element.outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();
    
    return elementBottom > viewportTop && elementTop < viewportBottom;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ================================================
// KEYBOARD SHORTCUTS
// ================================================
$(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
        $('.navbar-collapse').removeClass('show');
        $('.navbar-toggler').removeClass('active');
        $('body').css('overflow', 'auto');
    }
    
    if ((e.key === 'h' || e.key === 'H') && !$(e.target).is('input, textarea')) {
        $('html, body').animate({ scrollTop: 0 }, 800);
    }
    
    if ((e.key === 'c' || e.key === 'C') && !$(e.target).is('input, textarea')) {
        $('html, body').animate({ 
            scrollTop: $('#contact').offset().top - 80 
        }, 800);
    }
});

// ================================================
// PREVENT ZOOM ON INPUT FOCUS (iOS FIX)
// ================================================
$('input, textarea, select').on('focus', function() {
    $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
}).on('blur', function() {
    $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0');
});

// ================================================
// CONSOLE WELCOME
// ================================================
console.log('%c🚀 NovaLanding Loaded!', 'background: #667eea; color: white; font-size: 16px; padding: 10px; border-radius: 5px; font-weight: bold;');
console.log('%c✅ Mobile menu fixed', 'color: #10b981; font-weight: bold;');
console.log('%c✅ Hero animation fixed', 'color: #10b981; font-weight: bold;');

// ================================================
// PERFORMANCE MONITORING
// ================================================
$(window).on('load', function() {
    const loadTime = performance.now();
    console.log(`%c⚡ Page loaded in ${loadTime.toFixed(2)}ms`, 'color: #10b981; font-weight: bold;');
    AOS.refresh();
}); 





// ================================================
// VIDEO MODAL FUNCTIONALITY
// ================================================

function initVideoModal() {
    const $videoModal = $('#videoModal');
    const $videoFrame = $('#videoFrame');
    const $closeVideo = $('#closeVideo');
    
    // Your YouTube video ID - CHANGE THIS!
    const videoId = 'aircAruvnKk'; // Replace with your video ID
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    
    // Watch Demo button clicks
    $('.btn-outline').on('click touchend', function(e) {
        const btnText = $(this).text().toLowerCase();
        
        if (btnText.includes('watch') || btnText.includes('demo')) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🎬 Opening video modal');
            
            // Set video URL and show modal
            $videoFrame.attr('src', videoUrl);
            $videoModal.addClass('show');
            $('body').css('overflow', 'hidden');
        }
    });
    
    // Close video modal
    function closeVideoModal() {
        console.log('❌ Closing video modal');
        
        $videoModal.removeClass('show');
        $videoFrame.attr('src', ''); // Stop video
        $('body').css('overflow', 'auto');
    }
    
    // Close button
    $closeVideo.on('click touchend', function(e) {
        e.preventDefault();
        closeVideoModal();
    });
    
    // Click outside to close
    $videoModal.on('click touchend', function(e) {
        if ($(e.target).is('#videoModal')) {
            closeVideoModal();
        }
    });
    
    // Press Escape to close
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $videoModal.hasClass('show')) {
            closeVideoModal();
        }
    });
    
    console.log('✅ Video modal initialized');
}

// Call this function in your $(document).ready()
// Add this line inside $(document).ready() with your other init functions:
initVideoModal();