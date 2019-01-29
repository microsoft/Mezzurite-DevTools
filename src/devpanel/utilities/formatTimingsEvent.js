function formatTimingsEvent (event) {
  if (event == null) {
    return null;
  }

  let applicationLoadTime = null;
  let insideViewportComponents = null;
  let outsideViewportComponents = null;
  let viewportLoadTime = null;

  if (event.Timings != null && Array.isArray(event.Timings)) {
    let findApplicationLoadTime = null;
    let findInsideViewportComponents = null;
    let findOutsideViewportComponents = null;

    event.Timings.forEach((timing) => {
      if (timing != null) {
        if (timing.metricType === 'ALT') {
          findApplicationLoadTime = timing;
        } else if (timing.metricType === 'AllComponents') {
          findOutsideViewportComponents = timing;
        } else if (timing.metricType === 'VLT') {
          findInsideViewportComponents = timing;
        }
      }
    });

    if (findApplicationLoadTime != null) {
      applicationLoadTime = findApplicationLoadTime.value;
    }

    if (findInsideViewportComponents != null) {
      if (findInsideViewportComponents.value != null) {
        viewportLoadTime = findInsideViewportComponents.value;
      }

      if (findInsideViewportComponents.data != null) {
        insideViewportComponents = formatAsComponentArray(findInsideViewportComponents.data);
      }
    }

    if (findOutsideViewportComponents != null && findOutsideViewportComponents.data != null) {
      const formattedOutsideViewportComponents = formatAsComponentArray(findOutsideViewportComponents.data);

      if (formattedOutsideViewportComponents != null) {
        outsideViewportComponents = formattedOutsideViewportComponents;

        if (insideViewportComponents != null) {
          outsideViewportComponents = outsideViewportComponents.filter((component) => {
            return !insideViewportComponents.some((viewportComponent) => {
              return (viewportComponent.componentName === component.componentName && viewportComponent.componentLoadTime === component.componentLoadTime);
            });
          });
        }
      }
    }
  }

  const framework = {
    name: null,
    version: null
  };

  if (event.Framework != null) {
    if (event.Framework.name != null) {
      framework.name = event.Framework.name;
    }

    if (event.Framework.version != null) {
      framework.version = event.Framework.version;
    }
  }

  let routeUrl = null;

  if (event.RouteUrl != null && event.RouteUrl !== '/') {
    routeUrl = event.RouteUrl;
  }

  const time = new Date().toLocaleTimeString();

  return {
    applicationLoadTime,
    framework,
    insideViewportComponents,
    outsideViewportComponents,
    routeUrl,
    time,
    viewportLoadTime
  };
}

function formatAsComponentArray (dataString) {
  let componentsArray = null;

  try {
    componentsArray = JSON.parse(dataString);
  } catch (e) {
    console.warn('The data provided by Mezzurite could not be parsed.');
  }

  if (Array.isArray(componentsArray)) {
    componentsArray = componentsArray
      .filter((component) => {
        return component != null && component.name != null && component.clt != null;
      })
      .map((component) => ({
        componentName: component.name,
        componentLoadTime: component.clt
      }))
      .sort((firstComponent, secondComponent) => secondComponent.componentLoadTime - firstComponent.componentLoadTime);
  } else {
    componentsArray = null;
  }

  return componentsArray;
}

export default formatTimingsEvent;
