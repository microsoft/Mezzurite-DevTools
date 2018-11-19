// This script will be run in the context of the inspected window
// It will have shared access to the DOM, but not global variables
// like window. That is isolated. This is why we inject the 
// additional script

document.addEventListener('MezzuriteTiming_toExtension', (timingEvent) => {
    // Forward the event to the Mezzurite DevTools panel
    console.log(`CS: Got a timing event! ${timingEvent}`);
    console.log(timingEvent);
    chrome.runtime.sendMessage({
        action: "timing",
        payload: timingEvent.detail
    });
});

injectScript('injected.js');

////////////////////////////////

function injectScript(filepath) {
    const bodyTag = document.getElementsByTagName('body')[0];
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', chrome.extension.getURL(filepath));
    bodyTag.appendChild(scriptTag);
}
