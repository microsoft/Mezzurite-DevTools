import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import './Main.css';
import CaptureCycle from '../CaptureCycle/CaptureCycle';

const Main = (props) => {
  const noActiveCaptureCycles = props.captureCycles != null && props.captureCycles.length === 0 && props.applicationLoadTime != null;

  return (
    props != null && <main className='main'>
      {props.applicationLoadTime == null && props.captureCycles == null &&
        <h2 className='main--header'>Mezzurite is working...</h2>
      }
      {props.applicationLoadTime != null && <h2 className='main--header'>App<span className='mobile-hidden'>lication</span> Load Time: {props.applicationLoadTime} ms</h2>}
      {props.captureCycles != null && props.captureCycles.length > 0 && props.captureCycles.map((captureCycle, captureCycleIndex) => {
        if (captureCycle != null) {
          return (
            <CaptureCycle
              captureCycleIndex={captureCycleIndex}
              key={`capture-cycle-${captureCycleIndex}`}
              insideViewportComponents={captureCycle.insideViewportComponents}
              outsideViewportComponents={captureCycle.outsideViewportComponents}
              routeUrl={props.routeUrl}
              timestamp={captureCycle.time}
              viewportLoadTime={captureCycle.viewportLoadTime}
            />
          );
        }
      })}
      {noActiveCaptureCycles && <h3>No active capture cycles have completed.</h3>}
    </main>
  );
};

Main.propTypes = {
  applicationLoadTime: number,
  captureCycles: arrayOf(
    shape({
      insideViewportComponents: arrayOf(shape({
        componentLoadTime: number,
        componentName: string
      })),
      outsideViewportComponents: arrayOf(shape({
        componentLoadTime: number,
        componentName: string
      })),
      routeUrl: string,
      time: string,
      viewportLoadTime: number
    })
  )
};

export default Main;
