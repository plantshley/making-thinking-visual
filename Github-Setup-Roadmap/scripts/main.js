/* main.js */

document.addEventListener('DOMContentLoaded', () => {
    initRoadmap();

    // Initial Theme check - Force apply to fix user reported bug
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

const appContainer = document.getElementById('app-container');
const roadmapSection = document.getElementById('roadmap-view');
const contentSection = document.getElementById('content-view');
const contentContainer = document.querySelector('.content-container');

// View Management
function openContent(mission) {
    // Generate full page content
    const wrapper = document.createElement('div');
    wrapper.className = 'content-wrapper';

    wrapper.innerHTML = `
        <div class="mission-nav">
             <button class="back-btn" onclick="closeContent()">
                ← Return to Galaxy
             </button>
             <div class="mission-progress">
                <span style="font-family: var(--font-title-sub); color: var(--accent-glow);">
                    ${mission.subTitle || "Mission In Progress"}
                </span>
             </div>
        </div>
        
        <h1 class="mission-title">${mission.title}</h1>
        <h2 class="mission-subtitle">${mission.description || "Complete the objectives below."}</h2>
        
        <div class="mission-body">
            ${mission.content}
        </div>

        <div style="text-align: center; margin-top: 4rem; margin-bottom: 2rem;">
            <button class="control-btn" style="width: auto; padding: 15px 40px; border-radius: 30px; font-family: var(--font-title-sub); font-size: 1.2rem;" onclick="completeMission('${mission.id}')">
                Mission Complete ✨
            </button>
        </div>
    `;

    // Clear previous and append new
    contentContainer.innerHTML = '';
    contentContainer.appendChild(wrapper);

    // Initialize interactive elements
    initInteractiveElements(wrapper);

    // Transition
    contentSection.classList.remove('hidden');
    contentSection.classList.add('active');

    // Optional: Zoom out map effect
    roadmapSection.style.transform = 'scale(1.5)';
    roadmapSection.style.opacity = '0';
    roadmapSection.style.pointerEvents = 'none';
}

function closeContent() {
    contentSection.classList.remove('active');
    contentSection.classList.add('hidden');

    // Reset map
    roadmapSection.style.transform = 'scale(1)';
    roadmapSection.style.opacity = '1';
    roadmapSection.style.pointerEvents = 'all';

    // Clean up after transition
    setTimeout(() => {
        contentContainer.innerHTML = '';
    }, 400);
}

// Interactive Elements Logic
function initInteractiveElements(container) {
    // Checkboxes
    const checkboxes = container.querySelectorAll('.checklist-checkbox');
    const missionTitle = container.querySelector('.mission-title').textContent;

    checkboxes.forEach((cb, index) => {
        const id = `check-${missionTitle}-${index}`;
        const saved = localStorage.getItem(id);

        if (saved === 'true') {
            cb.checked = true;
            cb.parentElement.classList.add('completed'); // Add class to parent too if needed
            cb.parentElement.querySelector('.item-text')?.classList.add('completed');
        }

        cb.addEventListener('change', () => {
            localStorage.setItem(id, cb.checked);
            const text = cb.parentElement.querySelector('.item-text');
            if (cb.checked) {
                text?.classList.add('completed');
            } else {
                text?.classList.remove('completed');
            }
        });
    });

    // Copy Buttons for Code Blocks
    // Scan for code blocks and add buttons if they don't exist (or simple text blocks marked as code)
    // Note: The content-data already has structure, we can enhance it here.
}

window.completeMission = (missionId) => {
    for (let i = 0; i < 80; i++) createConfetti();

    // Save progress visually on map
    localStorage.setItem(`mission-complete-${missionId}`, 'true');
    updateMapNodes(); // Refresh map state

    setTimeout(closeContent, 2000);
}

function updateMapNodes() {
    // Check local storage and color nodes
    const nodes = document.querySelectorAll('.map-node');
    nodes.forEach(node => {
        const id = node.dataset.id;
        if (localStorage.getItem(`mission-complete-${id}`) === 'true') {
            node.classList.add('mission-done');
            node.style.borderColor = "#00ff9d";
            node.style.boxShadow = "0 0 30px #00ff9d";
        }
    });
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = Math.random() * 2 + 1 + 's';

    // Ensure high z-index
    confetti.style.zIndex = '9999';

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
}

// Make globally available
window.openContent = openContent;
window.closeContent = closeContent;
