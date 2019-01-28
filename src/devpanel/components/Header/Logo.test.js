import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Logo from './Logo';

describe('Logo.js', () => {
  const renderer = new ShallowRenderer();

  it('should render the logo', () => {
    const tree = renderer
      .render(<Logo />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
