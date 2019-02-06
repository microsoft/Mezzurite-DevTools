import composeEventHandlers from './composeEventHandlers';

describe('composeEventHandlers.js', () => {
  it('throws an Error when the topicToHandlers parameter is null', () => {
    expect(() => composeEventHandlers(null, 'a', 'b')).toThrow();
  });

  it('throws an Error when the topicToHandlers parameter is undefined', () => {
    expect(() => composeEventHandlers(undefined, 'a', 'b')).toThrow();
  });

  it('throws an Error when the keyTopic parameter is null', () => {
    expect(() => composeEventHandlers({}, null, 'b')).toThrow();
  });

  it('throws an Error when the keyTopic parameter is undefined', () => {
    expect(() => composeEventHandlers({}, undefined, 'b')).toThrow();
  });

  it('throws an Error when the keyData parameter is null', () => {
    expect(() => composeEventHandlers({}, 'a', null)).toThrow();
  });

  it('throws an Error when the keyData parameter is undefined', () => {
    expect(() => composeEventHandlers({}, 'a', undefined)).toThrow();
  });

  it('should invoke the appropriate callback when there is a handler registered for a topic', () => {
    const topicToHandlers = {
      food: jest.fn(),
      animals: jest.fn()
    };

    const message = {
      topic: 'food',
      data: 'Mushrooms'
    };

    const composedHandler = composeEventHandlers(topicToHandlers, 'topic', 'data');
    composedHandler(message);

    expect(topicToHandlers.food).toHaveBeenCalledTimes(1);
    expect(topicToHandlers.food).toHaveBeenCalledWith(message.data);
    expect(topicToHandlers.animals).toHaveBeenCalledTimes(0);
  });

  it('should not invoke any callback when there is no handler registered for a topic', () => {
    const topicToHandlers = {
      food: jest.fn(),
      animals: jest.fn()
    };

    const message = {
      topic: 'cars',
      data: 'Porsche'
    };

    const composedHandler = composeEventHandlers(topicToHandlers, 'topic', 'data');
    composedHandler(message);

    expect(topicToHandlers.food).toHaveBeenCalledTimes(0);
    expect(topicToHandlers.animals).toHaveBeenCalledTimes(0);
  });
});

export default composeEventHandlers;
