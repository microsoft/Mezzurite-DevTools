'use strict';

getMezzuriteObject((result, exceptionInfo) => {
    const strNotFound = "Mezzurite has not been detected on this page";
    const strFound = "Mezzurite has been detected on this page";

    if (result === undefined) {
        updateMezzuriteFoundStatus(strNotFound);
    } else {
        updateMezzuriteFoundStatus(strFound);
    }

    listenForTimingEvents();

    // Tell the background page to programmatically inject the content script.
    tellBackgroundToMountContentScript();
});

////////////////////////////////

function updateMezzuriteFoundStatus(text) {
    document.getElementById("mezzurite-found").innerHTML = text;
}

function updateMezzuriteFrameworkInformation(info) {
    document.getElementById("mezzurite-package").innerHTML = "Mezzurite Package Name: " + info.name;
    document.getElementById("mezzurite-version").innerHTML = "Mezzurite Package Version: " + info.version;
}

////////////////////////////////

/**
 * This is a callback function signature for handling the response that
 * is asynchronously returned by `chrome.devtools.inspectedWindow.eval()`.
 * @callback evalCallback
 * @param {Object} result - The result of the evaluated statement.
 * @param {Object} exceptionInfo - The exception details, if present.
 */

/**
 * Attempts to get the `window.mezzurite` object from the inspected window.
 * @param {evalCallback} callback - The callback that handles the response.
 */
function getMezzuriteObject(callback) {
    const expression = `window.mezzurite`;
    chrome.devtools.inspectedWindow.eval(expression, callback);
}

function listenForTimingEvents() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log(`DT: Got a message! ${message}, ${sender}, ${sendResponse}`);

        if (message.action === "timing") {
            updateMezzuriteFrameworkInformation(message.payload.Framework);

            message.payload.Timings.forEach(timing => {
                const item = document.createElement('li');
                item.appendChild(document.createTextNode(timing.metricType + ", " + timing.value + ", " + timing.data))
                document.getElementById("timings").appendChild(item);
            });
        }
    });
}

function tellBackgroundToMountContentScript() {
    chrome.runtime.sendMessage({
        action: "bg_mountContentScript",
        tabId: chrome.devtools.inspectedWindow.tabId
    });
}