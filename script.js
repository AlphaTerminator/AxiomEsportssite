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
});

// ========================================
// SNAKE GAME FOR ARCADE SECTION
// ========================================
const snakeGame = {
    canvas: null,
    ctx: null,
    gridSize: 20,
    tileCount: 20,
    snake: [],
    food: {},
    direction: 'right',
    nextDirection: 'right',
    score: 0,
    highScore: 0,
    gameInterval: null,
    isRunning: false,

    init() {
        this.canvas = document.getElementById('snakeCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.loadHighScore();
        this.setupControls();
        this.drawInitialScreen();
    },

    loadHighScore() {
        const saved = localStorage.getItem('axiomSnakeHighScore');
        if (saved) {
            this.highScore = parseInt(saved);
            document.getElementById('high-score').textContent = this.highScore;
        }
    },

    saveHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('axiomSnakeHighScore', this.highScore);
            document.getElementById('high-score').textContent = this.highScore;
        }
    },

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.isRunning) return;
            
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (this.direction !== 'down') this.nextDirection = 'up';
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (this.direction !== 'up') this.nextDirection = 'down';
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (this.direction !== 'right') this.nextDirection = 'left';
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (this.direction !== 'left') this.nextDirection = 'right';
                    break;
            }
        });

        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startGame());
        }
    },

    drawInitialScreen() {
        this.ctx.fillStyle = '#0a0a0f';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00d4ff';
        this.ctx.font = 'bold 30px Orbitron, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('SNAKE', this.canvas.width / 2, this.canvas.height / 2 - 20);
        
        this.ctx.fillStyle = '#a0a0b0';
        this.ctx.font = '16px Rajdhani, sans-serif';
        this.ctx.fillText('Press Start to Play', this.canvas.width / 2, this.canvas.height / 2 + 20);
    },

    startGame() {
        if (this.isRunning) return;
        
        this.snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.updateScore();
        this.placeFood();
        this.isRunning = true;
        
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.innerHTML = '<i class="fas fa-redo"></i> Restart';
        }
        
        if (this.gameInterval) clearInterval(this.gameInterval);
        this.gameInterval = setInterval(() => this.update(), 100);
    },

    placeFood() {
        do {
            this.food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    },

    update() {
        this.direction = this.nextDirection;
        
        const head = { ...this.snake[0] };
        
        switch(this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.placeFood();
        } else {
            this.snake.pop();
        }
        
        this.draw();
    },

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0a0a0f';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
        
        // Draw snake
        this.snake.forEach((segment, index) => {
            const gradient = this.ctx.createRadialGradient(
                segment.x * this.gridSize + this.gridSize / 2,
                segment.y * this.gridSize + this.gridSize / 2,
                0,
                segment.x * this.gridSize + this.gridSize / 2,
                segment.y * this.gridSize + this.gridSize / 2,
                this.gridSize / 2
            );
            
            if (index === 0) {
                gradient.addColorStop(0, '#00ffff');
                gradient.addColorStop(1, '#00d4ff');
            } else {
                gradient.addColorStop(0, '#7b2cbf');
                gradient.addColorStop(1, '#5a1a9a');
            }
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
        
        // Draw food
        const foodGradient = this.ctx.createRadialGradient(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            0,
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2
        );
        foodGradient.addColorStop(0, '#ff6ec4');
        foodGradient.addColorStop(1, '#ff006e');
        
        this.ctx.fillStyle = foodGradient;
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
        
        // Food glow effect
        this.ctx.shadowColor = '#ff006e';
        this.ctx.shadowBlur = 15;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    },

    updateScore() {
        document.getElementById('current-score').textContent = this.score;
    },

    gameOver() {
        this.isRunning = false;
        clearInterval(this.gameInterval);
        this.saveHighScore();
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#ff006e';
        this.ctx.font = 'bold 36px Orbitron, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '20px Rajdhani, sans-serif';
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
        
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.innerHTML = '<i class="fas fa-play"></i> Play Again';
        }
    }
};

// Initialize snake game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    snakeGame.init();
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
