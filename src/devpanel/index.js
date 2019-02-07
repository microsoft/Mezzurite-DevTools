import React from 'react';
import ReactDOM from 'react-dom';

import cssVars from 'css-vars-ponyfill';
import 'normalize.css';

import App from './components/App';
import './fabric.min.css';
import './index.css';

// The only reason for using React Router DOM is to have ALT for the chrome extension
// MemoryRouter is used because this is not a traditional browser environment
ReactDOM.render((
  // <MemoryRouter>
  <App />
// </MemoryRouter>
), document.getElementById('root')
);

cssVars();
