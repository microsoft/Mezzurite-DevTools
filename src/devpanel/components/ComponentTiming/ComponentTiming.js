import React from 'react';
import { number, string } from 'prop-types';

import './ComponentTiming.css';

const ComponentTiming = (props) => (
  props != null && (props.name != null || props.loadTime != null) && <li className='component-timing--card'>
    {props.name != null && <h4 className='component-timing--name'>{props.name}</h4>}
    {props.loadTime != null &&
      <p className='component-timing--detail'><span className='mobile-hidden'>Load time:</span> {props.loadTime.toFixed(1)} ms</p>}
  </li>
);

ComponentTiming.propTypes = {
  loadTime: number,
  name: string
};

export default ComponentTiming;
