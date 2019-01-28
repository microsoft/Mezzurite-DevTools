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
    const backgroundPageConnection = chrome.runtime.connect({
      name: 'devtools-page'
    });

    backgroundPageConnection.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'timing') {
        callback(message.payload);
      }
    });

    backgroundPageConnection.postMessage({
      action: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId
    });
  }
}

export default MezzuriteInspector;
