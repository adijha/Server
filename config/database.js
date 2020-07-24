const admin = require('firebase-admin')
const serviceAccount = require('./ServiceAccountKey.json')

 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://taar-backend.firebaseio.com"
  });


let db = admin.firestore()

module.exports = db
