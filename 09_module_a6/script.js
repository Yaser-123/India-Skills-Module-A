let spotlightSize = 100;
const minSize = 10;
const maxSize = 300;
let touchDistance = 0;

const spotlight = document.getElementById('spotlight');
const mainImage = document.getElementById('mainImage');
const sizeDisplay = document.getElementById('size');
const container = document.querySelector('.container');

function updateSpotlightSize(newSize) {
    spotlightSize = Math.max(minSize, Math.min(maxSize, newSize));
    spotlight.style.width = spotlightSize + 'px';
    spotlight.style.height = spotlightSize + 'px';
    sizeDisplay.textContent = spotlightSize;
}

function isInsideImage(x, y) {
    const rect = mainImage.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

container.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    if (isInsideImage(x, y)) {
        const containerRect = container.getBoundingClientRect();
        const spotlightX = x - containerRect.left;
        const spotlightY = y - containerRect.top;
        spotlight.style.left = spotlightX + 'px';
        spotlight.style.top = spotlightY + 'px';
        spotlight.classList.add('visible');
    } else {
        spotlight.classList.remove('visible');
    }
});

container.addEventListener('mouseleave', () => {
    spotlight.classList.remove('visible');
});

container.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -10 : 10;
    updateSpotlightSize(spotlightSize + delta);
});

container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        touchDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
    }
});

container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const newDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        
        const delta = (newDistance - touchDistance) * 0.5;
        updateSpotlightSize(spotlightSize + delta);
        touchDistance = newDistance;
        
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        if (isInsideImage(centerX, centerY)) {
            const containerRect = container.getBoundingClientRect();
            const spotlightX = centerX - containerRect.left;
            const spotlightY = centerY - containerRect.top;
            spotlight.style.left = spotlightX + 'px';
            spotlight.style.top = spotlightY + 'px';
            spotlight.classList.add('visible');
        } else {
            spotlight.classList.remove('visible');
        }
    } else if (e.touches.length === 1) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        if (isInsideImage(x, y)) {
            const containerRect = container.getBoundingClientRect();
            const spotlightX = x - containerRect.left;
            const spotlightY = y - containerRect.top;
            spotlight.style.left = spotlightX + 'px';
            spotlight.style.top = spotlightY + 'px';
            spotlight.classList.add('visible');
        } else {
            spotlight.classList.remove('visible');
        }
    }
});

container.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
        touchDistance = 0;
    }
    if (e.touches.length === 0) {
        spotlight.classList.remove('visible');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        updateSpotlightSize(100);
    }
});
