import React from 'react';
import { number, string } from 'prop-types';

import './ComponentTiming.css';

const ComponentTiming = (props) => (
  props != null && (props.name != null || props.loadTime != null) && <li className='component-timing--card'>
    {props.name != null && <h3>{props.name}</h3>}
    {props.loadTime != null && <p>Time to load: {props.loadTime} ms</p>}
  </li>
);

ComponentTiming.propTypes = {
  loadTime: number,
  name: string
};

export default ComponentTiming;
