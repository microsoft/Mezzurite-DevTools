import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import HelpDialog from './HelpDialog';

describe('HelpDialog.js', () => {
  const renderer = new ShallowRenderer();

  it('should render without an onCloseClick function', () => {
    const tree = renderer
      .render(<HelpDialog />);
    expect(tree).toMatchSnapshot();
  });

  it('should render with an onCloseClick function', () => {
    const tree = renderer
      .render(<HelpDialog onCloseClick={() => true} />);
    expect(tree).toMatchSnapshot();
  });
});
