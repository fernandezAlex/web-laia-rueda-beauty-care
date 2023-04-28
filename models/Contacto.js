import Sequelize from "sequelize";
import db from "../config/db.js";

export const Contacto = db.define("contactos", {
  nombre: {
    type: Sequelize.STRING,
  },
  apellidos: {
    type: Sequelize.STRING,
  },
  correo: {
    type: Sequelize.STRING,
  },
  telefono: {
    type: Sequelize.INTEGER,
  },
  servicio: {
    type: Sequelize.STRING,
  },
  correo: {
    type: Sequelize.STRING,
  },
  mensaje: {
    type: Sequelize.STRING,
  },
});
