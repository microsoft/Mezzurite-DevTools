import React from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';

import './Main.css';
import CaptureCycle from '../CaptureCycle/CaptureCycle';
import MainLoading from './MainLoading';

const Main = (props) => {
  const noActiveCaptureCycles = props.captureCycles != null && props.captureCycles.length === 0 && props.applicationLoadTime != null;

  return (
    props != null && <main className='main'>
      {renderHeader(props.applicationLoadTime, props.loading, props.onHelpClick)}
      {props.loading && <MainLoading />}
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

const renderHeader = (applicationLoadTime, loading, onHelpClick) => {
  if (applicationLoadTime == null) {
    if (loading) {
      return <h2 className='main--header'>
        Mezzurite is working...
      </h2>;
    } else {
      return <h2 className='main--header'>
        <span className='main--header-text'>
          Mezzurite was not detected. Learn more about Mezzurite <a className='main--header-link' href='https://github.com/Microsoft/Mezzurite#onboarding' target='_blank'>on GitHub</a>.
        </span>
      </h2>;
    }
  } else {
    return <h2 className='main--header'>
      App<span className='mobile-hidden'>lication</span> Load Time: {applicationLoadTime.toFixed(1)}ms
    </h2>;
  }
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
  ),
  loading: bool,
  onHelpClick: func
};

export default Main;
