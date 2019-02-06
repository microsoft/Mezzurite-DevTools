/**
 * This class aggregates multiple callback functions for separate topics
 * and allows listening to them on a `Connection`, which only accepts
 * a single callback.
 */
class Subscriber {
  constructor (connection) {
    if (connection == null) {
      throw Error('connection must not be null or undefined');
    }

    this.connection = connection;
    this.topicToHandlerMap = new Map();
  }

  connect () {
    this.connection.addListener(this._handleMessages);
  }

  disconnect () {
    this.connection.removeListener();
  }

  subscribeToTopic (topic, callback) {
    if (topic == null) {
      throw Error('topic must not be null or undefined');
    }
    
    if (callback == null) {
      throw Error('callback must not be null or undefined');
    }

    this.topicToHandlerMap.set(topic, callback);
  }

  unsubscribeFromTopic (topic) {
    if (topic == null) {
      throw Error('topic must not be null or undefined');
    }

    this.topicToHandlerMap.delete(topic);
  }

  _handleMessages (message) {
    const action = message.action;
    for (const [topic, callback] of this.topicToHandlerMap.entries()) {
      if (topic === action) {
        callback(message.payload);
        // Keys are unique, so once we find a matching key,
        // there's no need to keep iterating.
        break;
      }
    }
  }
}

export default Subscriber;
