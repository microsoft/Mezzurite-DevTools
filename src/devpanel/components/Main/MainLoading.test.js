import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import MainLoading from './MainLoading';

describe('MainLoading.js', () => {
  const renderer = new ShallowRenderer();

  it('should render the main loading view', () => {
    const tree = renderer
      .render(<MainLoading />);
    expect(tree).toMatchSnapshot();
  });
});
