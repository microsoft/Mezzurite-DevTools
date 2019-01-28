// This script will be run in the context of the inspected window
// It will have shared access to the DOM, but not global variables
// like window. That is isolated. This is why we inject the
// additional script.
'use strict';

document.addEventListener('MezzuriteFound', onMezzuriteFound);
document.addEventListener('MezzuriteNotFound', onMezzuriteNotFound);
document.addEventListener('MezzuriteTiming_toExtension', onTimingEvent);

// Injecting code...
// Relative path is apparently determined from the manifest.json's position
injectScript('inject.bundle.js');

// ----------------------------------------------------------------------------

/**
 * The event listener callback that listens for forwarded Mezzurite
 * timing events and forwards them to the DevTools panel.
 * @param {CustomEvent} timingEvent - The forwarded Mezzurite timing event
 * @listens CustomEvent
 */
function onTimingEvent (timingEvent) {
  // Forward the event to the Mezzurite DevTools panel
  console.log(`CS: Got a timing event! ${timingEvent}`);
  console.log(timingEvent);
  chrome.runtime.sendMessage({
    action: 'timing',
    payload: timingEvent.detail
  });
}

function onMezzuriteFound (event) {
  console.log('CS: Got an event: MezzuriteFound');
  chrome.runtime.sendMessage({
    action: 'mezzuriteFound'
  });
}

function onMezzuriteNotFound (event) {
  console.log('CS: Got an event: MezzuriteNotFound');
  chrome.runtime.sendMessage({
    action: 'mezzuriteNotFound'
  });
}

/**
 * Injects the script at the provided filepath as a script tag
 * inside the window this content script is running on.
 * @param {string} filepath - The filepath to the script to be injected.
 */
function injectScript (filepath) {
  const bodyTag = document.getElementsByTagName('body')[0];
  const scriptTag = document.createElement('script');
  scriptTag.setAttribute('type', 'text/javascript');
  scriptTag.setAttribute('src', chrome.extension.getURL(filepath));
  bodyTag.appendChild(scriptTag);
}
