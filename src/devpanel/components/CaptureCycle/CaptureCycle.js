import React, { Fragment } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import './CaptureCycle.css';
import CaptureCycleSection from '../CaptureCycleSection/CaptureCycleSection';

const CaptureCycle = (props) => {
  const captureCycleHeader = <h2 className='capture-cycle--timestamp'>
    {props.routeUrl == null ? 'Capture Cycle' : props.routeUrl}
    {props.timestamp != null && <span> at {props.timestamp}:</span>}
  </h2>;
  const insideViewportHeading = 'Inside Viewport';
  const insideViewportSubheading = props.viewportLoadTime != null && <Fragment>
    Viewport Load Time: <span className='capture-cycle--statistic'>{props.viewportLoadTime.toFixed(1)}</span>ms
  </Fragment>;
  const outsideViewportHeading = 'Outside Viewport';
  const shouldRenderInsideViewportComponents = props.insideViewportComponents != null && props.insideViewportComponents.length > 0;
  const shouldRenderOutsideViewportComponents = props.outsideViewportComponents != null && props.outsideViewportComponents.length > 0;

  return (
    props != null && (shouldRenderInsideViewportComponents || shouldRenderOutsideViewportComponents) &&
    <section className='capture-cycle--card'>
      {captureCycleHeader}
      {shouldRenderInsideViewportComponents &&
        <CaptureCycleSection
          captureCycleIndex={props.captureCycleIndex}
          components={props.insideViewportComponents}
          heading={insideViewportHeading}
          subheading={insideViewportSubheading}
        />
      }
      {shouldRenderOutsideViewportComponents &&
        <CaptureCycleSection
          captureCycleIndex={props.captureCycleIndex}
          components={props.outsideViewportComponents}
          heading={outsideViewportHeading}
        />
      }
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
