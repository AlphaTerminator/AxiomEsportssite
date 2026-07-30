/* ========================================
   AXIOM E-SPORTS - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVIGATION
    // ========================================
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });
    
    // ========================================
    // ROSTER TABS
    // ========================================
    const rosterTabs = document.querySelectorAll('.roster-tab');
    const rosterPanels = document.querySelectorAll('.roster-panel');
    
    rosterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const game = this.getAttribute('data-game');
            
            // Remove active class from all tabs and panels
            rosterTabs.forEach(t => t.classList.remove('active'));
            rosterPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.querySelector(`.roster-panel[data-game="${game}"]`).classList.add('active');
        });
    });
    
    // ========================================
    // ANIMATED COUNTERS
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    const observerOptions = {
        threshold: 0.5
    };
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }, observerOptions);
    
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // ========================================
    // PARTICLE EFFECT (Simple implementation)
    // ========================================
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(0, 212, 255, ' + (Math.random() * 0.5 + 0.3) + ')';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.pointerEvents = 'none';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 20000);
        }
        
        // Create initial particles
        for (let i = 0; i < 30; i++) {
            createParticle();
        }
        
        // Continue creating particles
        setInterval(createParticle, 500);
    }
    
    // Add floating animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // GAME CARDS INTERACTION
    // ========================================
    const gameCards = document.querySelectorAll('.game-card:not(.add-game)');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const game = this.getAttribute('data-game');
            const rostersSection = document.getElementById('rosters');
            
            if (rostersSection) {
                // Find and click the corresponding roster tab
                const rosterTab = document.querySelector(`.roster-tab[data-game="${game}"]`);
                if (rosterTab) {
                    rosterTab.click();
                }
                
                // Scroll to rosters section
                rostersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // ========================================
    // JOIN FORM HANDLING
    // ========================================
    const joinForm = document.getElementById('joinForm');
    
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.username || !data.email || !data.discord || !data.game) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            console.log('Application submitted:', data);
            
            showNotification('Application submitted successfully! We\'ll contact you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // ========================================
    // NOTIFICATION SYSTEM
    // ========================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 212, 255, 0.9)' : type === 'error' ? 'rgba(255, 0, 110, 0.9)' : 'rgba(123, 44, 191, 0.9)'};
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Rajdhani', sans-serif;
            font-size: 16px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Add notification animations
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    const animatedElements = document.querySelectorAll('.game-card, .player-card, .tournament-card, .event-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        scrollObserver.observe(el);
    });
    
    // ========================================
    // DISCORD BUTTON ENHANCEMENT
    // ========================================
    const discordBtn = document.querySelector('.discord-btn');
    
    if (discordBtn) {
        discordBtn.addEventListener('mouseenter', function() {
            this.innerHTML = '<i class="fab fa-discord"></i><span>Join Our Discord</span>';
        });
        
        discordBtn.addEventListener('mouseleave', function() {
            this.innerHTML = '<i class="fab fa-discord"></i><span>Discord</span>';
        });
    }
    
    // ========================================
    // TYPING EFFECT FOR HERO (Optional)
    // ========================================
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroDescription) {
        const originalText = heroDescription.innerHTML;
        // You can add a typing effect here if desired
    }
    
    console.log('Axiom E-Sports website loaded successfully! AXM');
    
    // ========================================
    // DISCORD API INTEGRATION
    // ========================================
    // Fetch active members from Discord server
    async function fetchDiscordMembers() {
        const memberCountEl = document.querySelector('.discord-members');
        const rosterContentEl = document.getElementById('roster-content');
        const rosterLoadingEl = document.getElementById('roster-loading');
        
        // NOTE: Replace with your actual Discord Server ID and Bot Token endpoint
        // For security, you should create a backend endpoint that fetches this data
        // This is a client-side example - in production, use a server-side proxy
        
        const DISCORD_SERVER_ID = 'YOUR_SERVER_ID'; // Replace with your Discord Server ID
        const DISCORD_API_URL = `https://discord.com/api/guilds/${DISCORD_SERVER_ID}/members?limit=1000`;
        
        try {
            // In production, call your backend endpoint instead of Discord API directly
            // Example: const response = await fetch('/api/discord-members');
            
            // For now, we'll simulate the API call with a placeholder
            // When you have 150+ members or set up a bot, replace this with real API call
            
            // Simulated delay for demo
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Placeholder data - replace with actual API response when available
            // Once you have a Discord bot or webhook set up, fetch real member data
            const mockMemberCount = Math.floor(Math.random() * 50) + 10; // Random 10-60 for demo
            
            // Update member count
            if (memberCountEl) {
                memberCountEl.textContent = mockMemberCount;
                memberCountEl.parentElement.querySelector('.stat-loading').style.display = 'none';
            }
            
            // Generate roster cards from "Discord API"
            if (rosterContentEl && rosterLoadingEl) {
                rosterLoadingEl.style.display = 'none';
                
                // Mock member data - replace with real API response
                const mockMembers = [
                    { username: 'ShadowStrike', game: 'Valorant', role: 'Duelist' },
                    { username: 'NightHawk', game: 'CS2', role: 'AWP' },
                    { username: 'PhoenixRising', game: 'League', role: 'Mid Lane' },
                    { username: 'VortexGaming', game: 'Rocket League', role: 'Striker' },
                    { username: 'CyberNinja', game: 'Apex Legends', role: 'Assault' },
                    { username: 'QuantumLeap', game: 'Overwatch 2', role: 'Support' },
                    { username: 'NeonBlaze', game: 'Valorant', role: 'Controller' },
                    { username: 'IronFist', game: 'CS2', role: 'Entry Fragger' }
                ];
                
                let rosterHTML = '<div class="players-grid">';
                mockMembers.forEach((member, index) => {
                    const isCaptain = index === 0;
                    rosterHTML += `
                        <div class="player-card ${isCaptain ? 'captain' : ''}">
                            <div class="player-avatar">
                                ${isCaptain ? '<i class="fas fa-crown"></i>' : member.username.substring(0, 2).toUpperCase()}
                            </div>
                            <div class="player-details">
                                <h4>${member.username}<span class="ingame-tag">AXM</span></h4>
                                <span class="role">${member.role}</span>
                                <span class="game-played">${member.game}</span>
                            </div>
                        </div>
                    `;
                });
                rosterHTML += '</div>';
                
                rosterContentEl.innerHTML = rosterHTML;
            }
            
        } catch (error) {
            console.error('Error fetching Discord members:', error);
            if (rosterLoadingEl) {
                rosterLoadingEl.innerHTML = '<p>Error loading members. Please join our Discord to see active members!</p>';
            }
            if (memberCountEl) {
                memberCountEl.textContent = '--';
                memberCountEl.parentElement.querySelector('.stat-loading').style.display = 'none';
            }
        }
    }
    
    // Initialize Discord member fetch
    fetchDiscordMembers();
    
    // Refresh member count every 5 minutes
    setInterval(fetchDiscordMembers, 300000);
});

// ========================================
// ADDITIONAL UTILITY FUNCTIONS
// ========================================

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        const particles = document.getElementById('particles');
        if (particles && scrolled < window.innerHeight) {
            particles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add loaded styles
const loadStyle = document.createElement('style');
loadStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadStyle);
