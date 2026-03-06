const admin = require('firebase-admin');

// Obtenemos las credenciales. Primero intenta leer si hay un JSON parseable en variable de entorno.
// Si no, recurre al archivo (usando la ruta en FIREBASE_KEY_PATH si existe, o la por defecto local)
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  const keyPath = process.env.FIREBASE_KEY_PATH || '../firebase-service-account.json';
  serviceAccount = require(keyPath);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
