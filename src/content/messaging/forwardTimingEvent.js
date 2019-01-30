/**
 * The event listener callback that listens for forwarded Mezzurite
 * timing events and forwards them to the DevTools panel.
 * @param {CustomEvent} timingEvent - The forwarded Mezzurite timing event
 * @listens CustomEvent
 */
function forwardTimingEvent (timingEvent) {
  // Forward the event to the Mezzurite DevTools panel
  console.log(`CS: Got a timing event! ${timingEvent}`);
  console.log(timingEvent);
  chrome.runtime.sendMessage({
    action: 'timing',
    payload: timingEvent.detail
  });
}

export default forwardTimingEvent;
