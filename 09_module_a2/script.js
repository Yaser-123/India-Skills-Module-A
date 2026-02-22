// DOM Elements
const sky = document.getElementById('sky');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');
const stars = document.getElementById('stars');
const sceneTitle = document.getElementById('sceneTitle');

// Variables to track state
let isAnimating = false;
let currentTime = 0; // 0=Night, 1=Dawn, 2=Day, 3=Dusk
let animationSpeed = 2; // Default to fast
let animationInterval = null;

// Create stars function
function createStars() {
    stars.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star twinkle';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        stars.appendChild(star);
    }
}

// Initialize stars
createStars();

// Update active button states
function updateButtonStates(activeTime) {
    const timeBtns = document.querySelectorAll('.time-btn');
    timeBtns.forEach(btn => {
        const timeType = btn.getAttribute('data-time');
        if (timeType === activeTime) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Update sky based on time of day
function updateSky() {
    let timeType = '';
    
    switch(currentTime) {
        case 0: // Night
            sky.className = 'sky night';
            moon.classList.remove('hide');
            stars.classList.remove('hide');
            sun.classList.remove('visible', 'day-position');
            sceneTitle.textContent = 'NIGHT';
            timeType = 'night';
            break;
            
        case 1: // Dawn
            sky.className = 'sky dawn';
            moon.classList.add('hide');
            stars.classList.add('hide');
            sun.classList.add('visible');
            sun.classList.remove('day-position');
            sceneTitle.textContent = 'DAWN';
            timeType = 'dawn';
            break;
            
        case 2: // Day
            sky.className = 'sky day';
            moon.classList.add('hide');
            stars.classList.add('hide');
            sun.classList.add('visible', 'day-position');
            sceneTitle.textContent = 'DAY';
            timeType = 'day';
            break;
            
        case 3: // Dusk
            sky.className = 'sky dusk';
            moon.classList.add('hide');
            stars.classList.add('hide');
            sun.classList.add('visible');
            sun.classList.remove('day-position');
            sceneTitle.textContent = 'DUSK';
            timeType = 'dusk';
            break;
    }
    
    updateButtonStates(timeType);
}

// Go to Night
function goToNight() {
    currentTime = 0;
    updateSky();
}

// Go to Dawn
function goToDawn() {
    currentTime = 1;
    updateSky();
}

// Go to Day
function goToDay() {
    currentTime = 2;
    updateSky();
}

// Go to Dusk
function goToDusk() {
    currentTime = 3;
    updateSky();
}

// Animation loop
function animationLoop() {
    if (!isAnimating) return;
    
    currentTime = (currentTime + 1) % 4;
    updateSky();
}

// Start animation
function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    
    // Set interval based on speed (slow=4s, normal=2s, fast=1s)
    const intervalTime = animationSpeed === 0.5 ? 4000 : (animationSpeed === 1 ? 2000 : 1000);
    animationInterval = setInterval(animationLoop, intervalTime);
}

// Pause animation
function pauseAnimation() {
    isAnimating = false;
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
}

// Stop animation and go to night
function stopAnimation() {
    pauseAnimation();
    currentTime = 0;
    updateSky();
}

// Set animation speed
function setSpeed(speed) {
    // Update speed buttons active state
    const speedBtns = document.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
        const speedType = btn.getAttribute('data-speed');
        if (speedType === speed) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    if (speed === 'slow') {
        animationSpeed = 0.5;
    } else if (speed === 'normal') {
        animationSpeed = 1;
    } else if (speed === 'fast') {
        animationSpeed = 2;
    }
    
    // Restart animation with new speed if it's currently running
    if (isAnimating) {
        pauseAnimation();
        startAnimation();
    }
}

// Initialize on page load
window.addEventListener('load', function() {
    updateSky();
});