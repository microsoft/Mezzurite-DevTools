import sendEventViaDocument from './sendEventViaDocument';

describe('sendEventViaDocument.js', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.dispatchEvent = jest.fn();
  });

  it('should throw an error when the event parameter is null', () => {
    expect(() => sendEventViaDocument(null)).toThrow();
  });

  it('should throw an error when the event parameter is undefined', () => {
    expect(() => sendEventViaDocument(undefined)).toThrow();
  });

  it('should throw an Error when the event parameter is not an instance of CustomEvent', () => {
    const input = { name: 'not a CustomEvent' };
    expect(() => sendEventViaDocument(input)).toThrow();
  });

  // TODO: need to figure out how to properly mock and spy on setTimeOut and its callback
});