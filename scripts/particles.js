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