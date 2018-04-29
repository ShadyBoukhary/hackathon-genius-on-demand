"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.addUserMessages = functions.database.ref(`/messages/{messageId}`)
    .onWrite((change, context) => {
    if (change.before.exists()) {
        return null;
    }
    if (!change.after.exists()) {
        return null;
    }
    const messageKey = change.after.key;
    const messageValue = change.after.val();
    admin.database().ref(`/user-messages/${messageValue.userId}/${messageValue.toUserId}`).child(messageKey).set(1);
    admin.database().ref(`/user-messages/${messageValue.toUserId}/${messageValue.userId}`).child(messageKey).set(1);
});
exports.generateLastMessage = functions.database.ref(`/messages/{messageId}`)
    .onWrite((change, context) => {
    if (change.before.exists()) {
        return null;
    }
    if (!change.after.exists()) {
        return null;
    }
    const messageKey = change.after.key;
    const messageValue = change.after.val();
    admin.database().ref(`/last-messages/${messageValue.userId}/${messageValue.toUserId}`).child('key').set(messageKey);
    admin.database().ref(`/last-messages/${messageValue.toUserId}/${messageValue.userId}`).child('key').set(messageKey);
});
//# sourceMappingURL=index.js.map