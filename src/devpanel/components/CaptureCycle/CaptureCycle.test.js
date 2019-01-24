import CaptureCycle from './CaptureCycle';

describe('CaptureCycle.test.js', () => {
  it('should not render when the props are null', () => {
    expect(CaptureCycle(null)).toBeFalsy();
  });

  it('should not render when the timings are null', () => {
    expect(CaptureCycle({ timings: null })).toBeFalsy();
  });

  it('should not render when there are no timings', () => {
    expect(CaptureCycle({ timings: [] })).toBeFalsy();
  });

  it('should not error out when there is no timestamp', () => {
    expect(CaptureCycle({ captureCycleIndex: 0, timings: [ { componentLoadTime: 9.2, componentName: 'componentName' } ] })).toMatchSnapshot();
  });

  it('should not error out when there is no captureCycleIndex', () => {
    expect(CaptureCycle({ timestamp: new Date(2019, 1, 23), timings: [ { componentLoadTime: 9.2, componentName: 'componentName' } ] })).toMatchSnapshot();
  });

  it('should render the capture cycle', () => {
    expect(CaptureCycle({ captureCycleIndex: 0, timestamp: new Date(2019, 1, 23), timings: [ { componentLoadTime: 9.2, componentName: 'componentName' } ] })).toMatchSnapshot();
  });
});
