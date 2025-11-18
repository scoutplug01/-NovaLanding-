// ================================================
// NOVALANDING - COMPLETE WORKING JAVASCRIPT
// ================================================

$(document).ready(function() {
    console.log('✅ NovaLanding Loading...');
    
    // Initialize everything
    initAOS();
    initMobileMenu();
    initNavbar();
    initSearch();
    initNotifications();
    initVideoModal();
    initCounters();
    initScrollEffects();
    initFormSubmission();
    initBackToTop();
    
    console.log('🚀 NovaLanding Fully Loaded!');
});

// ================================================
// 1. INITIALIZE AOS
// ================================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ================================================
// 2. MOBILE MENU - FIXED!
// ================================================
function initMobileMenu() {
    const $navToggle = $('#navToggle');
    const $navCollapse = $('#navbarNav');
    const $navLinks = $('.nav-link');
    const $body = $('body');
    
    // Toggle menu
    $navToggle.on('click touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = $navCollapse.hasClass('show');
        
        if (isOpen) {
            $navCollapse.removeClass('show');
            $(this).removeClass('active');
            $body.css('overflow', '');
        } else {
            $navCollapse.addClass('show');
            $(this).addClass('active');
            $body.css('overflow', 'hidden');
        }
    });
    
    // Close on link click
    $navLinks.on('click', function() {
        setTimeout(function() {
            $navCollapse.removeClass('show');
            $navToggle.removeClass('active');
            $body.css('overflow', '');
        }, 200);
    });
    
    // Close on outside click
    $(document).on('click touchend', function(e) {
        if (!$(e.target).closest('.navbar').length && $navCollapse.hasClass('show')) {
            $navCollapse.removeClass('show');
            $navToggle.removeClass('active');
            $body.css('overflow', '');
        }
    });
    
    // Close on window resize
    $(window).on('resize', function() {
        if ($(window).width() > 991 && $navCollapse.hasClass('show')) {
            $navCollapse.removeClass('show');
            $navToggle.removeClass('active');
            $body.css('overflow', '');
        }
    });
    
    console.log('✅ Mobile menu initialized');
}

// ================================================
// 3. NAVBAR SCROLL EFFECT
// ================================================
function initNavbar() {
    const $navbar = $('#navbar');
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });
}

