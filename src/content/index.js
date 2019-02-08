// This script will be run in the context of the inspected window
// It will have shared access to the DOM, but not global variables
// like window. That is isolated. This is why we inject the
// additional script.
import { forwardTimingEvent, sendSimpleMessage } from './messaging';
import injectScript from './injectScript';

document.addEventListener('MezzuriteFound', () => {
  sendSimpleMessage('mezzuriteFound');
});

document.addEventListener('MezzuriteNotFound', () => {
  sendSimpleMessage('mezzuriteNotFound');
});

document.addEventListener('MezzuriteTiming_toExtension', timingEvent => {
  forwardTimingEvent(timingEvent);
});

// Injecting code...
// Relative path is apparently determined from the manifest.json's position
injectScript(chrome.extension.getURL('inject.bundle.js'));
