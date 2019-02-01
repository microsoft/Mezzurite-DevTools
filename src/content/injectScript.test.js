import injectScript from './injectScript';

describe('injectScript.js', () => {
  it('should throw an Error when the filepath parameter is null', () => {
    expect(() => injectScript(null)).toThrow();
  });

  it('should throw an Error when the filepath parameter is undefined', () => {
    expect(() => injectScript(undefined)).toThrow();
  });

  it('should inject the code from the provided filepath into document.body as a script tag', () => {
    document.body.innerHTML = '';

    const filepath = 'some/file/path';
    const expected = document.createElement('script');
    expected.src = filepath;
    expected.setAttribute('type', 'text/javascript');
    expected.setAttribute('src', filepath);

    injectScript('some/file/path');

    expect(document.body.childNodes[0]).toEqual(expected);
  });
});
