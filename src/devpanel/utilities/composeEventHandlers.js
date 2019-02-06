function composeEventHandlers (topicToHandlers, keyTopic, keyData) {
  if (topicToHandlers == null) {
    throw Error('topicToHandlers must not be null or undefined');
  }

  if (keyTopic == null) {
    throw Error('keyTopic must not be null or undefined');
  }

  if (keyData == null) {
    throw Error('keyData must not be null or undefined');
  }

  return message => {
    // Capture it in local scope
    const dict = topicToHandlers;
    const messageTopic = message[keyTopic];
    const messageData = message[keyData];

    for (const [topic, callback] of Object.entries(dict)) {
      if (topic === messageTopic) {
        callback(messageData);
        // Keys are unique, so once we find a matching key,
        // there's no need to keep iterating.
        break;
      }
    }
  };
}

export default composeEventHandlers;
