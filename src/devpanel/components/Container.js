import React from 'react';
import './Container.css';

const MezzuriteDetails = (props) => (
    <div className="Container">
        { props.title && 
            <p className="title">{props.title}</p>
        }
        {props.children}
    </div>
);

export default MezzuriteDetails;