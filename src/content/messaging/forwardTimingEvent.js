/**
 * The event listener callback that listens for forwarded Mezzurite
 * timing events and forwards them to the DevTools panel.
 * @param {CustomEvent} timingEvent - The forwarded Mezzurite timing event
 * @listens CustomEvent
 */
function forwardTimingEvent (timingEvent) {
  if (timingEvent == null) {
    throw Error('timingEvent must not be null or undefined');
  }

  if (!(timingEvent instanceof CustomEvent)) {
    throw Error('timingEvent must be an instance of CustomEvent');
  }

  if (timingEvent.detail == null) {
    throw Error('timingEvent.detail must not be null or undefined');
  }

  chrome.runtime.sendMessage({
    action: 'timing',
    payload: timingEvent.detail
  });
}

export default forwardTimingEvent;
