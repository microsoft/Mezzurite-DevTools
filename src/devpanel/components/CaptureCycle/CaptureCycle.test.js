import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import CaptureCycle from './CaptureCycle';

describe('CaptureCycle.js', () => {
  const renderer = new ShallowRenderer();

  it('should not render when the props are null', () => {
    const tree = renderer
      .render(<CaptureCycle />);
    expect(tree).toBeFalsy();
  });

  it('should not render when the timings are null', () => {
    const tree = renderer
      .render(<CaptureCycle timings={null} />);
    expect(tree).toBeFalsy();
  });

  it('should not render when there are no timings', () => {
    const tree = renderer
      .render(<CaptureCycle timings={[]} />);
    expect(tree).toBeFalsy();
  });

  it('should not error out when there is no timestamp', () => {
    const tree = renderer
      .render(<CaptureCycle captureCycleIndex={0} timings={[ { componentLoadTime: 9.2, componentName: 'componentName' } ]} />);
    expect(tree).toMatchSnapshot();
  });

  it('should not error out when there is no captureCycleIndex', () => {
    const tree = renderer
      .render(<CaptureCycle timestamp={new Date(2019, 1, 23).toLocaleTimeString()} timings={[ { componentLoadTime: 9.2, componentName: 'componentName' } ]} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the capture cycle', () => {
    const tree = renderer
      .render(<CaptureCycle
        captureCycleIndex={0}
        timestamp={new Date(2019, 1, 23).toLocaleTimeString()}
        timings={[ { componentLoadTime: 9.2, componentName: 'componentName' } ]}
      />);
    expect(tree).toMatchSnapshot();
  });
});
