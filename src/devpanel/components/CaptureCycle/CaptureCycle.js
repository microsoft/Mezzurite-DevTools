import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import './CaptureCycle.css';
import ComponentTiming from '../ComponentTiming/ComponentTiming.js';

const CaptureCycle = (props) => (
  props != null && props.timings != null && props.timings.length > 0 && <section className='capture-cycle--card'>
    <h2 className='capture-cycle--timestamp'>Capture Cycle{props.timestamp != null && <span> at {props.timestamp}:</span>}</h2>
    <ul className='capture-cycle--components'>
      {props.timings.map((timing, timingIndex) =>
        <ComponentTiming
          key={`capture-cycle-${props.captureCycleIndex}-component-${timingIndex}`}
          name={timing.componentName}
          loadTime={timing.componentLoadTime}
        />
      )}
    </ul>
  </section>
);

CaptureCycle.propTypes = {
  captureCycleIndex: number,
  timestamp: string,
  timings: arrayOf(shape({
    componentLoadTime: number,
    componentName: string
  }))
};

export default CaptureCycle;
