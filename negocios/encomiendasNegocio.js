const { Usuario, Territorio, Encomienda } = require('../conexion/models');
const { UsuarioTO, TerritorioTO, EncomiendaTO } = require('../to/transferObjects');

class EncomiendasNegocio {
  validarClaveVPN(claveVpn) {
    if (!claveVpn || claveVpn !== process.env.VPN_SECRET_KEY) {
      throw new Error('Acceso denegado: Clave VPN inválida o ausente.');
    }
  }

  // --- SEGURIDAD (DOBLE CLAVE) ---
  async autenticar(claveVpn, username, password) {
    this.validarClaveVPN(claveVpn);
    const user = await Usuario.findOne({ username, password });
    if (!user) {
      throw new Error('Credenciales de usuario incorrectas.');
    }
    return new UsuarioTO(user);
  }

  // --- MANTENEDOR REGIÓN / PROVINCIA / COMUNA ---
  async agregarTerritorio(claveVpn, region, provincia, comuna) {
    this.validarClaveVPN(claveVpn);
    const nuevo = await Territorio.create({ region, provincia, comuna });
    return new TerritorioTO(nuevo);
  }

  async listarTerritorios(claveVpn) {
    this.validarClaveVPN(claveVpn);
    const lista = await Territorio.find();
    return lista.map((t) => new TerritorioTO(t));
  }

  async eliminarTerritorio(claveVpn, id) {
    this.validarClaveVPN(claveVpn);
    await Territorio.findByIdAndDelete(id);
    return true;
  }

  // --- ENCOMIENDAS (CLIENTE Y ADMIN) ---
  async crearEncomienda(claveVpn, clienteUsername, comunaOrigen, comunaDestino, descripcion) {
    this.validarClaveVPN(claveVpn);
    const codigoSeguimiento = 'ENC-' + Math.floor(100000 + Math.random() * 900000);
    const enc = await Encomienda.create({
      codigoSeguimiento,
      clienteUsername,
      comunaOrigen,
      comunaDestino,
      descripcion
    });
    return new EncomiendaTO(enc);
  }

  async listarEncomiendas(claveVpn) {
    this.validarClaveVPN(claveVpn);
    const lista = await Encomienda.find();
    return lista.map((e) => new EncomiendaTO(e));
  }

  async actualizarEstadoEncomienda(claveVpn, codigoSeguimiento, nuevoEstado) {
    this.validarClaveVPN(claveVpn);
    const enc = await Encomienda.findOneAndUpdate(
      { codigoSeguimiento },
      { estado: nuevoEstado },
      { new: true }
    );
    if (!enc) throw new Error('Encomienda no encontrada.');
    return new EncomiendaTO(enc);
  }
}

module.exports = new EncomiendasNegocio();