import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import './CaptureCycle.css';
import CaptureCycleSection from '../CaptureCycleSection/CaptureCycleSection';

const CaptureCycle = (props) => {
  const captureCycleHeader = <h2 className='capture-cycle--header'>
    {props.routeUrl == null ? 'Capture Cycle' : props.routeUrl}
    {props.timestamp != null && <span> at {props.timestamp}:</span>}
  </h2>;
  const insideViewportHeading = <div className='capture-cycle--inside-viewport-header'>
    <h3 className='capture-cycle--card-header'><span className='mobile-hidden'>Components </span>Inside Viewport</h3>
    {props.viewportLoadTime != null && <h4 className='capture-cycle--viewport-load-time'>Viewport Load Time: <span className='capture-cycle--statistic'>{props.viewportLoadTime.toFixed(1)}</span>ms</h4>}
  </div>;
  const outsideViewportHeading = <h3 className='capture-cycle--card-header'><span className='mobile-hidden'>Components </span>Outside Viewport</h3>;
  const shouldRenderInsideViewportComponents = props.insideViewportComponents != null && props.insideViewportComponents.length > 0;
  const shouldRenderOutsideViewportComponents = props.outsideViewportComponents != null && props.outsideViewportComponents.length > 0;

  return (
    props != null && (shouldRenderInsideViewportComponents || shouldRenderOutsideViewportComponents) &&
    <section>
      {captureCycleHeader}
      <div className='capture-cycle--card'>
        {shouldRenderInsideViewportComponents &&
          <CaptureCycleSection
            captureCycleIndex={props.captureCycleIndex}
            components={props.insideViewportComponents}
            heading={insideViewportHeading}
          />
        }
        {shouldRenderOutsideViewportComponents &&
          <CaptureCycleSection
            captureCycleIndex={props.captureCycleIndex}
            components={props.outsideViewportComponents}
            heading={outsideViewportHeading}
          />
        }
      </div>
    </section>
  );
};

CaptureCycle.propTypes = {
  captureCycleIndex: number,
  insideViewportComponents: arrayOf(shape({
    componentLoadTime: number,
    componentName: string
  })),
  outsideViewportComponents: arrayOf(shape({
    componentLoadTime: number,
    componentName: string
  })),
  routeUrl: string,
  timestamp: string,
  viewportLoadTime: number
};

export default CaptureCycle;
