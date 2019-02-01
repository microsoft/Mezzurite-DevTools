/**
 * Broadcasts a simple message via `chrome.runtime`.
 * @param {string} action - The value indicating the meaning of the message.
 */
function sendSimpleMessage (action) {
  if (action == null) {
    throw Error('action must not be null or undefined');
  }

  chrome.runtime.sendMessage({
    action: action
  });
}

export default sendSimpleMessage;
