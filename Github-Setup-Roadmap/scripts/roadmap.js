/* roadmap.js */

const nodesLayer = document.getElementById('nodes-layer');
const linesSvg = document.getElementById('roadmap-lines');

function initRoadmap() {
    renderNodes();
    renderLines();
    window.addEventListener('resize', renderLines); // Redraw lines on resize if connection points shift
}

function renderNodes() {
    missions.forEach(mission => {
        const node = document.createElement('div');
        node.className = `map-node node-${mission.id}`;
        // Basic absolute positioning for the 'constellation' look
        node.style.left = `${mission.x}px`;
        node.style.top = `${mission.y}px`;
        node.dataset.id = mission.id;

        node.innerHTML = `
            <div class="node-icon">${mission.icon}</div>
            <div class="node-title">${mission.title}</div>
        `;

        node.addEventListener('click', () => {
            openContent(mission);
        });

        nodesLayer.appendChild(node);
    });
}

function renderLines() {
    // Clear existing lines
    linesSvg.innerHTML = '';

    // Connect nodes based on 'connections' array
    connections.forEach(conn => {
        const fromNode = document.querySelector(`.node-${conn.from}`);
        const toNode = document.querySelector(`.node-${conn.to}`);

        if (fromNode && toNode) {
            drawLine(fromNode, toNode);
        }
    });
}

function drawLine(startElem, endElem) {
    const startRect = startElem.getBoundingClientRect();
    const endRect = endElem.getBoundingClientRect();
    const containerRect = nodesLayer.getBoundingClientRect();

    // Calculate centers relative to the container
    const x1 = startRect.left + startRect.width / 2 - containerRect.left;
    const y1 = startRect.top + startRect.height / 2 - containerRect.top;
    const x2 = endRect.left + endRect.width / 2 - containerRect.left;
    const y2 = endRect.top + endRect.height / 2 - containerRect.top;

    // Create SVG path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'roadmap-line');

    // Smooth curve
    const deltaX = Math.abs(x2 - x1);
    const controlPointOffset = deltaX * 0.5;

    const d = `M ${x1} ${y1} C ${x1 + controlPointOffset} ${y1}, ${x2 - controlPointOffset} ${y2}, ${x2} ${y2}`;

    path.setAttribute('d', d);
    linesSvg.appendChild(path);
}
