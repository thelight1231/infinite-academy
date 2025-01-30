// Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    // Create transition element
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    // Handle page transitions
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                const target = link.href;

                // Start transition animation
                transition.style.transform = 'translateX(0)';
                transition.style.transition = 'transform 0.5s ease';

                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            }
        });
    });

    // Initial page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function reveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
});

// Particle System
class MagicalParticles {
    constructor() {
        this.canvas = document.querySelector('.magical-particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
        this.animate();
        this.handleMouseMove();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Create initial particles
        for(let i = 0; i < 50; i++) {
            this.particles.push(this.createParticle());
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            life: 1,
            color: `hsla(${Math.random() * 50 + 190}, 100%, 50%, `
        };
    }

    handleMouseMove() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Create particles on mouse move
            for(let i = 0; i < 2; i++) {
                this.particles.push({
                    x: this.mouseX,
                    y: this.mouseY,
                    size: Math.random() * 3 + 2,
                    speedX: Math.random() * 4 - 2,
                    speedY: Math.random() * 4 - 2,
                    life: 1,
                    color: `hsla(${Math.random() * 50 + 190}, 100%, 50%, `
                });
            }
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.life -= 0.01;
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.life + ')';
            this.ctx.fill();
            
            // Remove dead particles
            if(particle.life <= 0) {
                this.particles.splice(index, 1);
            }
        });

        // Add new particles to maintain count
        while(this.particles.length < 50) {
            this.particles.push(this.createParticle());
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Modal Functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add magical entrance animation
    requestAnimationFrame(() => {
        modal.classList.add('active');
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const content = modal.querySelector('.modal-content');
    
    // Add magical exit animation
    content.style.transform = 'scale(0.95)';
    content.style.opacity = '0';
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Magical Form Handling
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button');
    
    // Add magical submit animation
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Casting Spell...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Portal Opened!';
        button.style.background = 'var(--magical-gradient)';
        
        setTimeout(() => {
            closeModal('loginModal');
            // Reset form
            button.innerHTML = 'Cast Portal Spell';
            button.disabled = false;
            form.reset();
        }, 1500);
    }, 2000);
}

function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button');
    
    // Add magical submit animation
    button.innerHTML = '<i class="fas fa-magic fa-spin"></i> Creating Magic...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Welcome to the Realm!';
        button.style.background = 'var(--magical-gradient)';
        
        setTimeout(() => {
            closeModal('registerModal');
            // Reset form
            button.innerHTML = 'Begin Your Journey';
            button.disabled = false;
            form.reset();
        }, 1500);
    }, 2000);
}

// Scroll Effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    navbar.classList.toggle('scrolled', scrolled);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !hamburger.contains(e.target) && 
                !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    new MagicalParticles();
    
    // Add hover effect to magical buttons
    document.querySelectorAll('.magical-button').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
});