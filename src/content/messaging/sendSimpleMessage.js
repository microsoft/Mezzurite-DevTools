/**
 * Broadcasts a simple message via `chrome.runtime`.
 * @param {string} action - The value indicating the meaning of the message.
 */
function sendSimpleMessage (action) {
  chrome.runtime.sendMessage({
    action: action
  });
}

export default sendSimpleMessage;
