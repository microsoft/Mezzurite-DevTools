import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Footer from './Footer';

describe('Footer.js', () => {
  const renderer = new ShallowRenderer();

  it('should render the footer without a packageName or packageVersion', () => {
    const tree = renderer
      .render(<Footer />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the footer with only a packageName', () => {
    const tree = renderer
      .render(<Footer packageName='packageName' />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the footer with only a packageVersion', () => {
    const tree = renderer
      .render(<Footer packageVersion='packageVersion' />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the footer', () => {
    const tree = renderer
      .render(<Footer packageName='packageName' packageVersion='packageVersion' />);
    expect(tree).toMatchSnapshot();
  });
});
