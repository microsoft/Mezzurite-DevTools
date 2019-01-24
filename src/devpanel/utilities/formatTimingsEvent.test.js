import formatTimingsEvent from './formatTimingsEvent';

describe('formatTimingsEvent.js', () => {
  it('should return null when the event is null', () => {
    expect(formatTimingsEvent(null)).toBeNull();
  });

  it('should return null when the event is undefined', () => {
    expect(formatTimingsEvent(undefined)).toBeNull();
  });

  describe('alt', () => {
    it('should return null for the alt when the Timings property is null', () => {
      expect(formatTimingsEvent({ Timings: null }).alt).toBeNull();
    });

    it('should return null for the alt when the Timings property is undefined', () => {
      expect(formatTimingsEvent({ Timings: undefined }).alt).toBeNull();
    });

    it('should return null for the alt when the Timings property is not an array', () => {
      expect(formatTimingsEvent({ Timings: 1 }).alt).toBeNull();
    });

    it('should return null for the alt when the Timings array is empty', () => {
      expect(formatTimingsEvent({ Timings: [] }).alt).toBeNull();
    });

    it('should return null for the alt when the Timings array has a null value', () => {
      expect(formatTimingsEvent({ Timings: [ null ] }).alt).toBeNull();
    });

    it('should return null for the alt when the Timings array has an undefined value', () => {
      expect(formatTimingsEvent({ Timings: [ undefined ] }).alt).toBeNull();
    });

    it('should return null for the alt when there is no timing with ALT as the metricType', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'test'
          }
        ]
      }).alt).toBeNull();
    });

    it('should return the alt from the Timings object', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'ALT',
            value: 13.2
          }
        ]
      }).alt).toBe(13.2);
    });
  });

  describe('componentTimings', () => {
    it('should return null for the componentTimings when the Timings property is null', () => {
      expect(formatTimingsEvent({ Timings: null }).componentTimings).toBeNull();
    });

    it('should return null for the componentTimings when the Timings property is undefined', () => {
      expect(formatTimingsEvent({ Timings: undefined }).componentTimings).toBeNull();
    });

    it('should return null for the componentTimings when the Timings property is not an array', () => {
      expect(formatTimingsEvent({ Timings: 1 }).componentTimings).toBeNull();
    });

    it('should return null for the componentTimings when the Timings array is empty', () => {
      expect(formatTimingsEvent({ Timings: [] }).componentTimings).toBeNull();
    });

    it('should return null for the componentTimings when the Timings array has a null value', () => {
      expect(formatTimingsEvent({ Timings: [ null ] }).componentTimings).toBeNull();
    });

    it('should return null for the componentTimings when the Timings array has an undefined value', () => {
      expect(formatTimingsEvent({ Timings: [ undefined ] }).componentTimings).toBeNull();
    });

    it('should return null for the componentTimings when there is no timing with AllComponents as the metricType', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'test'
          }
        ]
      }).componentTimings).toBeNull();
    });

    it('should return null for the componentTimings when the data is null', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: null
          }
        ]
      }).componentTimings).toBeNull();
    });

    it('should return null for the componentTimings when the data cannot be parsed', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: 'Unparseable{{string/asdjfa;;'
          }
        ]
      }).componentTimings).toBeNull();
      expect(warnSpy).toHaveBeenCalledWith('The data provided by Mezzurite could not be parsed.');
    });

    it('should return null for the componentTimings when the data is valid JSON but in the wrong format', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: `{ "improper": true }`
          }
        ]
      }).componentTimings).toBeNull();
    });

    it('should return an empty array for the componentTimings when the data is an empty array', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: `[]`
          }
        ]
      }).componentTimings).toMatchObject([]);
    });

    it('should ignore any entries for the componentTimings without a name and clt', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: `[ null, { "name": null, "clt": 10.2 }, { "name": "componentName", "clt": null } ]`
          }
        ]
      }).componentTimings).toMatchObject([]);
    });

    it('should properly map and sort the componentTimings', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: `[ { "name": "componentName", "clt": 10.2 }, { "name": "componentName", "clt": 11.2 } ]`
          }
        ]
      }).componentTimings).toMatchObject([
        {
          componentName: 'componentName',
          componentLoadTime: 11.2
        },
        {
          componentName: 'componentName',
          componentLoadTime: 10.2
        }
      ]);
    });
  });

  describe('framework', () => {
    it('should return an empty framework when the Framework property is null', () => {
      expect(formatTimingsEvent({ Framework: null }).framework).toMatchObject({
        name: null,
        version: null
      });
    });

    it('should return an empty framework when the Framework property is undefined', () => {
      expect(formatTimingsEvent({ Framework: undefined }).framework).toMatchObject({
        name: null,
        version: null
      });
    });

    it('should return an empty framework when the Framework object is empty', () => {
      expect(formatTimingsEvent({ Framework: {} }).framework).toMatchObject({
        name: null,
        version: null
      });
    });

    it('should return the framework name and version', () => {
      expect(formatTimingsEvent({ Framework: { name: 'name', version: 'version' } }).framework).toMatchObject({
        name: 'name',
        version: 'version'
      });
    });
  });
});
