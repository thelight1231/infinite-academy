class InfinityLogo {
    constructor() {
        this.canvas = document.getElementById('infinityCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        this.animate = this.animate.bind(this);
        
        // Set actual size in memory
        this.canvas.width = 80;
        this.canvas.height = 80;
        
        this.drawInfinity();
    }

    drawInfinity() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const size = Math.min(width, height) * 0.3;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Set style for infinity symbol
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#4facfe');
        gradient.addColorStop(1, '#00f2fe');
        ctx.strokeStyle = gradient;

        // Draw infinity
        ctx.beginPath();
        
        // Calculate points along the infinity curve
        const points = [];
        for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
            const x = centerX + size * Math.sin(t + this.time) / (1 + Math.cos(t + this.time) * Math.cos(t + this.time));
            const y = centerY + size * Math.sin(t + this.time) * Math.cos(t + this.time) / (1 + Math.cos(t + this.time) * Math.cos(t + this.time));
            points.push({x, y});
        }

        // Draw smooth curve through points
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length - 2; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        // Curve through the last two points
        ctx.quadraticCurveTo(
            points[points.length - 2].x,
            points[points.length - 2].y,
            points[points.length - 1].x,
            points[points.length - 1].y
        );

        // Add glow effect
        ctx.shadowColor = '#4facfe';
        ctx.shadowBlur = 15;
        ctx.stroke();
    }

    animate() {
        this.time += 0.03;
        this.drawInfinity();
        requestAnimationFrame(this.animate);
    }
}

// Initialize the infinity logo animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const infinityLogo = new InfinityLogo();
    infinityLogo.animate();
});
