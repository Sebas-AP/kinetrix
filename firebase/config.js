const admin = require('firebase-admin');

// Importante: Descargar el archivo JSON de la clave de servicio desde la consola de Firebase
// (Configuración del proyecto -> Cuentas de servicio) y guardarlo en la raíz.
const serviceAccount = require('../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
