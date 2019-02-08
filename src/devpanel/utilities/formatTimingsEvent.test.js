import formatTimingsEvent from './formatTimingsEvent';

describe('formatTimingsEvent.js', () => {
  it('should return null when the event is null', () => {
    expect(formatTimingsEvent(null)).toBeNull();
  });

  it('should return null when the event is undefined', () => {
    expect(formatTimingsEvent(undefined)).toBeNull();
  });

  describe('applicationLoadTime', () => {
    it('should return null for the applicationLoadTime when the Timings property is null', () => {
      expect(formatTimingsEvent({ Timings: null }).applicationLoadTime).toBeNull();
    });

    it('should return null for the applicationLoadTime when the Timings property is undefined', () => {
      expect(formatTimingsEvent({ Timings: undefined }).applicationLoadTime).toBeNull();
    });

    it('should return null for the applicationLoadTime when the Timings property is not an array', () => {
      expect(formatTimingsEvent({ Timings: 1 }).applicationLoadTime).toBeNull();
    });

    it('should return null for the applicationLoadTime when the Timings array is empty', () => {
      expect(formatTimingsEvent({ Timings: [] }).applicationLoadTime).toBeNull();
    });

    it('should return null for the applicationLoadTime when the Timings array has a null value', () => {
      expect(formatTimingsEvent({ Timings: [ null ] }).applicationLoadTime).toBeNull();
    });

    it('should return null for the applicationLoadTime when the Timings array has an undefined value', () => {
      expect(formatTimingsEvent({ Timings: [ undefined ] }).applicationLoadTime).toBeNull();
    });

    it('should return null for the applicationLoadTime when there is no timing with ALT as the metricType', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'test'
          }
        ]
      }).applicationLoadTime).toBeNull();
    });

    it('should return the applicationLoadTime from the Timings object', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'ALT',
            value: 13.2
          }
        ]
      }).applicationLoadTime).toBe(13.2);
    });
  });

  describe('dimensions', () => {
    it('should return empty dimensions when only the ViewportHeight property is null', () => {
      expect(formatTimingsEvent({ ViewportHeight: null, ViewportWidth: 1 }).dimensions).toMatchObject({
        height: null,
        width: null
      });
    });

    it('should return empty dimensions when only the ViewportHeight property is undefined', () => {
      expect(formatTimingsEvent({ ViewportHeight: undefined, ViewportWidth: 1 }).dimensions).toMatchObject({
        height: null,
        width: null
      });
    });

    it('should return empty dimensions when only the ViewportWidth property is null', () => {
      expect(formatTimingsEvent({ ViewportHeight: 1, ViewportWidth: null }).dimensions).toMatchObject({
        height: null,
        width: null
      });
    });

    it('should return empty dimensions when only the ViewportWidth property is undefined', () => {
      expect(formatTimingsEvent({ ViewportHeight: 1, ViewportWidth: undefined }).dimensions).toMatchObject({
        height: null,
        width: null
      });
    });

    it('should return empty dimensions when the ViewportHeight is the wrong format', () => {
      expect(formatTimingsEvent({ ViewportHeight: 'test', ViewportWidth: 132 }).dimensions).toMatchObject({
        height: null,
        width: null
      });
    });

    it('should return empty dimensions when the ViewportWidth is the wrong format', () => {
      expect(formatTimingsEvent({ ViewportHeight: 153, ViewportWidth: 'wrong' }).dimensions).toMatchObject({
        height: null,
        width: null
      });
    });

    it('should return the dimensions', () => {
      expect(formatTimingsEvent({ ViewportHeight: 1.41, ViewportWidth: 5.24312 }).dimensions).toMatchObject({
        height: 1.4,
        width: 5.2
      });
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

  describe('insideViewportComponents', () => {
    it('should return null for insideViewportComponents when the Timings property is null', () => {
      expect(formatTimingsEvent({ Timings: null }).insideViewportComponents).toBeNull();
    });

    it('should return null for insideViewportComponents when the Timings property is undefined', () => {
      expect(formatTimingsEvent({ Timings: undefined }).insideViewportComponents).toBeNull();
    });

    it('should return null for insideViewportComponents when the Timings property is not an array', () => {
      expect(formatTimingsEvent({ Timings: 1 }).insideViewportComponents).toBeNull();
    });

    it('should return null for insideViewportComponents when the Timings array is empty', () => {
      expect(formatTimingsEvent({ Timings: [] }).insideViewportComponents).toBeNull();
    });

    it('should return null for insideViewportComponents when the Timings array has a null value', () => {
      expect(formatTimingsEvent({ Timings: [ null ] }).insideViewportComponents).toBeNull();
    });

    it('should return null for insideViewportComponents when the Timings array has an undefined value', () => {
      expect(formatTimingsEvent({ Timings: [ undefined ] }).insideViewportComponents).toBeNull();
    });

    it('should return null for insideViewportComponents when there is no timing with VLT as the metricType', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'test'
          }
        ]
      }).insideViewportComponents).toBeNull();
    });

    it('should return null for insideViewportComponents when the data is null', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'VLT',
            data: null
          }
        ]
      }).insideViewportComponents).toBeNull();
    });

    it('should return null for insideViewportComponents when the data cannot be parsed', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'VLT',
            data: 'Unparseable{{string/asdjfa;;'
          }
        ]
      }).insideViewportComponents).toBeNull();
      expect(warnSpy).toHaveBeenCalledWith('The data provided by Mezzurite could not be parsed.');
    });

    it('should return null for insideViewportComponents when the data is valid JSON but in the wrong format', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'VLT',
            data: `{ "improper": true }`
          }
        ]
      }).insideViewportComponents).toBeNull();
    });

    it('should return an empty array for insideViewportComponents when the data is an empty array', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'VLT',
            data: `[]`
          }
        ]
      }).insideViewportComponents).toMatchObject([]);
    });

    it('should ignore any entries for insideViewportComponents without a name and clt', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'VLT',
            data: `[ null, { "name": null, "clt": 10.2 }, { "name": "componentName", "clt": null } ]`
          }
        ]
      }).insideViewportComponents).toMatchObject([]);
    });

    it('should properly map the insideViewportComponents', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'VLT',
            data: `[ { "name": "componentName", "clt": 10.2 }, { "name": "componentName", "clt": 11.2 } ]`
          }
        ]
      }).insideViewportComponents).toMatchObject([
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

  describe('outsideViewportComponents', () => {
    it('should return null for outsideViewportComponents when the Timings property is null', () => {
      expect(formatTimingsEvent({ Timings: null }).outsideViewportComponents).toBeNull();
    });

    it('should return null for outsideViewportComponents when the Timings property is undefined', () => {
      expect(formatTimingsEvent({ Timings: undefined }).outsideViewportComponents).toBeNull();
    });

    it('should return null for outsideViewportComponents when the Timings property is not an array', () => {
      expect(formatTimingsEvent({ Timings: 1 }).outsideViewportComponents).toBeNull();
    });

    it('should return null for outsideViewportComponents when the Timings array is empty', () => {
      expect(formatTimingsEvent({ Timings: [] }).outsideViewportComponents).toBeNull();
    });

    it('should return null for outsideViewportComponents when the Timings array has a null value', () => {
      expect(formatTimingsEvent({ Timings: [ null ] }).outsideViewportComponents).toBeNull();
    });

    it('should return null for outsideViewportComponents when the Timings array has an undefined value', () => {
      expect(formatTimingsEvent({ Timings: [ undefined ] }).outsideViewportComponents).toBeNull();
    });

    it('should return null for outsideViewportComponents when there is no timing with AllComponents as the metricType', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'test'
          }
        ]
      }).outsideViewportComponents).toBeNull();
    });

    it('should return null for outsideViewportComponents when the data is null', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: null
          }
        ]
      }).outsideViewportComponents).toBeNull();
    });

    it('should return null for outsideViewportComponents when the data cannot be parsed', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: 'Unparseable{{string/asdjfa;;'
          }
        ]
      }).outsideViewportComponents).toBeNull();
      expect(warnSpy).toHaveBeenCalledWith('The data provided by Mezzurite could not be parsed.');
    });

    it('should return null for outsideViewportComponents when the data is valid JSON but in the wrong format', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'outsideViewportComponents',
            data: `{ "improper": true }`
          }
        ]
      }).outsideViewportComponents).toBeNull();
    });

    it('should return an empty array for outsideViewportComponents when the data is an empty array', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: `[]`
          }
        ]
      }).outsideViewportComponents).toMatchObject([]);
    });

    it('should ignore any entries for outsideViewportComponents without a name and clt', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: `[ null, { "name": null, "clt": 10.2 }, { "name": "componentName", "clt": null } ]`
          }
        ]
      }).outsideViewportComponents).toMatchObject([]);
    });

    it('should properly map outsideViewportComponents when there are no insideViewportComponents', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: `[ { "name": "componentName", "clt": 10.2 }, { "name": "componentName", "clt": 11.2 } ]`
          }
        ]
      }).outsideViewportComponents).toMatchObject([
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

    it('should properly map outsideViewportComponents and filter out the insideViewportComponents', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'AllComponents',
            data: `[ { "name": "componentName", "clt": 10.2 }, { "name": "componentName", "clt": 11.2 } ]`
          },
          {
            metricType: 'VLT',
            data: `[ { "name": "componentName", "clt": 11.2 } ]`
          }
        ]
      }).outsideViewportComponents).toMatchObject([
        {
          componentName: 'componentName',
          componentLoadTime: 10.2
        }
      ]);
    });
  });

  describe('routeUrl', () => {
    it('should return null for routeUrl when the RouteUrl property is null', () => {
      expect(formatTimingsEvent({ RouteUrl: null }).routeUrl).toBeNull();
    });

    it('should return null for routeUrl when the RouteUrl property is undefined', () => {
      expect(formatTimingsEvent({ RouteUrl: undefined }).routeUrl).toBeNull();
    });

    it('should return a backslash for routeUrl when the RouteUrl property is just a backslash', () => {
      expect(formatTimingsEvent({ RouteUrl: '/' }).routeUrl).toBe('/');
    });

    it('should return the routeUrl', () => {
      expect(formatTimingsEvent({ RouteUrl: '/home' }).routeUrl).toBe('/home');
    });
  });

  describe('viewportLoadTime', () => {
    it('should return null for viewportLoadTime when the Timings property is null', () => {
      expect(formatTimingsEvent({ Timings: null }).viewportLoadTime).toBeNull();
    });

    it('should return null for viewportLoadTime when the Timings property is undefined', () => {
      expect(formatTimingsEvent({ Timings: undefined }).viewportLoadTime).toBeNull();
    });

    it('should return null for viewportLoadTime when the Timings property is not an array', () => {
      expect(formatTimingsEvent({ Timings: 1 }).viewportLoadTime).toBeNull();
    });

    it('should return null for viewportLoadTime when the Timings array is empty', () => {
      expect(formatTimingsEvent({ Timings: [] }).viewportLoadTime).toBeNull();
    });

    it('should return null for viewportLoadTime when the Timings array has a null value', () => {
      expect(formatTimingsEvent({ Timings: [ null ] }).viewportLoadTime).toBeNull();
    });

    it('should return null for viewportLoadTime when the Timings array has an undefined value', () => {
      expect(formatTimingsEvent({ Timings: [ undefined ] }).viewportLoadTime).toBeNull();
    });

    it('should return null for viewportLoadTime when there is no timing with VLT as the metricType', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'test'
          }
        ]
      }).viewportLoadTime).toBeNull();
    });

    it('should return the viewportLoadTime', () => {
      expect(formatTimingsEvent({
        Timings: [
          {
            metricType: 'VLT',
            value: 14.3
          }
        ]
      }).viewportLoadTime).toBe(14.3);
    });
  });
});
