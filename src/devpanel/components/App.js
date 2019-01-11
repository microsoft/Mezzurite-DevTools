import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';

class App extends Component {
  componentDidMount () {

  }

  componentWillUnMount () {

  }

  render () {
    return (
      <div className='App'>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
