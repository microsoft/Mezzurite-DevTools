import React from 'react';
import { string } from 'prop-types';

import './Footer.css';
import GithubMark from './GithubMark';

const Footer = (props) => (
  <footer role='contentinfo'>
    <ul className='footer--content'>
      <li className='github-information'>
        <a
          aria-label='Visit Mezzurite Dev Tools on GitHub'
          className='github-information--link'
          href='https://github.com/Microsoft/Mezzurite-DevTools'
          target='_blank'
        >
          <GithubMark />
          <span className='github-information--text'>Visit us on GitHub!<span className='tablet-hidden'> ~ The Mezzurite Development Team</span></span>
        </a>
      </li>
      <li className='package-information'>
        <ul className='package-information--container'>
          {props.packageName != null && <li className='package-information--name'>
            <span className='package-information--label'><span className='tablet-hidden'>Package </span>Name:</span>
            <a aria-label='Visit Mezzurite on GitHub' className='github-information--package' href='https://github.com/Microsoft/Mezzurite' target='_blank'>
              {props.packageName}
            </a>
          </li>}
          {props.packageVersion != null && <li className='package-information--version'>
            <span className='package-information--label'><span className='tablet-hidden'>Package </span>Version:</span>{props.packageVersion}
          </li>}
        </ul>
      </li>
    </ul>
  </footer>
);

Footer.propTypes = {
  packageName: string,
  packageVersion: string
};

export default Footer;
