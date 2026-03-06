const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { db } = require('./firebase/config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Referencia a la colección específica de Firebase
const sesionesRef = db.collection('Usuarios').doc('LrTQC8nHgDvM3sOCYtMI').collection('sesiones');

app.get('/', (req, res) => {
  res.send(
    '<h1>API Kinetrix - Rehabilitación</h1>' +
    '<ul>' +
    '<li><b>GET /sesiones</b></li>' +
    '<li><b>GET /sesion</b></li>' +
    '<li><b>POST /insertar</b> => {duracion, ejercicio, repeticiones, angulo_maximo, ritmo_cardiaco, fuerza_aplicada}</li>' +
    '</ul>'
  );
});

// ======================================
// Obtener todas las sesiones
// ======================================
app.get('/sesiones', async (req, res) => {
    try {
        const snapshot = await sesionesRef.orderBy('fecha', 'asc').get();
        let datos = [];
        snapshot.forEach(doc => {
            datos.push({
                id: doc.id,
                ...doc.data()
            });
        });
        res.send(datos);
    } catch (error) {
        console.error('Error obteniendo sesiones:', error);
        res.status(500).send("Error obteniendo sesiones");
    }
});

// ======================================
// Obtener la última sesión
// ======================================
app.get('/sesion', async (req, res) => {
    try {
        const snapshot = await sesionesRef.orderBy('fecha', 'desc').limit(1).get();
        let datos = [];
        snapshot.forEach(doc => {
            datos.push({
                id: doc.id,
                ...doc.data()
            });
        });
        res.send(datos);
    } catch (error) {
        console.error('Error obteniendo sesión:', error);
        res.status(500).send("Error obteniendo sesión");
    }
});

// ======================================
// Insertar nueva sesión
// ======================================
app.post('/insertar', async (req, res) => {
    try {
        const nuevaSesion = {
            duracion: req.body.duracion,
            ejercicio: req.body.ejercicio,
            repeticiones: req.body.repeticiones,
            angulo_maximo: req.body.angulo_maximo,
            ritmo_cardiaco: req.body.ritmo_cardiaco,
            fuerza_aplicada: req.body.fuerza_aplicada,
            fecha: new Date()
        };

        const docRef = await sesionesRef.add(nuevaSesion);
        
        res.send({
            id: docRef.id,
            ...nuevaSesion,
            status: "Sesion guardada"
        });
    } catch (error) {
        console.error('Error insertando datos:', error);
        res.status(500).send("Error insertando datos");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
