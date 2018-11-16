'use strict';

let isPanelCreated = false;

// Check if Mezzurite has loaded every second
const intervalMs = 1000;
const mezzuriteLoadCheckInterval = setInterval(
    createPanelIfMezzuriteLoaded, 
    intervalMs);

////////////////////////////////

function createPanel() {
    const title = "Mezzurite";
    const iconPath = null;
    const pagePath = "panel.html";
    chrome.devtools.panels.create(title, iconPath, pagePath, function(panel) {
        console.log("The Mezzurite panel in DevTools was created!");
    });
}

function getMezzuriteObject(callback) {
    const expression = `window.mezzurite`;
    chrome.devtools.inspectedWindow.eval(expression, callback);
}

function createPanelIfMezzuriteLoaded() {
    if (isPanelCreated) {
        return;
    }

    getMezzuriteObject((result, exceptionInfo) => {
        if (result === undefined) {
            return; // Mezzurite not found
        }

        // Stop checking for Mezzurite every second, as we have found it.
        clearInterval(mezzuriteLoadCheckInterval);
        isPanelCreated = true;

        createPanel();
    });
}
