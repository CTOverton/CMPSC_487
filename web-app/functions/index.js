const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.https.onCall((data, context) => {
    const {userRecord, claims} = data;
    return admin.auth().createUser(userRecord).then(user => {
            if (claims) {
                admin.auth().setCustomUserClaims(user.uid, claims).then(() => {
                        return {
                            message: `Successfully created new user: ${user.uid}, with claims ${claims}`
                        }
                    })
                    .catch(err => {
                        return err
                    })
            }
            return {
                message: `Successfully created new user: ${user.uid}`
            }
        })
        .catch(err => {
            return err;
        })
});

exports.setCustomClaims = functions.https.onCall((data, context) => {
    const {uid, claims} = data;
    return admin.auth().setCustomUserClaims(uid,claims).then(() => {
            return {
                message: `Success! User ${uid} updated with claims ${JSON.stringify(claims)}`
            }
        })
        .catch(err => {
            return err;
        })
});


exports.deleteUser = functions.https.onCall((data, context) => {
    const {uid} = data;
    return admin.auth().deleteUser(uid).then(() => {
            return {
                message: `Successfully deleted user: ${uid}`
            }
        })
        .catch(err => {
            return err;
        })
});

/*const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});*/

/*

exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const project = doc.data();
    const notification = {
      content: 'Added a new project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);

});

exports.userJoined = functions.auth.user()
  .onCreate(user => {

    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotification(notification);

      });
});
*/
