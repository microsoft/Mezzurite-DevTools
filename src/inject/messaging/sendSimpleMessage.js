import sendEventViaDocument from './sendEventViaDocument';

function sendSimpleMessage (action) {
  const event = new CustomEvent(action);
  sendEventViaDocument(event);
}

export default sendSimpleMessage;
