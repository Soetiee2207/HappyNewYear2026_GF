// ===== GLOBAL STATE =====
let currentScreen = 1;
let countdownInterval = null;
let musicPlaying = false;
let fireworksActive = false;

// ===== ELEMENTS =====
const screens = document.querySelectorAll('.screen');
const musicControl = document.getElementById('musicControl');
const bgMusic = document.getElementById('bgMusic');
const startBtn = document.getElementById('startBtn');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMusicPlayer();
    initCountdown();
    initModal();
    if (canvas) initFireworks();
    createHearts();
    createStars();
});

// ===== NAVIGATION SYSTEM =====
function initNavigation() {
    // Start button
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            goToScreen(2);
            tryPlayMusic();
        });
    }

    // Nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetScreen = parseInt(e.currentTarget.dataset.screen);
            goToScreen(targetScreen);
        });
    });

    // Nav dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const targetScreen = parseInt(e.currentTarget.dataset.screen);
            goToScreen(targetScreen);
        });
    });

    // Swipe detection
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentScreen < 5) {
                // Swipe left - next screen
                goToScreen(currentScreen + 1);
            } else if (diff < 0 && currentScreen > 1) {
                // Swipe right - prev screen
                goToScreen(currentScreen - 1);
            }
        }
    }
}

function goToScreen(screenNumber) {
    if (screenNumber < 1 || screenNumber > 4) return;

    // Hide current screen
    screens.forEach(screen => screen.classList.remove('active'));

    // Show target screen
    const targetScreen = document.getElementById(`screen${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenNumber;

        // Update nav dots
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.screen) === screenNumber) {
                dot.classList.add('active');
            }
        });

        // Screen-specific actions
        if (screenNumber === 2) {
            animateStats();
        } else if (screenNumber === 3) {
            animateTimeline();
        }
    }
}

// ===== STATS ANIMATION =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number:not(.infinite)');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Format number
            if (target >= 1000) {
                stat.textContent = (Math.floor(current / 100) / 10).toFixed(1) + 'K';
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

function animateTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

// ===== COUNTDOWN TIMER =====
function initCountdown() {
    // PRODUCTION: Countdown to New Year 2026
    const targetDate = new Date('2026-01-01T00:00:00+07:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Countdown finished! Show notification popup
            clearInterval(countdownInterval);

            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';

            // Show notification popup instead of redirecting
            const popup = document.getElementById('notificationPopup');
            if (popup) {
                popup.classList.add('active');
                console.log('🎉 Showing notification popup...');
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// ===== MUSIC PLAYER =====
function initMusicPlayer() {
    if (!musicControl || !bgMusic) return;

    musicControl.addEventListener('click', toggleMusic);
}

function toggleMusic() {
    if (!bgMusic) return;

    if (musicPlaying) {
        bgMusic.pause();
        musicControl.classList.remove('playing');
    } else {
        bgMusic.play().catch(err => console.log('Music play failed:', err));
        musicControl.classList.add('playing');
    }
    musicPlaying = !musicPlaying;
}

function tryPlayMusic() {
    if (!bgMusic || musicPlaying) return;

    bgMusic.play()
        .then(() => {
            musicPlaying = true;
            musicControl.classList.add('playing');
        })
        .catch(err => {
            console.log('Auto-play prevented. User needs to interact first.');
        });
}

// ===== FIREWORKS REMOVED =====
// Old fireworks system replaced by epic finale fireworks
// See epic-finale.js for new fireworks implementation

function initFireworks() {
    if (!canvas || !ctx) return;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Fireworks array
    const fireworks = [];
    const particles = [];

    // Firework class
    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = canvas.height;
            this.targetY = y;
            this.speed = 5;
            this.radius = 3;
            this.color = getRandomColor();
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
            const particleCount = 50;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
    }

    // Particle class
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 2 + 1;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.gravity = 0.15;
            this.friction = 0.98;
            this.opacity = 1;
            this.fade = Math.random() * 0.02 + 0.015;
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
            '#FFD93D', '#FF6FB5', '#B983FF'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    // Launch firework on tap/click
    canvas.addEventListener('click', (e) => {
        if (!fireworksActive) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        fireworks.push(new Firework(x, y));
    });

    canvas.addEventListener('touchstart', (e) => {
        if (!fireworksActive) return;

        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        fireworks.push(new Firework(x, y));
    });

    // Auto-launch fireworks
    window.launchFireworksAuto = function () {
        setInterval(() => {
            if (fireworksActive) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height * 0.5;
                fireworks.push(new Firework(x, y));
            }
        }, 800);
    };
}

// ===== ANIMATED BACKGROUNDS =====
function createHearts() {
    const containers = document.querySelectorAll('.hearts-background');

    containers.forEach(container => {
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.opacity = Math.random() * 0.3 + 0.1;
            heart.style.animation = `float ${Math.random() * 3 + 3}s ease-in-out infinite`;
            heart.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(heart);
        }
    });
}

function createStars() {
    // Stars are created via CSS pseudo-elements
    // This function can be extended for dynamic stars if needed
}

// ===== UTILITY FUNCTIONS =====
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ===== PREVENT CONTEXT MENU ON LONG PRESS (MOBILE) =====
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}, { passive: false });

// ===== PREVENT PULL-TO-REFRESH =====
document.body.addEventListener('touchmove', (e) => {
    if (e.target === document.body) {
        e.preventDefault();
    }
}, { passive: false });

// ===== MODAL SYSTEM =====
let currentGalleryIndex = 0;
let currentMomentData = null;

// Seasonal moment data - automatically loads 10 images from each season folder
const momentsData = {
    xuan: {
        emoji: '🌸',
        title: 'Mùa Xuân - Spring',
        date: 'Tháng 1 - 3, 2025',
        story: 'Mùa xuân mang đến sự khởi đầu tươi mới cho tình yêu của chúng mình. Những ngày đầu năm, mọi thứ đều tràn đầy hy vọng và hạnh phúc. Cùng nhau đi chơi xuân, ngắm hoa nở, ăn tết, và tạo nên vô vàn kỷ niệm đẹp. Mỗi khoảnh khắc đều quý giá, mỗi nụ cười đều ngọt ngào như hương hoa xuân.',
        location: 'Khắp nơi trong những ngày xuân',
        folder: 'xuan',
        imageCount: 10
    },
    ha: {
        emoji: '☀️',
        title: 'Mùa Hạ - Summer',
        date: 'Tháng 4 - 6, 2025',
        story: 'Mùa hè rực rỡ với ánh nắng chói chang và tình yêu nồng nhiệt. Những chuyến đi biển, những buổi chiều dài dưới nắng, những ly trà đá mát lạnh bên nhau. Dù trời nóng bức nhưng trái tim anh lúc nào cũng mát mẻ khi có em bên cạnh. Kỷ niệm mùa hè của chúng mình mãi mãi rực rỡ như ánh mặt trời.',
        location: 'Dưới ánh nắng mùa hè',
        folder: 'ha',
        imageCount: 10
    },
    thu: {
        emoji: '🍂',
        title: 'Mùa Thu - Fall',
        date: 'Tháng 7 - 9, 2025',
        story: 'Mùa thu lãng mạn nhất trong năm. Lá vàng rơi, gió se se lạnh, và tình yêu của chúng mình càng thêm sâu đậm. Những buổi tản bộ dưới hàng cây lá vàng, những tách cà phê ấm áp, những câu chuyện tâm tình dài. Mùa thu không chỉ đẹp ở thiên nhiên mà còn đẹp ở những khoảnh khắc bình yên bên em.',
        location: 'Trong những ngày thu lãng mạn',
        folder: 'thu',
        imageCount: 10
    },
    dong: {
        emoji: '❄️',
        title: 'Mùa Đông - Winter',
        date: 'Tháng 10 - 12, 2025',
        story: 'Mùa đông lạnh lẽo nhưng trái tim anh luôn ấm áp nhờ có em. Những ngày cuối năm, chúng mình cùng nhau nhìn lại hành trình đã qua, cùng nhau lên kế hoạch cho tương lai. Giáng sinh, năm mới, và vô vàn kỷ niệm đẹp đẽ. Cảm ơn em đã đồng hành cùng anh qua cả bốn mùa này. Yêu em!',
        location: 'Bên nhau những ngày cuối năm',
        folder: 'dong',
        imageCount: 10
    }
};

// Generate image paths for each season
function getSeasonImages(folder, count) {
    const images = [];
    for (let i = 1; i <= count; i++) {
        images.push(`images/${folder}/${i}.jpg`);
    }
    return images;
}

function initModal() {
    const modal = document.getElementById('momentModal');
    const modalClose = document.getElementById('modalClose');
    const timelineItems = document.querySelectorAll('.timeline-item[data-moment]');

    // Click timeline items to open modal
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const momentId = item.dataset.moment;
            openModal(momentId);
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Gallery navigation
    document.getElementById('galleryPrev').addEventListener('click', () => {
        navigateGallery(-1);
    });

    document.getElementById('galleryNext').addEventListener('click', () => {
        navigateGallery(1);
    });
}

function openModal(momentId) {
    const modal = document.getElementById('momentModal');
    const data = momentsData[momentId];

    if (!data) return;

    // Generate images array dynamically from folder
    const images = getSeasonImages(data.folder, data.imageCount);

    currentMomentData = {
        ...data,
        images: images
    };
    currentGalleryIndex = 0;

    // Update modal content
    document.getElementById('modalEmoji').textContent = data.emoji;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDate').textContent = data.date;
    document.getElementById('modalStory').textContent = data.story;
    document.getElementById('modalLocation').textContent = data.location;

    // Setup gallery
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryDots = document.getElementById('galleryDots');

    // Clear previous gallery
    galleryContainer.innerHTML = '';
    galleryDots.innerHTML = '';

    // Add images
    images.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        if (index === 0) slide.classList.add('active');

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = data.title;

        slide.appendChild(img);
        galleryContainer.appendChild(slide);

        // Add dot if more than 1 image
        if (images.length > 1) {
            const dot = document.createElement('div');
            dot.className = 'gallery-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            galleryDots.appendChild(dot);
        }
    });

    // Update nav buttons
    updateGalleryNav();

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeModal() {
    const modal = document.getElementById('momentModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
    currentMomentData = null;
}

function navigateGallery(direction) {
    if (!currentMomentData) return;

    const totalImages = currentMomentData.images.length;
    currentGalleryIndex += direction;

    if (currentGalleryIndex < 0) currentGalleryIndex = 0;
    if (currentGalleryIndex >= totalImages) currentGalleryIndex = totalImages - 1;

    goToSlide(currentGalleryIndex);
}

function goToSlide(index) {
    if (!currentMomentData) return;

    currentGalleryIndex = index;

    // Update slides
    const slides = document.querySelectorAll('.gallery-slide');
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    // Update dots
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    updateGalleryNav();
}

function updateGalleryNav() {
    if (!currentMomentData) return;

    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const totalImages = currentMomentData.images.length;

    if (totalImages <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        prevBtn.disabled = currentGalleryIndex === 0;
        nextBtn.disabled = currentGalleryIndex === totalImages - 1;
    }
}

// ===== NOTIFICATION BUTTON - Show Epic Finale =====
const viewMessageBtn = document.getElementById('viewMessageBtn');
if (viewMessageBtn) {
    viewMessageBtn.addEventListener('click', () => {
        console.log('📍 "Xem ngay" clicked - showing epic finale...');

        // Hide notification
        const popup = document.getElementById('notificationPopup');
        if (popup) popup.classList.remove('active');

        // Show epic finale using CSS class
        const epicFinale = document.getElementById('epicFinale');
        if (epicFinale) {
            epicFinale.classList.add('active');

            // Initialize firework simulator after transition
            setTimeout(() => {
                initFireworkSimulator();
            }, 100);
        }
    });
}

console.log('💕 Love Recap 2025 Loaded! 💕');
