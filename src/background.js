'use strict';

chrome.runtime.onInstalled.addListener(onInstalled);

function onInstalled() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        // TODO: add event filtering and handling for messages to be handled by the background script
    });
}