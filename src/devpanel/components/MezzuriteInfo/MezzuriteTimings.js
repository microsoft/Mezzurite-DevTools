import React from 'react';
import Container from '../Container.js';

const MezzuriteTimings = (props) => {
    const timingItems = props.timings.map(timing => 
        <li>{timing.metricType + ", " + timing.value + ", " + timing.data}</li>
    );

    return (
        <Container title="Mezzurite Timings">
            <ul id="mezzurite-timings-list">
                {timingItems}
            </ul>
        </Container>
    )
};

export default MezzuriteTimings;