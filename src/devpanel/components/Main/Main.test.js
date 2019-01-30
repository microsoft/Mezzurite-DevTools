import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Main from './Main';

describe('Main.js', () => {
  const renderer = new ShallowRenderer();

  it('should be loading when the props are null', () => {
    const tree = renderer
      .render(<Main />);
    expect(tree).toMatchSnapshot();
  });

  it('should render without captureCycles', () => {
    const tree = renderer
      .render(<Main applicationLoadTime={5.42} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render when captureCycles is an empty array', () => {
    const tree = renderer
      .render(<Main applicationLoadTime={5.42} captureCycles={[]} />);
    expect(tree).toMatchSnapshot();
  });

  it('should not error out when captureCycles contains a null element', () => {
    const tree = renderer
      .render(<Main applicationLoadTime={5.42} captureCycles={[ null ]} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render without applicationLoadTime', () => {
    const tree = renderer
      .render(<Main captureCycles={[
        {
          insideViewportComponents: [
            {
              componentLoadTime: 5.23,
              componentName: 'ComponentName'
            }
          ],
          time: 'time'
        }
      ]} />);
    expect(tree).toMatchSnapshot();
  });
});
