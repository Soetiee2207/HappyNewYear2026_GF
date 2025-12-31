// ===== EPIC FINALE SYSTEM =====

// Initialize epic finale when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎆 Initializing Epic Finale System...');
    initEpicFinale();
});

function initEpicFinale() {
    const notificationPopup = document.getElementById('notificationPopup');
    const viewMessageBtn = document.getElementById('viewMessageBtn');
    const epicFinale = document.getElementById('epicFinale');

    console.log('Epic Finale elements:', {
        notificationPopup: !!notificationPopup,
        viewMessageBtn: !!viewMessageBtn,
        epicFinale: !!epicFinale
    });

    // View message button click
    if (viewMessageBtn) {
        viewMessageBtn.addEventListener('click', () => {
            console.log('View Message button clicked!');
            // Hide notification
            notificationPopup.classList.remove('active');
            // Start epic finale after short delay
            setTimeout(() => {
                console.log('Starting Epic Finale...');
                startEpicFinale();
            }, 600);
        });
    }
}

// Collect all images from 4 seasons
function getAllSeasonImages() {
    const allImages = [];
    const seasons = ['xuan', 'ha', 'thu', 'dong'];

    seasons.forEach(season => {
        for (let i = 1; i <= 10; i++) {
            allImages.push(`images/${season}/${i}.jpg`);
        }
    });

    console.log(`📸 Loaded ${allImages.length} images for slideshow`);
    return allImages;
}

// Start epic finale
function startEpicFinale() {
    const epicFinale = document.getElementById('epicFinale');
    console.log('Activating epic finale...');
    epicFinale.classList.add('active');

    // Start slideshow
    console.log('Starting slideshow...');
    startSlideshow();

    // Start epic fireworks
    console.log('Starting epic fireworks...');
    startEpicFireworks();

    // Credits are auto-animated by CSS
    console.log('Credits will auto-scroll (CSS animated)');

    // Verify credits animation
    setTimeout(() => {
        const creditsContent = document.querySelector('.credits-content');
        if (creditsContent) {
            const styles = window.getComputedStyle(creditsContent);
            console.log('Credits animation:', styles.animation);
            console.log('Credits bottom position:', styles.bottom);
        }
    }, 2000);
}

// Image slideshow
let slideshowInterval;
let currentSlideIndex = 0;

function startSlideshow() {
    const container = document.getElementById('slideshowContainer');
    const images = getAllSeasonImages();

    if (!container) {
        console.error('Slideshow container not found!');
        return;
    }

    // Clear container
    container.innerHTML = '';
    console.log(`Creating ${images.length} slides...`);

    // Create image elements
    images.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'slideshow-image';
        if (index === 0) {
            slide.classList.add('active');
            console.log(`First image: ${imgSrc}`);
        }

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Love Memory ' + (index + 1);
        img.onerror = () => console.error(`Failed to load: ${imgSrc}`);
        img.onload = () => {
            if (index === 0) console.log(`✓ First image loaded successfully!`);
        };

        slide.appendChild(img);
        container.appendChild(slide);
    });

    // Auto-advance slideshow every 3 seconds
    const slides = container.querySelectorAll('.slideshow-image');
    console.log(`✓ Created ${slides.length} slides`);

    slideshowInterval = setInterval(() => {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add('active');
        console.log(`Slide ${currentSlideIndex + 1}/${slides.length}`);
    }, 3000);
}

