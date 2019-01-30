import pollConditionAsync from './pollConditionAsync.js';
import { forwardTimingEvent, sendSimpleMessage } from './messaging';

const isConditionMet = () => window.mezzurite != null;
const intervalMs = 1000;
const maxRetries = 10;

pollConditionAsync(isConditionMet, intervalMs, maxRetries).then(mezzuriteFound => {
  if (mezzuriteFound) {
    sendSimpleMessage('MezzuriteFound');
    initTimingEventForwarding();
  } else {
    sendSimpleMessage('MezzuriteNotFound');
  }
});

function initTimingEventForwarding () {
  // We assume that by the time we call this function,
  // the extension has already verified the existence of `window.mezzurite`.
  if (window.mezzurite.EventElement == null) {
    window.mezzurite.EventElement = {};
    window.mezzurite.EventElement = document.createTextNode('');
  }

  window.mezzurite.EventElement.addEventListener('Timing', (timingEvent) => {
    // No access to chrome dev tools or chrome APIs
    // Need to forward these messages via some DOM element
    // to the content script that injected this function in the first place.
    console.log('IS: Mezzurite Timing event was detected! Forwarding to content script.');
    forwardTimingEvent(timingEvent);
  });
}
