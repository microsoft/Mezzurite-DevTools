import forwardTimingEvent from './forwardTimingEvent';

describe('forwardTimingEvent.js', () => {
  beforeAll(() => {
    global.chrome = {
      runtime: {
        sendMessage: jest.fn()
      }
    };
  });

  it('should throw an Error when the timingEvent parameter is null', () => {
    expect(() => forwardTimingEvent(null)).toThrow();
  });

  it('should throw an Error when the timingEvent parameter is undefined', () => {
    expect(() => forwardTimingEvent(null)).toThrow();
  });

  it('should throw an Error when the timingEvent parameter is not an instance of CustomEvent', () => {
    const input = { name: 'not a CustomEvent' };
    expect(() => forwardTimingEvent(input)).toThrow();
  });

  it('should throw an Error when the timingEvent parameter\'s detail property is null', () => {
    const input = new CustomEvent('timing', { detail: null });
    expect(() => forwardTimingEvent(input)).toThrow();
  });

  it('should throw an Error when the timingEvent parameter\'s detail property is undefined', () => {
    const input = new CustomEvent('timing');
    expect(() => forwardTimingEvent(input)).toThrow();
  });

  it('should send the requested message via chrome.runtime', () => {
    const expectedTimingEvent = new CustomEvent('timing', {
      detail: { a: 1, b: 2, c: 3 }
    });
    const expectedMessage = {
      action: 'timing',
      payload: expectedTimingEvent.detail
    };

    // Has side-effects
    forwardTimingEvent(expectedTimingEvent);

    // Verify that chrome.runtime.sendMessage was only called once
    // with a single argument: the expectedMessage object
    expect(global.chrome.runtime.sendMessage.mock.calls).toEqual([[expectedMessage]]);
  });

  afterAll(() => {
    delete global.chrome;
  });
});
