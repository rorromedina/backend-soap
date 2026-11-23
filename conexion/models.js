const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  rol: { type: String, enum: ['CLIENTE', 'ADMIN'], default: 'CLIENTE' }
});

const TerritorioSchema = new mongoose.Schema({
  region: { type: String, required: true },
  provincia: { type: String, required: true },
  comuna: { type: String, required: true, unique: true }
});

const EncomiendaSchema = new mongoose.Schema({
  codigoSeguimiento: { type: String, required: true, unique: true },
  clienteUsername: { type: String, required: true },
  comunaOrigen: { type: String, required: true },
  comunaDestino: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { type: String, default: 'INGRESADO' } // INGRESADO, EN_TRANSITO, ENTREGADO
});

module.exports = {
  Usuario: mongoose.model('Usuario', UsuarioSchema),
  Territorio: mongoose.model('Territorio', TerritorioSchema),
  Encomienda: mongoose.model('Encomienda', EncomiendaSchema)
};