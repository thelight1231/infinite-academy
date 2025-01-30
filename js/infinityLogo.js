// Infinity Logo Animation
function initInfinityLogo() {
    const canvas = document.getElementById('infinityCanvas');
    if (!canvas) return; // Exit if canvas not found
    
    const ctx = canvas.getContext('2d');
    let t = 0;

    function drawInfinity() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.strokeStyle = '#4facfe';
        ctx.lineWidth = 2;
        
        for(let i = 0; i < 50; i++) {
            let point = i / 49;
            let x = canvas.width/2 + (10 * Math.sin(2 * Math.PI * point + t));
            let y = canvas.height/2 + (10 * Math.sin(4 * Math.PI * point));
            
            if(i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        t += 0.01;
        requestAnimationFrame(drawInfinity);
    }

    drawInfinity();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initInfinityLogo);
