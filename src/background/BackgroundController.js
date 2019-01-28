class BackgroundController {
  constructor () {
    this.connections = {};
    this.dataQueue = {};
  }

  init () {
    chrome.runtime.onConnect.addListener(port => {
      const devToolsPageListener = (message, sender, sendResponse) => {
        // The original connection event doesn't include the tab ID of
        // the DevTools page, so it needs to be sent explicitly
        console.log('BG: Received a message!');
        console.log(message);
        if (message.action === 'init') {
          console.log('BG: Received an init message');
          this.connections[message.tabId] = port;
          while (this.dataQueue[message.tabId].length > 0) {
            this.connections[message.tabId].postMessage(this.dataQueue[message.tabId].shift());
          }
        }
      };

      // Listen to messages sent from the DevTools page
      port.onMessage.addListener(devToolsPageListener);

      port.onDisconnect.addListener(port => {
        port.onMessage.removeListener(devToolsPageListener);

        const tabs = Object.keys(this.connections);
        for (let i = 0, len = tabs.length; i < len; i++) {
          if (this.connections[tabs[i]] === port) {
            delete this.connections[tabs[i]];
            break;
          }
        }
      });
    });

    // Receive message from content scripts and relay them to the devTools page
    // for the current tab
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      // Messages from content scripts should have sender.tab set
      if (sender.tab != null) {
        var tabId = sender.tab.id;
        if (request.action === 'timing') {
          if (tabId in this.connections) {
            while (this.dataQueue[tabId].length > 0) {
              this.connections[tabId].postMessage(this.dataQueue[tabId].shift());
            }
            this.connections[tabId].postMessage(request);
          } else {
            console.log('Tab not found in connection list.');
            // Save data for when it does connect
            if (!(tabId in this.dataQueue)) {
              this.dataQueue[tabId] = [];
            }
            this.dataQueue[tabId].push(request);
          }
        } else if (request.action === 'mezzuriteFound') {
          this.dataQueue[tabId] = [];
        }
      } else {
        console.log('sender.tab not defined.');
      }
      return true;
    });
  }
}

export default BackgroundController;
