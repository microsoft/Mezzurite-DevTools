import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ComponentTiming from './ComponentTiming';

describe('ComponentTiming.js', () => {
  const renderer = new ShallowRenderer();

  it('should not render when the props are null', () => {
    const tree = renderer
      .render(<ComponentTiming />);
    expect(tree).toBeFalsy();
  });

  it('should not render when the name and loadTime are null', () => {
    const tree = renderer
      .render(<ComponentTiming loadTime={null} name={null} />);
    expect(tree).toBeFalsy();
  });

  it('should render the componentTiming with only a name', () => {
    const tree = renderer
      .render(<ComponentTiming name='ComponentName' />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the componentTiming with only a loadTime', () => {
    const tree = renderer
      .render(<ComponentTiming loadTime={14.2} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the componentTiming', () => {
    const tree = renderer
      .render(<ComponentTiming loadTime={14.2} name='ComponentName' />);
    expect(tree).toMatchSnapshot();
  });
});
