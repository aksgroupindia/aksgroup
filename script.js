// Smooth Page Entry
document.addEventListener("DOMContentLoaded", () => {
    console.log("AKS Group Systems Online...");
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 1.5s";
        document.body.style.opacity = "1";
    }, 100);
});

// Dynamic Company Hover Effects
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.borderColor = "#C5B358";
    });
    card.addEventListener('mouseout', () => {
        card.style.borderColor = "rgba(255,255,255,0.1)";
    });
});
