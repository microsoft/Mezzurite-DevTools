import React from 'react';

import './Header.css';
import Logo from './Logo';

const Header = () => (
  <header className='header' role='banner'>
    <Logo />
    <h1 className='header--text'>Mezzurite Developer Tools</h1>
  </header>
);

export default Header;
