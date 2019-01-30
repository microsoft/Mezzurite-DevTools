/**
 * Injects the script at the provided filepath as a script tag
 * inside the window this content script is running on.
 * @param {string} filepath - The filepath to the script to be injected.
 */
function injectScript (filepath) {
  const bodyTag = document.getElementsByTagName('body')[0];
  const scriptTag = document.createElement('script');
  scriptTag.setAttribute('type', 'text/javascript');
  scriptTag.setAttribute('src', filepath);
  bodyTag.appendChild(scriptTag);
}

export default injectScript;
