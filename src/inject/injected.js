// This script will be run within the context of the inspected page
// as a <script> tag with full access to the DOM and window objects.

(function () {
  'use strict';

  // Check if Mezzurite has loaded every second
  const intervalMs = 1000;
  const mezzuriteLoadCheckInterval = setInterval(checkMezzurite, intervalMs);

  // --------------------------------------------------------------------------

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

      const eventToContentScript = new CustomEvent('MezzuriteTiming_toExtension', {
        detail: timingEvent.detail
      });

      sendEventViaDocument(eventToContentScript);
    });
  }

  let timeoutCounter = 10;
  function checkMezzurite () {
    if (window.mezzurite != null) {
      // mezzurite found!
      // send a message indicating it to the DT and stop the timer!
      // Also, set up the listener for timing events, etc.

      sendEventViaDocument(new CustomEvent('MezzuriteFound'));
      clearInterval(mezzuriteLoadCheckInterval);

      initTimingEventForwarding();
    } else {
      if (--timeoutCounter === 0) {
        // Did not find Mezzurite after 10 seconds... timeout: notify DT extension
        sendEventViaDocument(new CustomEvent('MezzuriteNotFound'));
        clearInterval(mezzuriteLoadCheckInterval);
      }
    }
  }

  function sendEventViaDocument (event) {
    // This call to setTimeOut with 0 delay schedules this call to occur after
    // already existing events in the browser's queue, which includes rendering events.
    // This is to minimize the performance impact on the page due to the extension.
    setTimeout(() => document.dispatchEvent(event), 0);
  }
})();
