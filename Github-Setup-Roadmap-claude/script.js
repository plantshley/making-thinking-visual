/* ========================================
   COSMIC GITHUB ROADMAP - JAVASCRIPT
   Interactive features and particle effects
   ======================================== */

// ========================================
// PARTICLE BACKGROUND (tsParticles)
// ========================================

async function initParticles() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    await tsParticles.load("tsparticles", {
        fullScreen: {
            enable: false
        },
        background: {
            color: {
                value: "transparent"
            }
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push"
                },
                onHover: {
                    enable: true,
                    mode: "grab"
                },
                resize: true
            },
            modes: {
                push: {
                    quantity: 4
                },
                grab: {
                    distance: 140,
                    links: {
                        opacity: 0.5
                    }
                }
            }
        },
        particles: {
            color: {
                value: isDark ? ["#ffffff", "#a855f7", "#ff6b9d", "#06b6d4"] : ["#667eea", "#764ba2", "#ff6b9d", "#06b6d4"]
            },
            links: {
                color: isDark ? "#a855f7" : "#764ba2",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce"
                },
                random: true,
                speed: 0.8,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 80
            },
            opacity: {
                value: { min: 0.1, max: 0.8 },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1
                }
            },
            shape: {
                type: ["circle", "star"]
            },
            size: {
                value: { min: 1, max: 4 },
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.5
                }
            }
        },
        detectRetina: true
    });
}

// ========================================
// THEME TOGGLE (Moonlight/Sunshine)
// ========================================

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('github-roadmap-theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('github-roadmap-theme', newTheme);

            // Reinitialize particles with new colors
            initParticles();

            // Add a fun transition effect
            createThemeTransitionEffect();
        });
    }
}

function createThemeTransitionEffect() {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, var(--accent-purple), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: themeWave 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 9999;
    `;

    document.body.appendChild(effect);

    setTimeout(() => {
        effect.remove();
    }, 600);
}

// Add the animation styles dynamically
const themeWaveStyle = document.createElement('style');
themeWaveStyle.textContent = `
    @keyframes themeWave {
        0% {
            width: 10px;
            height: 10px;
            opacity: 1;
        }
        100% {
            width: 300vmax;
            height: 300vmax;
            opacity: 0;
        }
    }
`;
document.head.appendChild(themeWaveStyle);

// ========================================
// ACCESSIBLE FONTS TOGGLE
// ========================================

function initFontToggle() {
    const fontToggle = document.getElementById('font-toggle');
    const html = document.documentElement;

    // Check for saved font preference
    const savedFonts = localStorage.getItem('github-roadmap-accessible-fonts');
    if (savedFonts === 'true') {
        html.setAttribute('data-accessible-fonts', 'true');
        fontToggle?.classList.add('active');
    }

    if (fontToggle) {
        fontToggle.addEventListener('click', () => {
            const isAccessible = html.getAttribute('data-accessible-fonts') === 'true';

            if (isAccessible) {
                html.removeAttribute('data-accessible-fonts');
                fontToggle.classList.remove('active');
                localStorage.setItem('github-roadmap-accessible-fonts', 'false');
            } else {
                html.setAttribute('data-accessible-fonts', 'true');
                fontToggle.classList.add('active');
                localStorage.setItem('github-roadmap-accessible-fonts', 'true');
            }
        });
    }
}

// ========================================
// ROADMAP NODE ANIMATIONS
// ========================================

function initNodeAnimations() {
    const nodes = document.querySelectorAll('.node');

    nodes.forEach((node, index) => {
        // Staggered entrance animation
        node.style.opacity = '0';
        node.style.transform = 'scale(0.8)';

        setTimeout(() => {
            node.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        }, 100 + (index * 100));

        // Add sparkle effect on hover
        node.addEventListener('mouseenter', () => {
            createSparkles(node);
        });
    });
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 5;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-effect';
        sparkle.innerHTML = ['✨', '⭐', '💫', '✦', '★'][Math.floor(Math.random() * 5)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            font-size: ${10 + Math.random() * 10}px;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleFloat 1s ease-out forwards;
        `;

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px) scale(0.5);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ========================================
// SVG LINE ANIMATIONS
// ========================================

