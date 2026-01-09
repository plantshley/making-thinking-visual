/* ========================================
   GITHUB SETUP STARMAP - ANALYTICS
   Google Analytics 4 tracking utilities
   Measurement ID: G-E0WM5HF6FJ
   ======================================== */

// Check if gtag is available
function isGtagAvailable() {
    return typeof gtag !== 'undefined';
}

// ========================================
// PAGE VIEW TRACKING
// ========================================

/**
 * Track page views (auto-sent by GA4, but enhanced with page_name)
 * @param {string} pageName - Friendly name of the page
 */
function trackPageView(pageName) {
    if (!isGtagAvailable()) return;

    gtag('event', 'page_view', {
        page_name: pageName,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
}

// ========================================
// NODE CLICK TRACKING
// ========================================

/**
 * Track roadmap node clicks
 * @param {string} nodeName - Friendly name of the node
 * @param {string} navigationType - 'desktop' or 'mobile'
 */
function trackNodeClick(nodeName, navigationType) {
    if (!isGtagAvailable()) return;

    gtag('event', 'node_clicked', {
        node_name: nodeName,
        navigation_type: navigationType
    });
}

// ========================================
// THEME TOGGLE TRACKING
// ========================================

/**
 * Track theme changes
 * @param {string} newTheme - 'light' or 'dark'
 * @param {string} previousTheme - 'light' or 'dark'
 */
function trackThemeChange(newTheme, previousTheme) {
    if (!isGtagAvailable()) return;

    gtag('event', 'theme_changed', {
        theme_selected: newTheme,
        previous_theme: previousTheme
    });
}

// ========================================
// FONT ACCESSIBILITY TRACKING
// ========================================

/**
 * Track accessible fonts toggle
 * @param {boolean} enabled - true if accessible fonts are now ON
 */
function trackFontToggle(enabled) {
    if (!isGtagAvailable()) return;

    gtag('event', 'font_accessibility_toggled', {
        accessible_fonts_enabled: enabled
    });
}

// ========================================
// TAB NAVIGATION TRACKING
// ========================================

/**
 * Track tab clicks in multi-tab pages
 * @param {string} tabGroup - Which page the tabs are on (e.g., 'ide-setup', 'updating-repo')
 * @param {string} tabName - Name of the tab clicked
 */
function trackTabClick(tabGroup, tabName) {
    if (!isGtagAvailable()) return;

    gtag('event', 'tab_clicked', {
        tab_group: tabGroup,
        tab_name: tabName
    });
}

// ========================================
// EXTERNAL LINK TRACKING
// ========================================

/**
 * Track external link clicks
 * @param {string} linkPlatform - Platform identifier (e.g., 'github', 'vscode', 'anthropic')
 * @param {string} linkUrl - Full destination URL
 * @param {string} linkLabel - Descriptive label of the link
 */
function trackExternalLink(linkPlatform, linkUrl, linkLabel) {
    if (!isGtagAvailable()) return;

    gtag('event', 'external_link_clicked', {
        link_platform: linkPlatform,
        link_url: linkUrl,
        link_label: linkLabel
    });
}

// ========================================
// BACK TO MAP TRACKING
// ========================================

/**
 * Track "Back to Map" clicks
 * @param {string} currentPage - Name of the page the user is leaving
 */
function trackBackToMap(currentPage) {
    if (!isGtagAvailable()) return;

    gtag('event', 'back_to_map_clicked', {
        source_page: currentPage
    });
}
