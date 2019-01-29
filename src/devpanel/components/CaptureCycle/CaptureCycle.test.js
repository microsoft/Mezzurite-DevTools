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

  it('should not render when insideViewportComponents and outsideViewportComponents are null', () => {
    const tree = renderer
      .render(<CaptureCycle insideViewportComponents={null} outsideViewportComponents={null} />);
    expect(tree).toBeFalsy();
  });

  it('should not render when insideViewportComponents and outsideViewportComponents are empty', () => {
    const tree = renderer
      .render(<CaptureCycle insideViewportComponents={[]} outsideViewportComponents={[]} />);
    expect(tree).toBeFalsy();
  });

  it('should render when there are only insideViewportComponents', () => {
    const tree = renderer
      .render(<CaptureCycle insideViewportComponents={[
        {
          componentLoadTime: 12.2,
          componentName: 'componentName'
        }
      ]} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render when there are only outsideViewportComponents', () => {
    const tree = renderer
      .render(<CaptureCycle outsideViewportComponents={[
        {
          componentLoadTime: 12.2,
          componentName: 'componentName'
        }
      ]} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render when there are both insideViewportComponents and outsideViewportComponents', () => {
    const tree = renderer
      .render(<CaptureCycle
        insideViewportComponents={[
          {
            componentLoadTime: 12.2,
            componentName: 'componentName'
          }
        ]}
        outsideViewportComponents={[
          {
            componentLoadTime: 12.2,
            componentName: 'componentName'
          }
        ]}
      />);
    expect(tree).toMatchSnapshot();
  });

  it('should render with a routeUrl', () => {
    const tree = renderer
      .render(<CaptureCycle
        insideViewportComponents={[
          {
            componentLoadTime: 12.2,
            componentName: 'componentName'
          }
        ]}
        outsideViewportComponents={[
          {
            componentLoadTime: 12.2,
            componentName: 'componentName'
          }
        ]}
        routeUrl='routeUrl'
      />);
    expect(tree).toMatchSnapshot();
  });

  it('should render with a timestamp', () => {
    const tree = renderer
      .render(<CaptureCycle
        insideViewportComponents={[
          {
            componentLoadTime: 12.2,
            componentName: 'componentName'
          }
        ]}
        outsideViewportComponents={[
          {
            componentLoadTime: 12.2,
            componentName: 'componentName'
          }
        ]}
        timestamp='timestamp'
      />);
    expect(tree).toMatchSnapshot();
  });

  it('should render with both a routeUrl and timestamp', () => {
    const tree = renderer
      .render(<CaptureCycle
        insideViewportComponents={[
          {
            componentLoadTime: 12.2,
            componentName: 'componentName'
          }
        ]}
        outsideViewportComponents={[
          {
            componentLoadTime: 12.2,
            componentName: 'componentName'
          }
        ]}
        routeUrl='routeUrl'
        timestamp='timestamp'
      />);
    expect(tree).toMatchSnapshot();
  });

  it('should render with a viewportLoadTime', () => {
    const tree = renderer
      .render(<CaptureCycle
        insideViewportComponents={[
          {
            componentLoadTime: 12.2,
            componentName: 'componentName'
          }
        ]}
        outsideViewportComponents={[
          {
            componentLoadTime: 12.2,
            componentName: 'componentName'
          }
        ]}
        viewportLoadTime={15.4}
      />);
    expect(tree).toMatchSnapshot();
  });
});
