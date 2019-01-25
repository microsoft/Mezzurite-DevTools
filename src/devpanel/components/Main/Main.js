import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import './Main.css';
import CaptureCycle from '../CaptureCycle/CaptureCycle';

const Main = (props) => (
  props != null && <main className='main'>
    {props.applicationLoadTime == null && props.captureCycles == null &&
      <h2 className='main--header'>Mezzurite is working...</h2>
    }
    {props.applicationLoadTime != null && <h2 className='main--header'>App<span className='mobile-hidden'>lication</span> Load Time: {props.applicationLoadTime} ms</h2>}
    {props.captureCycles != null && props.captureCycles.length > 0 && props.captureCycles.filter((captureCycle) => captureCycle != null).map((captureCycle, captureCycleIndex) =>
      <CaptureCycle
        captureCycleIndex={captureCycleIndex}
        key={`capture-cycle-${captureCycleIndex}`}
        timestamp={captureCycle.time}
        timings={captureCycle.componentTimings}
      />
    )}
    {props.captureCycles != null && (props.captureCycles == null || props.captureCycles.length === 0) && props.applicationLoadTime != null &&
      <h3>No active capture cycles have completed.</h3>
    }
  </main>
);

Main.propTypes = {
  applicationLoadTime: number,
  captureCycles: arrayOf(
    shape({
      componentTimings: arrayOf(shape({
        componentLoadTime: number,
        componentName: string
      })),
      time: string
    })
  )
};

export default Main;
