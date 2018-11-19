'use strict';

chrome.runtime.onInstalled.addListener(onInstalled);

function onInstalled() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log(`BG: Got a message! ${message}, ${sender}, ${sendResponse}`);

        if (message.action === "bg_mountContentScript") {
            chrome.tabs.executeScript(message.tabId, {
                file: 'content.js'
            })
        }
    });
}
