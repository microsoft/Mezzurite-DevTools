'use strict';

const connections = {};
const dataQueue = {};

chrome.runtime.onConnect.addListener(function (port) {
  const devToolsPageListener = function (message, sender, sendResponse) {
    // The original connection event doesn't include the tab ID of
    // the DevTools page, so it needs to be sent explicitly
    console.log('BG: Received a message!');
    console.log(message);
    if (message.action === 'init') {
      console.log('BG: Received an init message');
      connections[message.tabId] = port;
      while (dataQueue[message.tabId].length > 0) {
        connections[message.tabId].postMessage(dataQueue[message.tabId].shift());
      }
    }
  };

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(devToolsPageListener);

  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(devToolsPageListener);

    const tabs = Object.keys(connections);
    for (let i = 0, len = tabs.length; i < len; i++) {
      if (connections[tabs[i]] === port) {
        delete connections[tabs[i]];
        break;
      }
    }
  });
});

// Receive message from content scripts and relay them to the devTools page
// for the current tab
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (request.action === 'timing') {
      if (tabId in connections) {
        while (dataQueue[tabId].length > 0) {
          connections[tabId].postMessage(dataQueue[tabId].shift());
        }
        connections[tabId].postMessage(request);
      } else {
        console.log('Tab not found in connection list.');
        // Save data for when it does connect
        if (!(tabId in dataQueue)) {
          dataQueue[tabId] = [];
        }

        dataQueue[tabId].push(request);
      }
    } else if (request.action === 'mezzuriteFound') {
      dataQueue[tabId] = [];
    }
  } else {
    console.log('sender.tab not defined.');
  }

  return true;
});
