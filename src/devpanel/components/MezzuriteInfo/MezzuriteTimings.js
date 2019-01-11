import React from 'react';
import { arrayOf, number, objectOf, string } from 'prop-types';
import Container from '../Container.js';

const MezzuriteTimings = (props) => {
  const timingItems = props.timings.map(timing =>
    <li>{timing.metricType + ', ' + timing.value + ', ' + timing.data}</li>
  );

  return (
    <Container title='Mezzurite Timings'>
      <ul id='mezzurite-timings-list'>
        {timingItems}
      </ul>
    </Container>
  );
};

MezzuriteTimings.propTypes = {
  timings: arrayOf(objectOf({
    data: string,
    metricType: string,
    value: number
  }))
};

export default MezzuriteTimings;