function initLineAnimations() {
    const lines = document.querySelectorAll('.connection-line');

    lines.forEach((line, index) => {
        const length = line.getTotalLength ? line.getTotalLength() : 1000;
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;

        setTimeout(() => {
            line.style.transition = 'stroke-dashoffset 1.5s ease-out';
            line.style.strokeDashoffset = '0';
        }, 500 + (index * 200));
    });
}

// ========================================
// COLLAPSIBLE SECTIONS
// ========================================

function initCollapsibles() {
    const collapsibles = document.querySelectorAll('.collapsible-header');

    collapsibles.forEach(header => {
        header.addEventListener('click', () => {
            const parent = header.parentElement;
            parent.classList.toggle('open');
        });
    });
}

// ========================================
// TAB NAVIGATION
// ========================================

function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs');

    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-btn');
        const contents = container.querySelectorAll('.tab-content');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-tab');

                // Remove active class from all
                buttons.forEach(btn => btn.classList.remove('active'));
                contents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked
                button.classList.add('active');
                container.querySelector(`#${target}`)?.classList.add('active');
            });
        });
    });
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================

function initScrollProgress() {
    const progressBar = document.querySelector('.progress-fill');

    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-top');

    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.content-section, .step-card, .definition-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ========================================
// SMOOTH ANCHOR SCROLLING
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Toggle theme with 'T' key
        if (e.key === 't' || e.key === 'T') {
            if (!e.target.matches('input, textarea')) {
                document.getElementById('theme-toggle')?.click();
            }
        }

        // Toggle fonts with 'F' key
        if (e.key === 'f' || e.key === 'F') {
            if (!e.target.matches('input, textarea')) {
                document.getElementById('font-toggle')?.click();
            }
        }
    });
}

// ========================================
// EASTER EGG: KONAMI CODE
// ========================================

function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateRainbowMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateRainbowMode() {
    document.body.style.animation = 'rainbow 2s linear infinite';

    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    // Show a fun message
    const message = document.createElement('div');
    message.innerHTML = '🎉 You found the secret! 🚀';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--gradient-aurora);
        padding: 20px 40px;
        border-radius: 20px;
        font-family: var(--font-display);
        font-size: 1.5rem;
        color: white;
        z-index: 10000;
        animation: bounce 0.5s ease infinite alternate;
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        document.body.style.animation = '';
        message.remove();
        rainbowStyle.remove();
    }, 5000);
}

// ========================================
// TYPING EFFECT FOR HEADERS
// ========================================

function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid var(--accent-purple)';

        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 500);
            }
        }, 50);
    }
}

// ========================================
// MOBILE MENU TOUCH EFFECTS
// ========================================

function initTouchEffects() {
    if ('ontouchstart' in window) {
        document.querySelectorAll('.mobile-nav-item, .node').forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });

            item.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
}

// ========================================
// CURSOR TRAIL EFFECT (DESKTOP ONLY)
// ========================================

function initCursorTrail() {
    if (window.innerWidth > 1024 && !('ontouchstart' in window)) {
        const trail = [];
        const trailLength = 10;

        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: ${8 - i * 0.5}px;
                height: ${8 - i * 0.5}px;
                background: var(--accent-purple);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - i * 0.1};
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }

        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTrail() {
            let x = mouseX;
            let y = mouseY;

            trail.forEach((dot, index) => {
                const nextDot = trail[index + 1] || trail[0];

                dot.style.left = x + 'px';
                dot.style.top = y + 'px';

                x += (parseFloat(nextDot.style.left) - x) * 0.3;
                y += (parseFloat(nextDot.style.top) - y) * 0.3;
            });

            requestAnimationFrame(animateTrail);
        }

        animateTrail();
    }
}

// ========================================
// INITIALIZE ALL
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initParticles();
    initThemeToggle();
    initFontToggle();

    // Animations
    initNodeAnimations();
    initLineAnimations();
    initScrollAnimations();
    initTypingEffect();

    // Interactive elements
    initCollapsibles();
    initTabs();
    initSmoothScroll();

    // Navigation
    initScrollProgress();
    initScrollToTop();
    initKeyboardNav();

    // Fun extras
    initKonamiCode();
    initTouchEffects();
    // initCursorTrail(); // Uncomment for cursor trail effect

    console.log('🚀 GitHub Roadmap initialized! Press T for theme, F for fonts.');
    console.log('🎮 Try the Konami Code for a surprise!');
});

// Re-initialize particles on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initParticles();
    }, 250);
});
