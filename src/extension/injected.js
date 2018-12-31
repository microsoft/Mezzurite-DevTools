// This script will be run within the context of the inspected page
// as a <script> tag with full access to the DOM and window objects.

(function () {
    'use strict';

    // We assume that by the time we inject this script,
    // the extension has already verified the existence of `window.mezzurite`.
    if (!window.mezzurite.EventElement) {
        window.mezzurite.EventElement = {};
        window.mezzurite.EventElement = document.createTextNode("");
    }
    
    window.mezzurite.EventElement.addEventListener('Timing', (timingEvent) => {
        //chrome.runtime.sendMessage({action: "timing", value: e});
        // No access to chrome dev tools or chrome APIs
        // Need to forward these messages via some DOM element 
        // to the content script that injected this function in the first place.
        
        const eventToContentScript = new CustomEvent('MezzuriteTiming_toExtension', {
            detail: timingEvent.detail
        });

        // This call to setTimeOut with 0 delay schedules this call to occur after
        // already existing events in the browser's queue, which includes rendering events.
        // This is to minimize the performance impact on the page due to the extension.
        setTimeout(() => document.dispatchEvent(eventToContentScript), 0);
    });
})();
