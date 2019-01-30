/**
 * The event listener callback that listens for forwarded Mezzurite
 * timing events and forwards them to the DevTools panel.
 * @param {CustomEvent} timingEvent - The forwarded Mezzurite timing event
 * @listens CustomEvent
 */
function forwardTimingEvent (timingEvent) {
  chrome.runtime.sendMessage({
    action: 'timing',
    payload: timingEvent.detail
  });
}

export default forwardTimingEvent;
