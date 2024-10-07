// Main entry point of the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadPreviousSearches();
    setupEventListeners();
}
