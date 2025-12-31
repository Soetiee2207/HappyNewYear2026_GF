// Firework Simulator for Epic Finale
// Sound System
let soundEnabled = true;
const explosionSounds = [];
const launchSounds = [];

// Preload sounds
function preloadSounds() {
    const burstSounds = ['audio/burst1.mp3', 'audio/burst2.mp3', 'audio/burst-sm-1.mp3', 'audio/burst-sm-2.mp3'];
    const crackleSounds = ['audio/crackle1.mp3', 'audio/crackle-sm-1.mp3'];
    const lifts = ['audio/lift1.mp3', 'audio/lift2.mp3', 'audio/lift3.mp3'];

    burstSounds.concat(crackleSounds).forEach(src => {
        const audio = new Audio(src);
        audio.volume = 0.3;
        explosionSounds.push(audio);
    });

    lifts.forEach(src => {
        const audio = new Audio(src);
        audio.volume = 0.2;
        launchSounds.push(audio);
    });
}

// Play random explosion sound
function playExplosionSound() {
    if (!soundEnabled || explosionSounds.length === 0) return;
    const sound = explosionSounds[Math.floor(Math.random() * explosionSounds.length)].cloneNode();
    sound.volume = 0.3;
    sound.play().catch(() => { });
}

// Play random launch sound
function playLaunchSound() {
    if (!soundEnabled || launchSounds.length === 0) return;
    const sound = launchSounds[Math.floor(Math.random() * launchSounds.length)].cloneNode();
    sound.volume = 0.2;
    sound.play().catch(() => { });
}

// Love Recap Wishes
const WISH_MESSAGES = [
    "Chúc em năm mới an khang thịnh vượng 🎊",
    "Năm mới bình an, hạnh phúc ❤️",
    "Mọi điều ước đều thành hiện thực ✨",
    "Luôn khỏe mạnh và tràn đầy năng lượng 💪",
    "Công việc thuận lợi, thăng tiến không ngừng 🚀",
    "Luôn mỉm cười và yêu đời mỗi ngày 😊",
    "Gặp nhiều may mắn và niềm vui 🎉",
    "Gia đình luôn bình an và hạnh phúc 🏡",
    "Anh yêu em mãi mãi! 💕",
    "Năm 2026 tuyệt vời nhất! 🌟"
];

// Love Recap Images
const LOVE_IMAGES = [];
const seasons = ['xuan', 'ha', 'thu', 'dong'];
seasons.forEach(season => {
    for (let i = 1; i <= 10; i++) {
        LOVE_IMAGES.push(`images/${season}/${i}.jpg`);
    }
});

// Initialize Firework Simulator
function initFireworkSimulator() {
    const canvas = document.getElementById('epicFireworksCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Firework System
    const fireworks = [];
    const particles = [];

    class Firework {
        constructor(x, targetY) {
            this.x = x;
            this.y = canvas.height;
            this.targetY = targetY;
            this.speed = 5;
            this.exploded = false;
            this.color = this.randomColor();
        }

        randomColor() {
            const colors = ['#FF6B9D', '#FFA5C3', '#C06C84', '#FFD93D', '#6C5CE7', '#A29BFE'];
            return colors[Math.floor(Math.random() * colors.length)];
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
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        explode() {
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }

            // Play explosion sound
            playExplosionSound();
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.opacity = 1;
            this.gravity = 0.15;
            this.friction = 0.98;
        }

        update() {
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.opacity -= 0.015;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((fw, i) => {
            fw.update();
            fw.draw();
            if (fw.exploded) fireworks.splice(i, 1);
        });

        particles.forEach((p, i) => {
            p.update();
            p.draw();
            if (p.opacity <= 0) particles.splice(i, 1);
        });
    }

    animate();

    // Auto-launch fireworks
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        fireworks.push(new Firework(x, y));
    }, 800);

    // Click to launch
    canvas.addEventListener('click', (e) => {
        fireworks.push(new Firework(e.clientX, e.clientY));
    });

    // Flying Wishes
    startFlyingWishes();

    console.log('🎆 Firework simulator initialized!');
}

// Flying Wishes System
function startFlyingWishes() {
    setTimeout(() => {
        // Initial burst
        for (let i = 0; i < 4; i++) {
            setTimeout(spawnWish, i * 700);
        }

        // Continuous spawning
        setInterval(() => {
            const count = 1 + Math.floor(Math.random() * 3);
            for (let i = 0; i < count; i++) {
                setTimeout(spawnWish, i * 300);

                // 30% chance to spawn image with each wish
                if (Math.random() < 0.3) {
                    setTimeout(spawnImage, i * 300 + 200);
                }
            }
        }, 1400);
    }, 500);
}

function spawnWish() {
    const layer = document.getElementById('wishesLayer');
    if (!layer) return;

    const text = WISH_MESSAGES[Math.floor(Math.random() * WISH_MESSAGES.length)];

    const wrapper = document.createElement('div');
    wrapper.className = 'wish-wrapper wish-animate';
    wrapper.style.cssText = `
        position: absolute;
        bottom: -3rem;
        left: ${10 + Math.random() * 80}%;
        transform: translateX(-50%);
        opacity: 0;
        animation: wishFloatUp 7s linear forwards;
        pointer-events: none;
    `;

    const inner = document.createElement('div');
    inner.className = 'wish-text';
    inner.style.cssText = `
        font-size: 1.1rem;
        padding: 0.4rem 1rem;
        border-radius: 999px;
        color: #ff9ad9;
        text-shadow: 0 0 6px rgba(255, 105, 180, 0.9), 0 0 18px rgba(255, 20, 147, 0.8);
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 192, 203, 0.7);
        box-shadow: 0 0 14px rgba(255, 105, 180, 0.7), 0 0 32px rgba(255, 20, 147, 0.4);
        white-space: nowrap;
    `;
    inner.textContent = text;
    wrapper.appendChild(inner);

    layer.appendChild(wrapper);

    setTimeout(() => {
        if (wrapper.parentNode === layer) layer.removeChild(wrapper);
    }, 7000);
}

function spawnImage() {
    const layer = document.getElementById('wishesLayer');
    if (!layer || LOVE_IMAGES.length === 0) return;

    const imgSrc = LOVE_IMAGES[Math.floor(Math.random() * LOVE_IMAGES.length)];

    const wrapper = document.createElement('div');
    wrapper.className = 'wish-wrapper wish-animate';
    wrapper.style.cssText = `
        position: absolute;
        bottom: -200px;
        left: ${5 + Math.random() * 90}%;
        transform: translateX(-50%);
        opacity: 0;
        animation: wishFloatUp 8s linear forwards;
        pointer-events: none;
    `;

    const img = document.createElement('img');
    img.style.cssText = `
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 12px;
        border: 3px solid rgba(255, 192, 203, 0.9);
        box-shadow: 0 0 20px rgba(255, 105, 180, 0.8), 0 0 40px rgba(255, 20, 147, 0.6);
    `;
    img.src = imgSrc;
    img.alt = 'Love Memory';
    wrapper.appendChild(img);

    layer.appendChild(wrapper);

    setTimeout(() => {
        if (wrapper.parentNode === layer) layer.removeChild(wrapper);
    }, 8000);
}

// Preload sounds on load
preloadSounds();

// Sound Toggle Button Handler
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        const soundBtn = document.getElementById('soundBtn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                soundEnabled = !soundEnabled;
                soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
                console.log('🔊 Sound:', soundEnabled ? 'ON' : 'OFF');
            });
        }
    });
}

console.log('💕 Firework Simulator Loaded with Sound! 💕');
