/**
 * A class that represents a point-to-point communication channel
 * in the Chrome runtime environment.
 */
class Connection {
  constructor () {
    this.port = null;
    this.listener = null;
  }

  connect (sourceName) {
    if (sourceName == null) {
      throw Error('sourceName must not be null or undefined');
    }

    if (this.port != null) {
      throw Error('Invalid Operation - A connection is already established!');
    }

    this.port = chrome.runtime.connect({
      name: sourceName
    });
  }

  addListener (callback) {
    if (callback == null) {
      throw Error('callback must not be null or undefined');
    }

    if (this.port == null) {
      throw Error('Invalid Operation - A connection must be established before listening on it!');
    }

    this.listener = callback;
    this.port.onMessage.addListener(callback);
  }

  removeListener () {
    if (this.port == null) {
      throw Error('Invalid Operation - A connection must be established before removing a listener on it!');
    }

    if (this.listener == null) {
      throw Error('Invalid Operation - A listener must be present to remove it!');
    }

    this.port.onMessage.removeListener(this.listener);
    this.listener = null;
  }

  postMessage (message) {
    if (message == null) {
      throw Error('message must not be null or undefined');
    }

    if (this.port == null) {
      throw Error('Invalid Operation - A connection must be established before posting messages on it!');
    }

    this.port.postMessage(message);
  }

  disconnect () {
    if (this.port == null) {
      throw Error('Invalid Operation - A connection must exist to disconnect it!');
    }

    this.port.disconnect();
    this.port = null;
  }
}

export default Connection;