// ================================================
// 4. SEARCH FUNCTIONALITY - FIXED!
// ================================================
function initSearch() {
    const $searchToggle = $('#searchToggle');
    const $searchDropdown = $('#searchDropdown');
    const $searchInput = $('#searchInput');
    const $searchClear = $('#searchClear');
    const $searchResults = $('#searchResults');
    
    // Search data
    const searchData = [
        { title: 'AI-Powered Priority', description: 'Automatically prioritize your tasks', category: 'Features', icon: 'brain', link: '#features' },
        { title: 'Team Collaboration', description: 'Work together seamlessly', category: 'Features', icon: 'users', link: '#features' },
        { title: 'Analytics Dashboard', description: 'Track your productivity', category: 'Features', icon: 'chart-line', link: '#features' },
        { title: 'Mobile Apps', description: 'Access tasks anywhere', category: 'Features', icon: 'mobile-alt', link: '#features' },
        { title: 'Secure & Private', description: 'Enterprise-grade security', category: 'Features', icon: 'shield-alt', link: '#features' },
        { title: 'Integrations', description: 'Connect with favorite tools', category: 'Features', icon: 'plug', link: '#features' },
        { title: 'Starter Plan', description: '$0/month - Perfect for individuals', category: 'Pricing', icon: 'rocket', link: '#pricing' },
        { title: 'Pro Plan', description: '$19/month - Most Popular', category: 'Pricing', icon: 'star', link: '#pricing' },
        { title: 'Enterprise Plan', description: '$49/month - For large teams', category: 'Pricing', icon: 'building', link: '#pricing' },
        { title: 'Testimonials', description: 'What our users say', category: 'Info', icon: 'comments', link: '#testimonials' },
        { title: 'Get Started', description: 'Start your free trial', category: 'Action', icon: 'paper-plane', link: '#contact' }
    ];
    
    // Toggle search
    $searchToggle.on('click touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $searchDropdown.toggleClass('show');
        
        if ($searchDropdown.hasClass('show')) {
            $searchInput.focus();
            $('#notificationDropdown').removeClass('show');
        }
    });
    
    // Clear search
    $searchClear.on('click touchend', function(e) {
        e.preventDefault();
        $searchInput.val('');
        $searchClear.removeClass('show');
        $searchResults.empty();
    });
    
    // Search input
    $searchInput.on('input', function() {
        const query = $(this).val().trim().toLowerCase();
        
        if (query.length > 0) {
            $searchClear.addClass('show');
            performSearch(query);
        } else {
            $searchClear.removeClass('show');
            $searchResults.empty();
        }
    });
    
    // Perform search
    function performSearch(query) {
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        
        displayResults(results);
    }
    
    // Display results
    function displayResults(results) {
        $searchResults.empty();
        
        if (results.length === 0) {
            $searchResults.html(`
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>No results found</p>
                </div>
            `);
            return;
        }
        
        results.forEach(item => {
            const $result = $(`
                <div class="search-result-item" data-link="${item.link}">
                    <div class="search-result-icon">
                        <i class="fas fa-${item.icon}"></i>
                    </div>
                    <div class="search-result-content">
                        <h6>${item.title}</h6>
                        <p>${item.description}</p>
                    </div>
                </div>
            `);
            
            $result.on('click touchend', function(e) {
                e.preventDefault();
                const link = $(this).data('link');
                
                $searchDropdown.removeClass('show');
                $searchInput.val('');
                $searchClear.removeClass('show');
                
                if (link && $(link).length) {
                    $('html, body').animate({
                        scrollTop: $(link).offset().top - 80
                    }, 800);
                }
            });
            
            $searchResults.append($result);
        });
    }
    
    // Close on outside click
    $(document).on('click touchend', function(e) {
        if (!$(e.target).closest('.search-container').length) {
            $searchDropdown.removeClass('show');
        }
    });
    
    console.log('✅ Search initialized');
}

// ================================================
// 5. NOTIFICATIONS - FIXED!
// ================================================
function initNotifications() {
    const $notificationToggle = $('#notificationToggle');
    const $notificationDropdown = $('#notificationDropdown');
    const $notificationBadge = $('#notificationBadge');
    const $notificationList = $('#notificationList');
    const $clearAll = $('#clearAllNotifications');
    
    let notifications = [];
    let notificationCount = 0;
    
    // Toggle dropdown
    $notificationToggle.on('click touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $notificationDropdown.toggleClass('show');
        
        if ($notificationDropdown.hasClass('show')) {
            $('#searchDropdown').removeClass('show');
            markAllAsRead();
        }
    });
    
    // Clear all
    $clearAll.on('click', function(e) {
        e.preventDefault();
        notifications = [];
        notificationCount = 0;
        updateUI();
    });
    
    // Close on outside click
    $(document).on('click touchend', function(e) {
        if (!$(e.target).closest('.notification-container').length) {
            $notificationDropdown.removeClass('show');
        }
    });
    
    // Add notification (exposed globally)
    window.addNotification = function(title, message, type = 'success') {
        const notification = {
            id: Date.now(),
            title: title,
            message: message,
            type: type,
            time: 'Just now',
            unread: true
        };
        
        notifications.unshift(notification);
        notificationCount++;
        
        updateUI();
        
        $notificationToggle.addClass('has-notifications');
        setTimeout(() => {
            $notificationToggle.removeClass('has-notifications');
        }, 2000);
        
        console.log('🔔 Notification:', title);
    };
    
    // Update UI
    function updateUI() {
        if (notificationCount > 0) {
            $notificationBadge.text(notificationCount).addClass('show');
        } else {
            $notificationBadge.removeClass('show');
        }
        
        if (notifications.length === 0) {
            $notificationList.html(`
                <div class="no-notifications">
                    <i class="fas fa-bell-slash"></i>
                    <p>No notifications yet</p>
                </div>
            `);
        } else {
            $notificationList.empty();
            
            notifications.forEach(notif => {
                const iconMap = {
                    success: 'check-circle',
                    info: 'info-circle',
                    warning: 'exclamation-triangle'
                };
                const icon = iconMap[notif.type] || 'bell';
                
                const $item = $(`
                    <div class="notification-item ${notif.unread ? 'unread' : ''}" data-id="${notif.id}">
                        <div class="notification-icon ${notif.type}">
                            <i class="fas fa-${icon}"></i>
                        </div>
                        <div class="notification-content">
                            <h6>${notif.title}</h6>
                            <p>${notif.message}</p>
                            <span class="notification-time">${notif.time}</span>
                        </div>
                    </div>
                `);
                
                $item.on('click', function() {
                    $(this).removeClass('unread');
                });
                
                $notificationList.append($item);
            });
        }
    }
    
    // Mark all as read
    function markAllAsRead() {
        notifications.forEach(n => n.unread = false);
        notificationCount = 0;
        $notificationBadge.removeClass('show');
        $('.notification-item').removeClass('unread');
    }
    
    console.log('✅ Notifications initialized');
}

