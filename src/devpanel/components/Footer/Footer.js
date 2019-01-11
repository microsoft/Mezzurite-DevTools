import React from 'react';
import './Footer.css';

import githubLogo from './GitHub-Mark-Light-32px.png';

const Footer = () => (
  <footer className='Footer'>
    <a href='https://github.com/Microsoft/Mezzurite-DevTools' target='_blank'>
      <img id='gh-logo' src={githubLogo} />
    </a>
    <span>Visit us on GitHub! ~ The Mezzurite Development Team</span>
  </footer>
);

export default Footer;