// Epic continuous fireworks
function startEpicFireworks() {
    const canvas = document.getElementById('epicFireworksCanvas');
    if (!canvas) {
        console.error('Fireworks canvas not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    console.log('Fireworks canvas initialized');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fireworks = [];
    const particles = [];

    // Firework class
    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = canvas.height;
            this.targetY = y;
            this.speed = 6;
            this.radius = 3;
            this.color = getRandomColor();
            this.exploded = false;
            // Play lift sound when firework launches
            playLiftSound();
        }

        update() {
            if (this.y > this.targetY) {
                this.y -= this.speed;
            } else if (!this.exploded) {
                this.explode();
                this.exploded = true;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        explode() {
            const particleCount = 80;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
            // Play explosion sound
            playFireworkSound();
        }
    }

    // Pre-load firework sounds for better performance
    const fireworkSounds = {
        bursts: [
            new Audio('audio/burst1.mp3'),
            new Audio('audio/burst2.mp3'),
            new Audio('audio/burst-sm-1.mp3'),
            new Audio('audio/burst-sm-2.mp3')
        ],
        crackles: [
            new Audio('audio/crackle1.mp3'),
            new Audio('audio/crackle-sm-1.mp3')
        ],
        lifts: [
            new Audio('audio/lift1.mp3'),
            new Audio('audio/lift2.mp3'),
            new Audio('audio/lift3.mp3')
        ]
    };

    // Set volume for all sounds
    Object.values(fireworkSounds).forEach(soundArray => {
        soundArray.forEach(sound => {
            sound.volume = 0.4; // 40% volume
        });
    });

    // Play firework explosion sound
    function playFireworkSound() {
        try {
            // Random burst or crackle sound
            const soundType = Math.random() > 0.5 ? 'bursts' : 'crackles';
            const soundArray = fireworkSounds[soundType];
            const sound = soundArray[Math.floor(Math.random() * soundArray.length)];

            // Clone and play to allow multiple simultaneous sounds
            const soundClone = sound.cloneNode();
            soundClone.volume = 0.4;
            soundClone.play().catch(e => console.log('Sound play prevented'));
        } catch (e) {
            // Silently fail if audio not supported
        }
    }

    // Play lift sound when firework launches
    function playLiftSound() {
        try {
            const sound = fireworkSounds.lifts[Math.floor(Math.random() * fireworkSounds.lifts.length)];
            const soundClone = sound.cloneNode();
            soundClone.volume = 0.3;
            soundClone.play().catch(e => console.log('Sound play prevented'));
        } catch (e) {
            // Silently fail
        }
    }

    // Particle class
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 3 + 1;
            this.velocity = {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10
            };
            this.gravity = 0.2;
            this.friction = 0.97;
            this.opacity = 1;
            this.fade = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.velocity.y += this.gravity;

            this.x += this.velocity.x;
            this.y += this.velocity.y;

            this.opacity -= this.fade;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function getRandomColor() {
        const colors = [
            '#FF6B9D', '#FFA5C3', '#C06C84',
            '#6C5CE7', '#A29BFE', '#FFFFFF',
            '#FFD93D', '#FF6FB5', '#B983FF',
            '#00F5FF', '#FF00FF', '#FFFF00'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw fireworks
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();

            if (fireworks[i].exploded) {
                fireworks.splice(i, 1);
            }
        }

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].opacity <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    animate();
    console.log('✓ Fireworks animation loop started');

    // Launch fireworks automatically every 500ms
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        fireworks.push(new Firework(x, y));
    }, 500);
    console.log('✓ Auto-launch interval set (500ms)');
}

// Show notification with background fireworks when countdown ends
function showNewYearNotification() {
    console.log('🎉 NEW YEAR! Showing notification...');
    const notificationPopup = document.getElementById('notificationPopup');

    // Show notification
    setTimeout(() => {
        notificationPopup.classList.add('active');
        console.log('✓ Notification popup displayed');
    }, 500);

    // Start background fireworks on countdown screen
    startBackgroundFireworks();
}

// Background fireworks for countdown screen
function startBackgroundFireworks() {
    console.log('Starting background fireworks...');
    const canvas = document.createElement('canvas');
    canvas.id = 'backgroundFireworksCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9997';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = canvas.height;
            this.targetY = y;
            this.speed = 5;
            this.radius = 2;
            this.color = '#FF6B9D';
            this.exploded = false;
        }

        update() {
            if (this.y > this.targetY) {
                this.y -= this.speed;
            } else if (!this.exploded) {
                this.explode();
                this.exploded = true;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        explode() {
            for (let i = 0; i < 30; i++) {
                particles.push({
                    x: this.x,
                    y: this.y,
                    vx: (Math.random() - 0.5) * 6,
                    vy: (Math.random() - 0.5) * 6,
                    opacity: 1
                });
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            if (fireworks[i].exploded) fireworks.splice(i, 1);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1;
            p.opacity -= 0.02;

            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = '#FFA5C3';
            ctx.fillRect(p.x, p.y, 2, 2);
            ctx.restore();

            if (p.opacity <= 0) particles.splice(i, 1);
        }
    }

    animate();

    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.4;
        fireworks.push(new Firework(x, y));
    }, 800);

    console.log('✓ Background fireworks started');
}

console.log('🎆 Epic Finale System Loaded! 🎆');