// ================================================
// 6. VIDEO MODAL - FIXED!
// ================================================
function initVideoModal() {
    const $videoModal = $('#videoModal');
    const $videoFrame = $('#videoFrame');
    const $closeVideo = $('#closeVideo');
    
    const videoId = 'aircAruvnKk'; // Change to your video ID
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    
    // Open video on Watch Demo button
    $('.btn-outline').on('click touchend', function(e) {
        const btnText = $(this).text().toLowerCase();
        
        if (btnText.includes('watch') || btnText.includes('demo')) {
            e.preventDefault();
            
            $videoFrame.attr('src', videoUrl);
            $videoModal.addClass('show');
            $('body').css('overflow', 'hidden');
        }
    });
    
    // Close video
    function closeVideo() {
        $videoModal.removeClass('show');
        $videoFrame.attr('src', '');
        $('body').css('overflow', '');
    }
    
    $closeVideo.on('click touchend', function(e) {
        e.preventDefault();
        closeVideo();
    });
    
    $videoModal.on('click', function(e) {
        if ($(e.target).is($videoModal)) {
            closeVideo();
        }
    });
    
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $videoModal.hasClass('show')) {
            closeVideo();
        }
    });
    
    console.log('✅ Video modal initialized');
}

// ================================================
// 7. COUNTERS ANIMATION
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
// 8. SCROLL EFFECTS
// ================================================
function initScrollEffects() {
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
    
    // Smooth scroll
    $('a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        if (!href || href === '#') return;
        
        const target = $(href);
        if (target.length) {
            e.preventDefault();
            const offset = $(window).width() < 768 ? 70 : 80;
            $('html, body').animate({
                scrollTop: target.offset().top - offset
            }, 800);
        }
    });
}

// ================================================
// 9. FORM SUBMISSION
// ================================================
function initFormSubmission() {
    const $ctaForm = $('#ctaForm');
    const $emailInput = $('#emailInput');
    
    $ctaForm.on('submit', function(e) {
        e.preventDefault();
        
        const email = $emailInput.val().trim();
        
        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
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
            
            showToast('Welcome aboard! Check your email 🎉', 'success');
            
            // Add notification
            addNotification(
                '🎉 Welcome Aboard!',
                'Thank you for subscribing! Check your email for your free trial access.',
                'success'
            );
            
            setTimeout(() => {
                addNotification(
                    '📧 Email Sent',
                    'We\'ve sent you a confirmation email with your login details.',
                    'info'
                );
            }, 1500);
        }, 2000);
    });
    
    // Pricing buttons
    $('.btn-pricing').on('click', function(e) {
        e.preventDefault();
        const planName = $(this).closest('.pricing-card').find('h3').text();
        
        addNotification(
            '💎 Plan Selected',
            `Great choice! You selected the ${planName} plan.`,
            'success'
        );
        
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 80
        }, 800, function() {
            $('#emailInput').focus();
        });
    });
    
    // Get Started buttons
    $('.btn-primary').on('click', function() {
        const btnText = $(this).text();
        
        if (btnText.includes('Start') || btnText.includes('Trial') || btnText.includes('Get Started')) {
            $('html, body').animate({
                scrollTop: $('#contact').offset().top - 80
            }, 800, function() {
                $('#emailInput').focus();
            });
        }
    });
}

