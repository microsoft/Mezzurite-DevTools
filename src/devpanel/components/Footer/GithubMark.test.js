import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import GithubMark from './GithubMark';

describe('GithubMark.js', () => {
  const renderer = new ShallowRenderer();

  it('should render the Github logo', () => {
    const tree = renderer
      .render(<GithubMark />);
    expect(tree).toMatchSnapshot();
  });
});
