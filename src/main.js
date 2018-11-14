'use strict';

let isPanelCreated = false;

console.log("Hello from the main.js! (global)");

// Check if Mezzurite has loaded every second
const intervalMs = 1000;
const mezzuriteLoadCheckInterval = setInterval(
    createPanelIfMezzuriteLoaded, 
    intervalMs);

////////////////////////////////

function createPanelIfMezzuriteLoaded() {
    if (isPanelCreated) {
        return;
    }

    clearInterval(mezzuriteLoadCheckInterval);
    isPanelCreated = true;
    
    const title = "Mezzurite DevTools";
    const iconPath = null;
    const pagePath = "panel.html";
    chrome.devtools.panels.create(title, iconPath, pagePath, function(panel) {
        console.log("Hello from the panel creation callback in main.js!");
        
        console.log(window.mezzurite);
    });
}
