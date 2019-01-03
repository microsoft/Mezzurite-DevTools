import React from 'react';

const MezzuriteDetails = (props) => (
    <div className="MezzuriteInfo">
        <div id="mezzurite-found">{props.mezzuriteFoundMessage}</div>
        <div id="mezzurite-package">{props.mezzuritePackage}</div>
        <div id="mezzurite-version">{props.mezzuriteVersion}</div>
    </div>
);

export default MezzuriteDetails;