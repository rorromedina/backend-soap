const negocio = require('../negocios/encomiendasNegocio');

const serviceObject = {
  EncomiendasService: {
    EncomiendasPort: {
      Login: async function (args) {
        try {
          const userTO = await negocio.autenticar(args.claveVpn, args.username, args.password);
          return { exito: true, mensaje: 'Autenticación exitosa', nombre: userTO.nombre, rol: userTO.rol };
        } catch (err) {
          return { exito: false, mensaje: err.message, nombre: '', rol: '' };
        }
      },
      AgregarTerritorio: async function (args) {
        try {
          await negocio.agregarTerritorio(args.claveVpn, args.region, args.provincia, args.comuna);
          return { exito: true, mensaje: 'Comuna registrada correctamente' };
        } catch (err) {
          return { exito: false, mensaje: err.message };
        }
      },
      ListarTerritorios: async function (args) {
        try {
          const lista = await negocio.listarTerritorios(args.claveVpn);
          return { territoriosJson: JSON.stringify(lista) };
        } catch (err) {
          return { territoriosJson: JSON.stringify({ error: err.message }) };
        }
      },
      EliminarTerritorio: async function (args) {
        try {
          await negocio.eliminarTerritorio(args.claveVpn, args.id);
          return { exito: true, mensaje: 'Comuna eliminada' };
        } catch (err) {
          return { exito: false, mensaje: err.message };
        }
      },
      CrearEncomienda: async function (args) {
        try {
          const enc = await negocio.crearEncomienda(args.claveVpn, args.clienteUsername, args.comunaOrigen, args.comunaDestino, args.descripcion);
          return { exito: true, mensaje: 'Encomienda creada', codigoSeguimiento: enc.codigoSeguimiento };
        } catch (err) {
          return { exito: false, mensaje: err.message, codigoSeguimiento: '' };
        }
      },
      ListarEncomiendas: async function (args) {
        try {
          const lista = await negocio.listarEncomiendas(args.claveVpn);
          return { encomiendasJson: JSON.stringify(lista) };
        } catch (err) {
          return { encomiendasJson: JSON.stringify({ error: err.message }) };
        }
      },
      ActualizarEstado: async function (args) {
        try {
          await negocio.actualizarEstadoEncomienda(args.claveVpn, args.codigoSeguimiento, args.nuevoEstado);
          return { exito: true, mensaje: 'Estado actualizado' };
        } catch (err) {
          return { exito: false, mensaje: err.message };
        }
      }
    }
  }
};

module.exports = serviceObject;