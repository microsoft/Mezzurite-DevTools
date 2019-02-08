import React from 'react';
import ReactDOM from 'react-dom';

import cssVars from 'css-vars-ponyfill';
import 'normalize.css';

import App from './components/App';
import './fabric.min.css';
import './index.css';

ReactDOM.render((<App />), document.getElementById('root'));

cssVars();
