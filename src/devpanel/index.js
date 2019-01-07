import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import 'normalize.css';
import './index.css';

import App from './components/App.js';

// The only reason for using React Router DOM is to have ALT for the chrome extension
// MemoryRouter is used because this is not a traditional browser environment
ReactDOM.render((
    // <MemoryRouter>
        <App />
    // </MemoryRouter>
    ),document.getElementById('root')
);
