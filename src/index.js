import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './components/App.js';


// The only reason for using React Router DOM is to have ALT for the chrome extension
// MemoryRouter is used because this is not a traditional browser environment
ReactDOM.render((
    // <MemoryRouter>
        <App />
    // </MemoryRouter>
    ),document.getElementById('root')
);

////////////////////////////////
// Chrome stuff while I figure out how to refactor it nicely...
////////////////////////////////

// import { getMezzuriteObjectAsync } from './agent.js'

// getMezzuriteObjectAsync()
//     .then(value => {
//         if (value === undefined) {
//             // Mezzurite not found, at least for now
//             // TODO do a 10-second timeout counter decrement for controlling the number of calls.

//         } else {

//         }


//     });
