import Header from './Header';

describe('Header.js', () => {
  it('should render the header', () => {
    expect(Header()).toMatchSnapshot();
  });
});
