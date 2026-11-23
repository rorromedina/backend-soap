class UsuarioTO {
  constructor(usuarioDoc) {
    this.username = usuarioDoc.username;
    this.nombre = usuarioDoc.nombre;
    this.rol = usuarioDoc.rol;
  }
}

class TerritorioTO {
  constructor(territorioDoc) {
    this.id = territorioDoc._id.toString();
    this.region = territorioDoc.region;
    this.provincia = territorioDoc.provincia;
    this.comuna = territorioDoc.comuna;
  }
}

class EncomiendaTO {
  constructor(encDoc) {
    this.codigoSeguimiento = encDoc.codigoSeguimiento;
    this.clienteUsername = encDoc.clienteUsername;
    this.comunaOrigen = encDoc.comunaOrigen;
    this.comunaDestino = encDoc.comunaDestino;
    this.descripcion = encDoc.descripcion;
    this.estado = encDoc.estado;
  }
}

module.exports = { UsuarioTO, TerritorioTO, EncomiendaTO };