// ================================================
// 10. BACK TO TOP BUTTON
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
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
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

function showToast(message, type = 'success') {
    const bgColor = type === 'success' ? '#10b981' : '#ef4444';
    
    const $toast = $(`
        <div class="page-toast">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `);
    
    $toast.css({
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
        fontWeight: '500'
    });
    
    $('body').append($toast);
    
    $toast.animate({ right: '30px' }, 300);
    
    setTimeout(function() {
        $toast.animate({ right: '-400px' }, 300, function() {
            $(this).remove();
        });
    }, 4000);
}

// ================================================
// WELCOME NOTIFICATION (ONCE)
// ================================================

setTimeout(() => {
    if (typeof addNotification === 'function') {
        addNotification(
            '👋 Welcome to NovaLanding!',
            'Explore our features and start your free trial today.',
            'info'
        );
    }
}, 3000);

// ================================================
// KEYBOARD SHORTCUTS
// ================================================

$(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
        $('#navbarNav').removeClass('show');
        $('#navToggle').removeClass('active');
        $('body').css('overflow', '');
    }
});

// ================================================
// CONSOLE WELCOME
// ================================================

console.log('%c🚀 NovaLanding', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 20px; padding: 10px 20px; border-radius: 10px; font-weight: bold;');
console.log('%c✅ All systems operational!', 'color: #10b981; font-size: 14px; font-weight: bold;'); 




// ================================================
// LOCALSTORAGE SYSTEM - TRACK ALL USER ACTIVITY
// Add this to your script.js file
// ================================================

// ================================================
// 1. LOCALSTORAGE MANAGER
// ================================================

const StorageManager = {
    // Keys for different data types
    keys: {
        messages: 'novalanding_messages',
        subscriptions: 'novalanding_subscriptions',
        planSelections: 'novalanding_plans',
        searches: 'novalanding_searches',
        videoViews: 'novalanding_videos',
        visitors: 'novalanding_visitors'
    },
    
    // Save data
    save: function(key, data) {
        try {
            const existing = this.get(key) || [];
            existing.push({
                ...data,
                id: Date.now(),
                timestamp: new Date().toISOString(),
                date: new Date().toLocaleString()
            });
            localStorage.setItem(key, JSON.stringify(existing));
            console.log('✅ Saved to localStorage:', key);
            return true;
        } catch (e) {
            console.error('❌ Error saving to localStorage:', e);
            return false;
        }
    },
    
    // Get data
    get: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('❌ Error reading from localStorage:', e);
            return [];
        }
    },
    
    // Get all data
    getAll: function() {
        return {
            messages: this.get(this.keys.messages),
            subscriptions: this.get(this.keys.subscriptions),
            planSelections: this.get(this.keys.planSelections),
            searches: this.get(this.keys.searches),
            videoViews: this.get(this.keys.videoViews),
            visitors: this.get(this.keys.visitors)
        };
    },
    
    // Clear specific data
    clear: function(key) {
        localStorage.removeItem(key);
        console.log('🗑️ Cleared:', key);
    },
    
    // Clear all data
    clearAll: function() {
        Object.values(this.keys).forEach(key => {
            localStorage.removeItem(key);
        });
        console.log('🗑️ All data cleared');
    },
    
    // Export data as JSON
    export: function() {
        return JSON.stringify(this.getAll(), null, 2);
    }
};

// ================================================
// 2. TRACK VISITOR INFO
// ================================================

function trackVisitor() {
    const visitorInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer || 'Direct',
        platform: navigator.platform,
        visitTime: new Date().toLocaleString()
    };
    
    StorageManager.save(StorageManager.keys.visitors, visitorInfo);
}

// ================================================
// 3. TRACK CONTACT FORM SUBMISSIONS
// ================================================

