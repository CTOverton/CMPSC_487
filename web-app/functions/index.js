const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.https.onCall((userRecord, customClaims) => {
    return admin.auth().createUser(userRecord)
        .then(userRecord => {
            if (customClaims) {
                admin.auth().setCustomUserClaims(userRecord.uid, customClaims)
                    .then(() => {
                        return {
                            message: `Successfully created new user: ${userRecord.uid}, with claims ${customClaims}`
                        }
                    })
                    .catch(err => {
                        return err
                    })
            }
            return {
                message: `Successfully created new user: ${userRecord.uid}`
            }
        })
        .catch(err => {
            return err;
        })
});

exports.updateRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        if (data.role === 'admin') {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            })
        } else {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: null
            })
        }

    }).then(() => {
        return {
            message: `Success! ${data.email} is a ${data.role}`
        }
    }).catch(err => {
        return err;
    })
});

exports.setCustomClaims = functions.https.onCall((uid, claims) => {

    return {
        message: `Idk what is happening`,
        claimsVar: claims,
        working: {admin: true}
    }

  /*  return admin.auth().setCustomUserClaims(uid, {admin: true})
        .then(() => {
            return {
                message: `Successfully added claims to user: ${uid}`
            }
        })
        .catch(err => {
            return err
    })*/
});


exports.deleteUser = functions.https.onCall((uid) => {
    return admin.auth().deleteUser(uid)
        .then(() => {
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
