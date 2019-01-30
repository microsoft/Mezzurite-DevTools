import sendEventViaDocument from './sendEventViaDocument.js';

function sendSimpleMessage(action) {
    const event = new CustomEvent(action);
    sendEventViaDocument(event);
}

export default sendSimpleMessage;
