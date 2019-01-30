import sendEventViaDocument from './sendEventViaDocument';

function forwardTimingEvent (timingEvent) {
  const eventToContentScript = new CustomEvent('MezzuriteTiming_toExtension', {
    detail: timingEvent.detail
  });

  sendEventViaDocument(eventToContentScript);
}

export default forwardTimingEvent;
