import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import CaptureCycleSection from './CaptureCycleSection';

describe('CaptureCycleSection.js', () => {
  const renderer = new ShallowRenderer();

  it('should not render when the props are null', () => {
    const tree = renderer
      .render(<CaptureCycleSection />);
    expect(tree).toBeFalsy();
  });

  it('should not render when the components are null', () => {
    const tree = renderer
      .render(<CaptureCycleSection components={null} />);
    expect(tree).toBeFalsy();
  });

  it('should not render when the components are empty', () => {
    const tree = renderer
      .render(<CaptureCycleSection components={null} />);
    expect(tree).toBeFalsy();
  });

  it('should render the capture cycle section', () => {
    const tree = renderer
      .render(<CaptureCycleSection components={[
        {
          componentLoadTime: 14.2,
          componentName: 'componentName'
        }
      ]} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the capture cycle section with a captureCycleIndex', () => {
    const tree = renderer
      .render(<CaptureCycleSection
        captureCycleIndex={4}
        components={[
          {
            componentLoadTime: 14.2,
            componentName: 'componentName'
          }
        ]}
      />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the capture cycle section with a heading', () => {
    const tree = renderer
      .render(<CaptureCycleSection
        components={[
          {
            componentLoadTime: 14.2,
            componentName: 'componentName'
          }
        ]}
        heading='heading'
      />);
    expect(tree).toMatchSnapshot();
  });
});
