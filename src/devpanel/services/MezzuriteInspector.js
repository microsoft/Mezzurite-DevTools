class MezzuriteInspector {
  static isMezzuritePresentAsync () {
    const expression = `window.mezzurite != null`;
    return new Promise(function (resolve, reject) {
      chrome.devtools.inspectedWindow.eval(expression, (result, exceptionInfo) => {
        if (exceptionInfo !== undefined) {
          reject(Error(exceptionInfo));
        } else {
          resolve(result); // Return the object, which can be undefined. Let caller handle it.
        }
      });
    });
  }

  /**
     * Set up an event listener to grab Mezzurite timing events forwarded
     * by the content script and execute a callback method.
     */
  static listenForTimingEvents (callback) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log(`DT: Got a message! ${message}, ${sender}, ${sendResponse}`);

      if (message.action === 'timing') {
        callback(message.payload);
      }
    });
  }

  /**
     * Send a Chrome runtime message to the background script
     * to instruct it to mount the content script into the
     * inspected page.
     */
  static tellBackgroundToMountContentScript () {
    chrome.runtime.sendMessage({
      action: 'bg_mountContentScript',
      tabId: chrome.devtools.inspectedWindow.tabId
    });
  }
}

export default MezzuriteInspector;
