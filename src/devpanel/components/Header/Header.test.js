import React from 'react';
import renderer from 'react-test-renderer';

import Header from './Header';

describe('Header.js', () => {
  it('should render the header', () => {
    const tree = renderer
      .create(<Header />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
