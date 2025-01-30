// Scroll Effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
});

// Initialize Magical Particles
document.addEventListener('DOMContentLoaded', () => {
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