/* theme.js */

const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const a11yToggle = document.getElementById('a11y-toggle');

// Check Local Storage
const savedTheme = localStorage.getItem('theme') || 'dark';
const savedA11y = localStorage.getItem('a11y') === 'true';

// Apply Initial State
html.setAttribute('data-theme', savedTheme);
html.setAttribute('data-a11y', savedA11y);
updateThemeIcon(savedTheme);

// Toggle Theme
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Toggle A11y
a11yToggle.addEventListener('click', () => {
    const isA11y = html.getAttribute('data-a11y') === 'true';
    const newState = !isA11y;

    html.setAttribute('data-a11y', newState);
    localStorage.setItem('a11y', newState);
});

function updateThemeIcon(theme) {
    const iconSpan = themeToggle.querySelector('.icon');
    if (theme === 'dark') {
        iconSpan.textContent = '🌙'; // Moon
        themeToggle.title = "Switch to Sunshine Mode";
    } else {
        iconSpan.textContent = '☀️'; // Sun
        themeToggle.title = "Switch to Moonlight Mode";
    }
}