function trackContactSubmission(email, additionalData = {}) {
    const messageData = {
        email: email,
        name: additionalData.name || 'Not provided',
        subject: additionalData.subject || 'Contact Form',
        message: additionalData.message || 'Subscription',
        source: additionalData.source || 'CTA Form',
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    StorageManager.save(StorageManager.keys.messages, messageData);
    console.log('📧 Contact tracked:', email);
}

// ================================================
// 4. TRACK SUBSCRIPTIONS
// ================================================

function trackSubscription(email) {
    const subscriptionData = {
        email: email,
        status: 'Subscribed',
        source: 'Newsletter',
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    StorageManager.save(StorageManager.keys.subscriptions, subscriptionData);
    console.log('📰 Subscription tracked:', email);
}

// ================================================
// 5. TRACK PLAN SELECTIONS
// ================================================

function trackPlanSelection(planName, price) {
    const planData = {
        plan: planName,
        price: price,
        status: 'Interested',
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    StorageManager.save(StorageManager.keys.planSelections, planData);
    console.log('💎 Plan selection tracked:', planName);
}

// ================================================
// 6. TRACK SEARCHES
// ================================================

function trackSearch(query, resultsCount) {
    const searchData = {
        query: query,
        resultsCount: resultsCount,
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    StorageManager.save(StorageManager.keys.searches, searchData);
}

// ================================================
// 7. TRACK VIDEO VIEWS
// ================================================

function trackVideoView() {
    const videoData = {
        video: 'Product Demo',
        action: 'Watched',
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    StorageManager.save(StorageManager.keys.videoViews, videoData);
    console.log('🎬 Video view tracked');
}

// ================================================
// 8. INITIALIZE TRACKING
// ================================================

function initTracking() {
    // Track visitor on page load
    trackVisitor();
    
    // Update form submission tracking
    $('#ctaForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#emailInput').val().trim();
        
        if (isValidEmail(email)) {
            // Track the submission
            trackContactSubmission(email, {
                source: 'CTA Form - Main Page',
                message: 'Free trial signup'
            });
            
            // Continue with original form logic
            const $submitBtn = $(this).find('button[type="submit"]');
            const originalText = $submitBtn.html();
            
            $submitBtn.prop('disabled', true)
                      .html('<i class="fas fa-spinner fa-spin"></i> Processing...');
            
            setTimeout(function() {
                $('#ctaForm')[0].reset();
                
                $submitBtn.prop('disabled', false)
                          .html(originalText);
                
                showToast('Welcome aboard! Check your email 🎉', 'success');
                
                addNotification(
                    '🎉 Welcome Aboard!',
                    'Thank you for subscribing! Check your email.',
                    'success'
                );
            }, 2000);
        }
    });
    
    // Track pricing button clicks
    $('.btn-pricing').on('click', function(e) {
        e.preventDefault();
        
        const $card = $(this).closest('.pricing-card');
        const planName = $card.find('h3').text();
        const priceText = $card.find('.price').text();
        
        trackPlanSelection(planName, priceText);
        
        addNotification(
            '💎 Plan Selected',
            `Great choice! You selected the ${planName} plan.`,
            'success'
        );
        
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 80
        }, 800);
    });
    
    // Track video views
    $('.btn-outline').on('click', function() {
        const btnText = $(this).text().toLowerCase();
        if (btnText.includes('watch') || btnText.includes('demo')) {
            trackVideoView();
        }
    });
    
    // Track searches
    let lastSearchQuery = '';
    $('#searchInput').on('input', function() {
        const query = $(this).val().trim();
        if (query && query !== lastSearchQuery) {
            lastSearchQuery = query;
            const resultsCount = $('#searchResults .search-result-item').length;
            trackSearch(query, resultsCount);
        }
    });
    
    console.log('✅ Tracking initialized');
}

// ================================================
// 9. ADMIN DASHBOARD VIEW
// ================================================

function openAdminDashboard() {
    const allData = StorageManager.getAll();
    
    // Create dashboard HTML
    const dashboardHTML = `
        <div id="adminDashboard" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 99999; overflow-y: auto; padding: 2rem;">
            <div style="max-width: 1200px; margin: 0 auto; background: white; border-radius: 20px; padding: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem;">
                    <h1 style="margin: 0; color: #0f172a;">📊 Admin Dashboard</h1>
                    <div style="display: flex; gap: 1rem;">
                        <button onclick="exportData()" style="background: #10b981; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-download"></i> Export Data
                        </button>
                        <button onclick="clearAllData()" style="background: #ef4444; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-trash"></i> Clear All
                        </button>
                        <button onclick="closeAdminDashboard()" style="background: #6366f1; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
                
                <!-- Stats Cards -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; font-weight: 800;">${allData.messages.length}</div>
                        <div style="opacity: 0.9;">Messages</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; font-weight: 800;">${allData.subscriptions.length}</div>
                        <div style="opacity: 0.9;">Subscriptions</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; font-weight: 800;">${allData.planSelections.length}</div>
                        <div style="opacity: 0.9;">Plan Selections</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #fa709a, #fee140); color: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <div style="font-size: 2.5rem; font-weight: 800;">${allData.visitors.length}</div>
                        <div style="opacity: 0.9;">Visitors</div>
                    </div>
                </div>
                
                <!-- Data Tables -->
                ${generateDataTable('📧 Messages', allData.messages)}
                ${generateDataTable('📰 Subscriptions', allData.subscriptions)}
                ${generateDataTable('💎 Plan Selections', allData.planSelections)}
                ${generateDataTable('🔍 Searches', allData.searches)}
                ${generateDataTable('🎬 Video Views', allData.videoViews)}
                ${generateDataTable('👥 Visitors', allData.visitors)}
            </div>
        </div>
    `;
    
    $('body').append(dashboardHTML);
}

function generateDataTable(title, data) {
    if (!data || data.length === 0) {
        return `
            <div style="margin-bottom: 2rem;">
                <h2 style="color: #0f172a; margin-bottom: 1rem;">${title}</h2>
                <p style="color: #64748b; padding: 2rem; background: #f8fafc; border-radius: 10px; text-align: center;">No data yet</p>
            </div>
        `;
    }
    
    const headers = Object.keys(data[0]).filter(key => key !== 'id');
    
    return `
        <div style="margin-bottom: 2rem;">
            <h2 style="color: #0f172a; margin-bottom: 1rem;">${title} (${data.length})</h2>
            <div style="overflow-x: auto; background: #f8fafc; border-radius: 10px; padding: 1rem;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #e2e8f0;">
                            ${headers.map(header => `<th style="padding: 1rem; text-align: left; font-weight: 600; color: #0f172a; text-transform: capitalize;">${header}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(item => `
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                ${headers.map(header => `<td style="padding: 1rem; color: #64748b;">${item[header] || 'N/A'}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function closeAdminDashboard() {
    $('#adminDashboard').remove();
}

function exportData() {
    const data = StorageManager.export();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `novalanding-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Data exported successfully!', 'success');
}

function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
        StorageManager.clearAll();
        closeAdminDashboard();
        showToast('All data cleared!', 'success');
    }
}

// ================================================
// 10. SECRET ADMIN ACCESS
// ================================================

// Press Ctrl+Shift+A to open admin dashboard
$(document).on('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        openAdminDashboard();
    }
});

// Or add a hidden button (optional)
function addAdminButton() {
    const $adminBtn = $(`
        <button id="adminAccessBtn" style="
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            z-index: 998;
            display: none;
        ">
            <i class="fas fa-chart-bar"></i>
        </button>
    `);
    
    $adminBtn.on('click', openAdminDashboard);
    $('body').append($adminBtn);
    
    // Show button after 3 clicks on logo
    let clickCount = 0;
    $('.navbar-brand').on('click', function() {
        clickCount++;
        if (clickCount >= 3) {
            $adminBtn.fadeIn();
            showToast('Admin access unlocked!', 'success');
        }
    });
}

// ================================================
// 11. INITIALIZE EVERYTHING
// ================================================

$(document).ready(function() {
    // Add this to your existing $(document).ready()
    initTracking();
    addAdminButton();
    
    console.log('✅ LocalStorage tracking active');
    console.log('💡 Press Ctrl+Shift+A to view admin dashboard');
    console.log('💡 Or click logo 3 times to unlock admin button');
});

// Make functions globally accessible
window.StorageManager = StorageManager;
window.openAdminDashboard = openAdminDashboard;
window.closeAdminDashboard = closeAdminDashboard;
window.exportData = exportData;
window.clearAllData = clearAllData;