import Footer from './Footer';

describe('Footer.js', () => {
  it('should render the footer', () => {
    expect(Footer()).toMatchSnapshot();
  });
});
