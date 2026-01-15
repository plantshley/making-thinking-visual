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
                value: isDark ? ["#ffffff", "#a855f7", "#ff6bbcff", "#06b6d4"] : ["#f0bb58ff", "#ae5cffff", "rgba(255, 111, 229, 1)", "rgba(49, 236, 195, 1)"]
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

            // Track theme change
            if (typeof trackThemeChange !== 'undefined') {
                trackThemeChange(newTheme, currentTheme);
            }

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

                // Track font toggle OFF
                if (typeof trackFontToggle !== 'undefined') trackFontToggle(false);
            } else {
                html.setAttribute('data-accessible-fonts', 'true');
                fontToggle.classList.add('active');
                localStorage.setItem('github-roadmap-accessible-fonts', 'true');

                // Track font toggle ON
                if (typeof trackFontToggle !== 'undefined') trackFontToggle(true);
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

        // Track node clicks (DESKTOP)
        node.addEventListener('click', () => {
            const nodeName = node.querySelector('.node-label')?.textContent?.trim();
            if (nodeName && typeof trackNodeClick !== 'undefined') {
                trackNodeClick(nodeName, 'desktop');
            }
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

// ========================================
// DYNAMIC SVG LINE DRAWING
// ========================================

function initLineAnimations() {
    const svg = document.querySelector('.roadmap-svg');

    // Return early if no SVG exists (e.g., on detail pages)
    if (!svg) return;

    // Clear existing lines if any (except defs)
    const existingPath = svg.querySelectorAll('path');
    existingPath.forEach(p => p.remove());

    const connections = [
        // --- LEFT (Desktop/Profile Wedge) ---
        { from: 'node-desktop', to: 'node-profile' },      // Vertical connection
        { from: 'node-definitions', to: 'node-ide-setup' }, // Horizontal Spine

        // --- CENTER (IDE & VS Code) ---
        { from: 'node-ide-setup', to: 'node-explore-top' },
        { from: 'node-ide-setup', to: 'node-vscode' },
        { from: 'node-ide-setup', to: 'node-create-repo' }, // Horizontal Spine

        // --- RIGHT (Remote/Local Diamond) ---
        { from: 'node-create-repo', to: 'node-remote' },      // Diamond Left-Top
        { from: 'node-remote', to: 'node-templates' },        // Diamond Top-Right
        { from: 'node-create-repo', to: 'node-local' },       // Diamond Left-Bottom
        { from: 'node-local', to: 'node-templates' },         // Diamond Bottom-Right

        { from: 'node-create-repo', to: 'node-update-repo' }, // Horizontal Spine
        { from: 'node-update-repo', to: 'node-templates' },   // Horizontal Spine

        // --- END ---
        { from: 'node-templates', to: 'node-explore-right' }
    ];

    connections.forEach(conn => drawConnection(conn.from, conn.to, svg));

    // Redraw on resize and load
    const redraw = () => {
        clearTimeout(window.resizeLineTimeout);
        window.resizeLineTimeout = setTimeout(() => {
            const existingPath = svg.querySelectorAll('path');
            existingPath.forEach(p => p.remove());
            connections.forEach(conn => drawConnection(conn.from, conn.to, svg));
        }, 100);
    };

    window.addEventListener('resize', redraw);
    window.addEventListener('load', redraw);
    // Force one now just in case
    redraw();
}

function drawConnection(fromId, toId, svg) {
    const fromNode = document.getElementById(fromId);
    const toNode = document.getElementById(toId);

    if (!fromNode || !toNode) return;

    // --- COORDINATE MAPPING (Simple Stretch) ---
    // With preserveAspectRatio="none", the SVG stretches to fill the container.
    // We just map percentage of width/height.
    // --- COORDINATE MAPPING (Visual Center Based) ---
    // We map the actual visual center of the node to the SVG coordinate system.
    // This ensures lines connect to where the nodes ARE, not where CSS thinks they should be.

    const svgRect = svg.getBoundingClientRect();
    const viewBox = { w: 1200, h: 600 };

    // Calculate simple scale factors since preserveAspectRatio="none"
    const scaleX = viewBox.w / svgRect.width;
    const scaleY = viewBox.h / svgRect.height;

    function getVisualCenter(elem) {
        const rect = elem.getBoundingClientRect();
        // Calculate Visual Center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Map to SVG ViewBox
        // 1. Shift by SVG position (relative to viewport)
        // 2. Scale to ViewBox units
        return {
            x: (centerX - svgRect.left) * scaleX,
            y: (centerY - svgRect.top) * scaleY
        };
    }

    const startPt = getVisualCenter(fromNode);
    const endPt = getVisualCenter(toNode);

    // --- RADIUS CALCULATION (Shape Aware) ---
    function getNodeRadius(node) {
        // Check for specific shapes
        const content = node.querySelector('.node-content');
        let radius = 50; // default fallout

        if (content) {
            if (content.classList.contains('node-circle-large')) {
                radius = 55; // 110px width
            } else if (content.classList.contains('node-circle') || content.classList.contains('node-circle-dashed')) {
                radius = 47.5; // 95px width
            } else if (node.classList.contains('node-diamond') || content.classList.contains('node-diamond')) {
                // Diamond radius logic (reach to corner is longer)
                radius = 60;
            } else if (content.classList.contains('node-square')) {
                radius = 50; // 100px width
            }
        }
        return radius;
    }

    const angle = Math.atan2(endPt.y - startPt.y, endPt.x - startPt.x);

    const r1 = getNodeRadius(fromNode);
    const r2 = getNodeRadius(toNode);

    const gap = 4; // Gap in SVG units

    const x1 = startPt.x + Math.cos(angle) * (r1 + gap);
    const y1 = startPt.y + Math.sin(angle) * (r1 + gap);
    const x2 = endPt.x - Math.cos(angle) * (r2 + gap);
    const y2 = endPt.y - Math.sin(angle) * (r2 + gap);

    // --- DRAWING ---
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "connection-line");

    path.style.stroke = "var(--accent-cyan)";
    path.style.strokeWidth = "2";

    path.setAttribute("d", `M ${x1} ${y1} L ${x2} ${y2}`);

    svg.appendChild(path);
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

    console.log('Tab containers found:', tabContainers.length);

    tabContainers.forEach((container, index) => {
        const buttons = container.querySelectorAll('.tab-btn');
        const contents = container.querySelectorAll('.tab-content');

        console.log(`Container ${index}: ${buttons.length} buttons, ${contents.length} contents`);

        buttons.forEach((button, btnIndex) => {
            console.log(`Adding listener to button ${btnIndex}`);

            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const targetId = this.getAttribute('data-tab');
                console.log('Button clicked! Target:', targetId);

                if (!targetId) {
                    console.error('No data-tab attribute found');
                    return;
                }

                // Remove active from all buttons in this container
                container.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Remove active from all contents in this container
                container.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });

                // Add active to clicked button
                this.classList.add('active');

                // Track tab click
                const tabName = this.textContent.trim();
                const tabGroup = this.closest('.content-section')?.id ||
                                 this.closest('section')?.id || 'unknown';
                if (typeof trackTabClick !== 'undefined') {
                    trackTabClick(tabGroup, tabName);
                }

                // Find and activate target content
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    console.log('Activated content:', targetId);
                } else {
                    console.error('Target content not found:', targetId);
                }
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
        anchor.addEventListener('click', function (e) {
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
            item.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.95)';
            });

            item.addEventListener('touchend', function () {
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
// ANALYTICS TRACKING
// ========================================

function initMobileNavTracking() {
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const nodeName = item.textContent.trim();
            if (typeof trackNodeClick !== 'undefined') {
                trackNodeClick(nodeName, 'mobile');
            }
        });
    });
}

function initExternalLinkTracking() {
    const externalLinks = document.querySelectorAll('a[target="_blank"][rel*="noopener"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', () => {
            const url = link.href;
            const label = link.textContent.trim();

            // Determine platform
            let platform = 'external';
            if (url.includes('github.com')) platform = 'github';
            else if (url.includes('code.visualstudio.com')) platform = 'vscode';
            else if (url.includes('desktop.github.com')) platform = 'github-desktop';
            else if (url.includes('anthropic.com')) platform = 'anthropic';

            if (typeof trackExternalLink !== 'undefined') {
                trackExternalLink(platform, url, label);
            }
        });
    });
}

function initBackToMapTracking() {
    const backLinks = document.querySelectorAll('.back-link');
    backLinks.forEach(backLink => {
        backLink.addEventListener('click', () => {
            const currentPage = document.querySelector('.page-title')?.textContent || 'Unknown Page';
            if (typeof trackBackToMap !== 'undefined') {
                trackBackToMap(currentPage);
            }
        });
    });
}

// ========================================
// INITIALIZE ALL
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Track page view
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
    if (isIndexPage) {
        if (typeof trackPageView !== 'undefined') trackPageView('GitHub Setup Starmap Hub');
    } else {
        const pageTitle = document.querySelector('.page-title')?.textContent || document.title;
        if (typeof trackPageView !== 'undefined') trackPageView(pageTitle);
    }

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

    // Analytics tracking
    initMobileNavTracking();
    initExternalLinkTracking();
    initBackToMapTracking();

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
