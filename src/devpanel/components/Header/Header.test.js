import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Header from './Header';

describe('Header.js', () => {
  const renderer = new ShallowRenderer();

  it('should render the header', () => {
    const tree = renderer
      .render(<Header />);
    expect(tree).toMatchSnapshot();
  });
});
