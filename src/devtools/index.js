'use strict';

createPanel();

// ----------------------------------------------------------------------------

/**
 * Creates the Mezzurite panel in the Chrome Developer Tools page.
 */
function createPanel () {
  const title = 'Mezzurite';
  const iconPath = null;
  const pagePath = 'devpanel.html'; // Relative path is apparently determined from the manifest.json's position
  chrome.devtools.panels.create(title, iconPath, pagePath);
}
