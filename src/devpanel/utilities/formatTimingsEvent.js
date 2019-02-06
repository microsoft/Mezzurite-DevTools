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
    let findAllComponents = null;

    event.Timings.forEach((timing) => {
      if (timing != null) {
        if (timing.metricType === 'ALT') {
          findApplicationLoadTime = timing;
        } else if (timing.metricType === 'AllComponents') {
          findAllComponents = timing;
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

    if (findAllComponents != null && findAllComponents.data != null) {
      const formattedOutsideViewportComponents = formatAsComponentArray(findAllComponents.data);

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

  const dimensions = {
    height: null,
    width: null
  };

  if (
    event.ViewportHeight != null &&
    !isNaN(event.ViewportHeight) &&
    event.ViewportWidth != null &&
    !isNaN(event.ViewportWidth)
  ) {
    dimensions.height = parseFloat(event.ViewportHeight.toFixed(1));
    dimensions.width = parseFloat(event.ViewportWidth.toFixed(1));
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
    dimensions,
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
  } catch {
    console.warn('The data provided by Mezzurite could not be parsed.');
  }

  if (Array.isArray(componentsArray)) {
    componentsArray = componentsArray
      .reduce((accumulator, component) => {
        if (component != null && component.name != null && component.clt != null) {
          accumulator.push({
            componentName: component.name,
            componentLoadTime: component.clt
          });
        }

        return accumulator;
      }, [])
      .sort((firstComponent, secondComponent) => secondComponent.componentLoadTime - firstComponent.componentLoadTime);
  } else {
    componentsArray = null;
  }

  return componentsArray;
}

export default formatTimingsEvent;
