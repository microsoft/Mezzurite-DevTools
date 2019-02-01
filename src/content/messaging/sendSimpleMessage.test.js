import sendSimpleMessage from './sendSimpleMessage';

describe('sendSimpleMessage.js', () => {
  beforeAll(() => {
    global.chrome = {
      runtime: {
        sendMessage: jest.fn()
      }
    };
  });

  it('should throw an Error when the action parameter is null', () => {
    expect(() => sendSimpleMessage(null)).toThrow();
  });

  it('should throw an Error when the action parameter is undefined', () => {
    expect(() => sendSimpleMessage(null)).toThrow();
  });

  it('should send the requested message via chrome.runtime', () => {
    const expectedAction = 'abc';
    const expectedMessage = {
      action: expectedAction
    };

    // Has side-effects
    sendSimpleMessage(expectedAction);

    // Verify that chrome.runtime.sendMessage was only called once
    // with a single argument: the expectedMessage object
    expect(global.chrome.runtime.sendMessage.mock.calls).toEqual([[expectedMessage]]);
  });

  afterAll(() => {
    delete global.chrome;
  });
});
