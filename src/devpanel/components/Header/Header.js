import React from 'react';
import { func } from 'prop-types';

import './Header.css';
import Logo from './Logo';

const Header = (props) => (
  <header className='header' role='banner'>
    <Logo />
    <h1 className='header--text'>Mezzurite Developer Tools</h1>
    <button className='header--button' onClick={props.onClick}>
      <i className='ms-Icon ms-Icon--Help' title='Help' aria-label='Help' />
    </button>
  </header>
);

Header.propTypes = {
  onClick: func
};

export default Header;
