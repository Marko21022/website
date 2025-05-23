function isMobileDevice() {
    return (window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
}

const overlay = document.querySelector('.start-overlay');
const video = document.getElementById('background-video');
const fallbackImg = document.getElementById('background-fallback');
const audio = document.getElementById('background-audio');
const cardContainer = document.querySelector('.card-container');
const tiltContainer = document.querySelector('.tilt-container');
const profileGroup = document.querySelector('.profile-group');
const innerCard = document.querySelector('.inner-card');
const innerCardBottom = document.querySelector('.inner-card-bottom');
const musicPlayerCard = document.querySelector('.music-player-card');
const muteButton = document.getElementById('mute-button');
const themeToggleButton = document.getElementById('theme-toggle-button');
let isMuted = false;
let isLightMode = false;
let timeouts = [];

function toggleMute() {
    isMuted = !isMuted;
    audio.muted = isMuted;
    muteButton.classList.toggle('muted');
    muteButton.innerHTML = `<i class="fas fa-volume-${isMuted ? 'mute' : 'up'}"></i><span class="visually-hidden">Toggle Audio</span>`;
}

function toggleTheme() {
    isLightMode = !isLightMode;
    const card = document.querySelector('.card');
    const innerCard = document.querySelector('.inner-card');
    const innerCardBottom = document.querySelector('.inner-card-bottom');
    const musicPlayerCard = document.querySelector('.music-player-card');
    
    // Toggle light mode classes
    card.classList.toggle('light-mode', isLightMode);
    innerCard.classList.toggle('light-mode', isLightMode);
    innerCardBottom.classList.toggle('light-mode', isLightMode);
    musicPlayerCard.classList.toggle('light-mode', isLightMode);
    
    // Update button icon and style
    themeToggleButton.classList.toggle('light', isLightMode);
    themeToggleButton.innerHTML = `<i class="fas fa-${isLightMode ? 'sun' : 'moon'}"></i><span class="visually-hidden">Toggle Theme</span>`;
}

function typeWriteDescription() {
    const description = document.querySelector('.description');
    const text = "14yr old developer.";
    let i = 0;
    let isDeleting = false;

    // Ensure the description element is empty initially
    description.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    description.appendChild(cursor);

    function type() {
        if (!isDeleting) {
            // Typing phase
            if (i < text.length) {
                // Update text and re-append cursor
                description.innerHTML = text.substring(0, i + 1);
                description.appendChild(cursor);
                description.classList.remove('blinking');
                i++;
                setTimeout(type, 100);
            } else {
                description.classList.add('blinking');
                setTimeout(() => {
                    description.classList.remove('blinking');
                    isDeleting = true;
                    type();
                }, 5000);
            }
        } else {
            if (i >= 0) {
                description.innerHTML = text.substring(0, i);
                description.appendChild(cursor);
                description.classList.remove('blinking');
                i--;
                setTimeout(type, 50);
            } else {
                isDeleting = false;
                i = 0;
                setTimeout(type, 500);
            }
        }
    }

    type();
}

function initializeTilt() {
    if (typeof VanillaTilt !== 'undefined' && !isMobileDevice()) {
        VanillaTilt.init(tiltContainer, {
            max: 10,
            speed: 800,
            glare: false,
            "max-glare": 0,
            scale: 1.05
        });
    }
}

function startExperience() {
    timeouts.forEach(clearTimeout);
    timeouts = [];

    overlay.classList.add('hidden');
    video.classList.add('visible');
    audio.classList.add('visible');
    muteButton.classList.add('visible');
    themeToggleButton.classList.add('visible');

    // Sequence the animations with slight overlap
    requestAnimationFrame(() => {
        cardContainer.classList.add('visible');
        
        setTimeout(() => {
            profileGroup.classList.add('visible');
            innerCard.classList.add('visible');
            
            typeWriteDescription();
            
            setTimeout(() => {
                innerCardBottom.classList.add('visible');
                
                setTimeout(() => {
                    if (musicPlayerCard) {
                        musicPlayerCard.classList.add('visible');
                    }
                }, 150);
            }, 150);
        }, 300);
    });

    video.muted = true;
    const playPromise = video.play();


    audio.muted = false;
    audio.play().catch(error => {
        console.log("Background audio autoplay prevented:", error);
        document.body.addEventListener('touchstart', () => {
            audio.play().catch(e => console.log("Background audio play failed:", e));
        }, { once: true });
    });

    initializeTilt();
    
    overlay.addEventListener('transitionend', () => {
        overlay.style.display = 'none';
    }, { once: true });
}

function startTerminalSequence() {
    const terminalOutput = document.querySelector('.terminal-output');
    const terminalLines = document.querySelectorAll('.terminal-line');
    const memorySquaresContainer = document.querySelector('.memory-squares');
    const systemReady = document.querySelector('.system-ready');
    
    // Create 40 memory squares (to match the screenshot)
    for (let i = 0; i < 40; i++) {
        const square = document.createElement('div');
        square.className = 'memory-square';
        memorySquaresContainer.appendChild(square);
    }
    const memorySquares = document.querySelectorAll('.memory-square');

    // Fade in the terminal output
    terminalOutput.style.opacity = '1';

    // Display each line every second
    let lineIndex = 0;
    const showNextLine = () => {
        if (lineIndex < terminalLines.length) {
            const line = terminalLines[lineIndex];
            line.classList.add('visible');
            
            // If this is the memory diagnostic line, animate the squares
            if (line.classList.contains('memory-diagnostic')) {
                let squareIndex = 0;
                const showNextSquare = () => {
                    if (squareIndex < memorySquares.length) {
                        memorySquares[squareIndex].classList.add('visible');
                        squareIndex++;
                        setTimeout(showNextSquare, 10); // 50ms per square for quick animation
                    }
                };
                showNextSquare();
            }
            
            lineIndex++;
            setTimeout(showNextLine, 400); // 1 second per line
        } else {
            // After all lines are shown, wait 3 seconds, then fade out
            setTimeout(() => {
                terminalOutput.style.opacity = '0';
                // Fade in "System ready" after terminal output starts fading
                setTimeout(() => {
                    systemReady.classList.add('visible');
                }, 500);
            }, 1000);
        }
    };
    
    showNextLine();
}

overlay.addEventListener('click', startExperience);
muteButton.addEventListener('click', toggleMute);
themeToggleButton.addEventListener('click', toggleTheme);
startTerminalSequence();

window.addEventListener('unload', () => {
    timeouts.forEach(clearTimeout);
});

const originalTitle = document.title;
const basePrefix = "@";
const animatedPart = originalTitle.slice(1);
let titleTimeouts = [];

function animateTitle() {
    let currentAnimatedPart = animatedPart;
    
    function removeLetters() {
        if (currentAnimatedPart.length > 0) {
            currentAnimatedPart = currentAnimatedPart.slice(0, -1);
            document.title = basePrefix + currentAnimatedPart;
            titleTimeouts.push(setTimeout(removeLetters, 700));
        } else {
            titleTimeouts.push(setTimeout(addLetters, 1000));
        }
    }

    function addLetters() {
        let i = 0;
        function addNextLetter() {
            if (i < animatedPart.length) {
                currentAnimatedPart = animatedPart.slice(0, i + 1);
                document.title = basePrefix + currentAnimatedPart;
                i++;
                titleTimeouts.push(setTimeout(addNextLetter, 700));
            } else {
                titleTimeouts.push(setTimeout(animateTitle, 1000));
            }
        }
        addNextLetter();
    }

    removeLetters();
}

animateTitle();

window.addEventListener('unload', () => {
    titleTimeouts.forEach(clearTimeout);
});

function initializeMusicPlayer() {
    const playPauseButton = document.querySelector('.play-pause-button');
    const playPauseIcon = playPauseButton ? playPauseButton.querySelector('i') : null;
    const rewindButton = document.querySelector('.rewind-button');
    const forwardButton = document.querySelector('.forward-button');
    const progressFilled = document.querySelector('.progress-filled');
    const currentTimeDisplay = document.querySelector('.current-time');
    const totalTimeDisplay = document.querySelector('.total-time');
    let isPlaying = true;

    if (!playPauseButton || !playPauseIcon || !rewindButton || !forwardButton || !progressFilled || !currentTimeDisplay || !totalTimeDisplay || !audio) {
        console.error("Music player elements not found in the DOM.");
        return;
    }

    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    audio.addEventListener('loadedmetadata', () => {
        const totalDuration = audio.duration;
        totalTimeDisplay.textContent = formatTime(totalDuration);
    });

    audio.addEventListener('timeupdate', () => {
        if (!audio.paused) {
            const currentTime = audio.currentTime;
            const totalDuration = audio.duration || 137;
            const progressPercent = (currentTime / totalDuration) * 100;
            progressFilled.style.width = `${progressPercent}%`;
            currentTimeDisplay.textContent = formatTime(currentTime);
        }
    });

    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        isPlaying = false;
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
        progressFilled.style.width = '0%';
        currentTimeDisplay.textContent = '0:00';
    });

    playPauseButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            audio.muted = false;
            audio.play().catch(error => {
                console.log("Background audio play failed:", error);
                document.body.addEventListener('touchstart', () => {
                    audio.play().catch(e => console.log("Background audio play failed:", e));
                }, { once: true });
            });
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
        } else {
            audio.pause();
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        }
    });

    rewindButton.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressFilled.style.width = `${progressPercent}%`;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    forwardButton.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressFilled.style.width = `${progressPercent}%`;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });
}

document.addEventListener('DOMContentLoaded', initializeMusicPlayer);