import React, { Fragment } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';

import './Main.css';
import CaptureCycle from '../CaptureCycle/CaptureCycle';
import MainLoading from './MainLoading';

const Main = (props) => {
  const noActiveCaptureCycles = props.captureCycles != null && props.captureCycles.length === 0 && props.applicationLoadTime != null;

  return (
    props != null && <main className='main'>
      <h2 className={props.applicationLoadTime != null || props.loading ? 'main--header' : 'main--header main--header-center'}>
        {renderHeader(props.applicationLoadTime, props.loading)}
      </h2>
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

const renderHeader = (applicationLoadTime, loading) => {
  if (applicationLoadTime == null) {
    if (loading) {
      return <Fragment>
        Mezzurite is working...
      </Fragment>;
    } else {
      return <span className='main--header-text'>
        Mezzurite was not detected. Follow <a className='main--header-link' href='https://github.com/Microsoft/Mezzurite#onboarding' target='_blank'>the instructions</a> to install Mezzurite.
      </span>;
    }
  } else {
    return <Fragment>
      App<span className='mobile-hidden'>lication</span> Load Time: {applicationLoadTime.toFixed(1)}ms
    </Fragment>;
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
  loading: bool
};

export default Main;
