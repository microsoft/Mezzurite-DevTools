import React from 'react';
import './MezzuriteDetails.css'
import Container from '../Container.js';

const MezzuriteDetails = (props) => (
    <Container title="Mezzurite Framework Details">
        <div id="mezzurite-package">
            <span>Mezzurite Package Name: </span>{props.mezzuritePackage}
        </div>
        <div id="mezzurite-version">
            <span>Mezzurite Package Version: </span>{props.mezzuriteVersion}
        </div>
    </Container>
);

export default MezzuriteDetails;