/**
 * Dispatch an event via `document` while respecting the browser's event queue.
 * @param {CustomEvent} event - The event to dispatch via the document.
 */
function sendEventViaDocument (event) {
  // This call to setTimeOut with 0 delay schedules this call to occur after
  // already existing events in the browser's queue, which includes rendering events.
  // This is to minimize the performance impact on the page due to the extension.
  setTimeout(() => document.dispatchEvent(event), 0);
}

export default sendEventViaDocument;
