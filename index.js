require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const soap = require('soap');
const conectarDB = require('./conexion/db');
const { Usuario } = require('./conexion/models');
const serviceObject = require('./servicios/soapHandlers');

const app = express();
app.use(cors()); // Permite peticiones desde Flutter Web

const wsdlXml = fs.readFileSync(path.join(__dirname, 'servicios', 'encomiendas.wsdl'), 'utf8');
const PORT = process.env.PORT || 3000;

const iniciar = async () => {
  await conectarDB();

  // Crear usuarios iniciales de prueba si no existen
  const existeAdmin = await Usuario.findOne({ username: 'admin' });
  if (!existeAdmin) {
    await Usuario.create([
      { username: 'admin', password: '123', nombre: 'Administrador General', rol: 'ADMIN' },
      { username: 'cliente', password: '123', nombre: 'Juan Pérez', rol: 'CLIENTE' }
    ]);
    console.log('👤 Usuarios de prueba creados (admin/123 y cliente/123)');
  }

const server = app.listen(PORT, () => {
      soap.listen(app, '/wsdl', serviceObject, wsdlXml, () => {
        console.log(`Servidor SOAP corriendo en http://localhost:${PORT}/wsdl?wsdl`);
      });

      const listeners = server.listeners('request').slice(0);
      server.removeAllListeners('request');
      server.on('request', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, SOAPAction');

        if (req.method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
          return;
        }

        for (const listener of listeners) {
          listener.call(server, req, res);
        }
      });
    });
};

iniciar();