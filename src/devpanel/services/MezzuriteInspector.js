/**
 * This is a callback function signature for handling the response that
 * is asynchronously returned by `chrome.devtools.inspectedWindow.eval()`.
 * @callback evalCallback
 * @param {Object} result - The result of the evaluated statement.
 * @param {Object} exceptionInfo - The exception details, if present.
 */

/**
 * Attempts to get the `window.mezzurite` object from the inspected window.
 * @param {evalCallback} callback - The callback that handles the response.
 */
function getMezzuriteObject(callback) {
    const expression = `window.mezzurite`;
    chrome.devtools.inspectedWindow.eval(expression, callback);
}

function getMezzuriteObjectAsync() {
    const expression = `window.mezzurite`;
    return new Promise(function(resolve, reject) {
        chrome.devtools.inspectedWindow.eval(expression, (result, exceptionInfo) => {
            if (exceptionInfo.isException === true) {
                reject(Error(exceptionInfo));
            } else {
                resolve(result); // Return the object, which can be undefined. Let caller handle it.
            }
        });
    });
}

class MezzuriteInspector {
    static getMezzuriteObjectAsync() {
        const expression = `window.mezzurite`;
        return new Promise(function(resolve, reject) {
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
    static listenForTimingEvents(callback) {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            console.log(`DT: Got a message! ${message}, ${sender}, ${sendResponse}`);

            if (message.action === "timing") {
                callback(message.payload);
            }
        });
    }

    /**
     * Send a Chrome runtime message to the background script
     * to instruct it to mount the content script into the
     * inspected page.
     */
    static tellBackgroundToMountContentScript() {
        chrome.runtime.sendMessage({
            action: "bg_mountContentScript",
            tabId: chrome.devtools.inspectedWindow.tabId
        });
    }
}

export default MezzuriteInspector;