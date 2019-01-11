'use strict';

chrome.runtime.onInstalled.addListener(onInstalled);

/**
 * Callback function to be called when the extension has
 * successfully finished installing. It sets up a Chrome
 * runtime event listener the ChromeDevTools panel page
 * uses to tell this Background page to mount the
 * content script onto the inspected page.
 */
function onInstalled () {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(`BG: Got a message! ${message}, ${sender}, ${sendResponse}`);

    if (message.action === 'bg_mountContentScript') {
      chrome.tabs.executeScript(message.tabId, {
        file: 'content.bundle.js' // Relative path is apparently determined from the manifest.json's position
      });
    }
  });
}
