import Connection from './Connection';

describe('Connection.js', () => {
  beforeEach(() => {
    global.port = {
      onMessage: {
        addListener: jest.fn(),
        removeListener: jest.fn()
      },
      postMessage: jest.fn(),
      disconnect: jest.fn()
    };
    global.chrome = {
      runtime: {
        connect: jest.fn(() => global.port)
      }
    };
  });

  describe('connect', () => {
    it('should throw an Error when the sourceName parameter is null', () => {
      const connection = new Connection();
      expect(() => connection.connect(null)).toThrow();
    });

    it('should throw an Error when the sourceName parameter is undefined', () => {
      const connection = new Connection();
      expect(() => connection.connect(undefined)).toThrow();
    });

    it('should call chrome.runtime.connect with the provided parameters', () => {
      const connection = new Connection();
      const expectedSourceName = 'abc';
      const expectedArg = { name: expectedSourceName };

      connection.connect(expectedSourceName);

      expect(global.chrome.runtime.connect).toHaveBeenCalledTimes(1);
      expect(global.chrome.runtime.connect).toHaveBeenCalledWith(expectedArg);
    });

    it('should throw an Error when it is called when an existing connection is active', () => {
      const connection = new Connection();
      connection.connect('abc');

      expect(() => connection.connect('xyz')).toThrow();
    });
  });

  describe('addListener', () => {
    it('should throw an Error when the callback parameter is null', () => {
      const connection = new Connection();
      connection.connect('abc');

      expect(() => connection.addListener(null)).toThrow();
    });

    it('should throw an Error when the callback parameter is undefined', () => {
      const connection = new Connection();
      connection.connect('abc');

      expect(() => connection.addListener(undefined)).toThrow();
    });

    it('should throw an Error when it is called before a connection is established', () => {
      const connection = new Connection();

      expect(() => connection.addListener(x => x)).toThrow();
    });

    it('should register an event listener on the active connection', () => {
      const connection = new Connection();
      connection.connect('abc');

      const callback = jest.fn();
      connection.addListener(callback);

      expect(global.port.onMessage.addListener).toHaveBeenCalledTimes(1);
      expect(global.port.onMessage.addListener).toHaveBeenCalledWith(callback);
    });
  });

  describe('removeListener', () => {
    it('should throw an Error when it is called before a connection is established', () => {
      const connection = new Connection();

      expect(() => connection.removeListener()).toThrow();
    });

    it('should throw an Error when it is called before a listener is added to the active connection', () => {
      const connection = new Connection();
      connection.connect('abc');

      expect(() => connection.removeListener()).toThrow();
    });

    it('should remove the event listener on the active connection', () => {
      const connection = new Connection();
      connection.connect('abc');

      const callback = jest.fn();
      connection.addListener(callback);

      connection.removeListener();

      expect(global.port.onMessage.removeListener).toHaveBeenCalledTimes(1);
      expect(global.port.onMessage.removeListener).toHaveBeenCalledWith(callback);
    });
  });

  describe('postMessage', () => {
    it('should throw an Error when the message parameter is null', () => {
      const connection = new Connection();
      connection.connect('abc');

      expect(() => connection.postMessage(null)).toThrow();
    });

    it('should throw an Error when the message parameter is undefined', () => {
      const connection = new Connection();
      connection.connect('abc');

      expect(() => connection.postMessage(undefined)).toThrow();
    });

    it('should throw an Error when it is called before a connection is established', () => {
      const connection = new Connection();
      const message = { action: 'abc' };

      expect(() => connection.postMessage(message)).toThrow();
    });

    it('should send the requested message on the active connection', () => {
      const connection = new Connection();
      connection.connect('abc');

      const expectedMessage = { action: 'xyz' };
      connection.postMessage(expectedMessage);

      expect(global.port.postMessage).toHaveBeenCalledTimes(1);
      expect(global.port.postMessage).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe('disconnect', () => {
    it('should throw an Error when it is called before a connection is established', () => {
      const connection = new Connection();

      expect(() => connection.disconnect()).toThrow();
    });

    it('should close the active connection', () => {
      const connection = new Connection();
      connection.connect('abc');

      connection.disconnect();

      expect(global.port.disconnect).toHaveBeenCalledTimes(1);
    });
  });
});
