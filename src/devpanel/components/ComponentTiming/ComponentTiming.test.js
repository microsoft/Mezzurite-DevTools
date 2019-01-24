import ComponentTiming from './ComponentTiming';

describe('ComponentTiming.js', () => {
  it('should not render when the props are null', () => {
    expect(ComponentTiming(null)).toBeFalsy();
  });

  it('should not render when the name and loadTime are null', () => {
    expect(ComponentTiming({ loadTime: null, name: null })).toBeFalsy();
  });

  it('should render the componentTiming with only a name', () => {
    expect(ComponentTiming({ name: 'ComponentName' })).toMatchSnapshot();
  });

  it('should render the componentTiming with only a loadTime', () => {
    expect(ComponentTiming({ loadTime: 14.2 })).toMatchSnapshot();
  });

  it('should render the componentTiming', () => {
    expect(ComponentTiming({ loadTime: 14.2, name: 'ComponentName' })).toMatchSnapshot();
  });
});
