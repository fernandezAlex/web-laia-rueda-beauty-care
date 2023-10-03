import Sequelize from "sequelize";
import db from "../config/db.js";

export const Treatment = db.define("tratamientos", {
  idtratamientos: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  nombre: {
    type: Sequelize.STRING,
  },
  precio: {
    type: Sequelize.INTEGER,
  },
  descripcion: {
    type: Sequelize.STRING,
  },
  imagen: {
    type: Sequelize.STRING,
    // type: Sequelize.BLOB,
  },
  slug: {
    type: Sequelize.STRING,
  },
  beneficios: {
    type: Sequelize.JSON,
  },
  cuidados: {
    type: Sequelize.JSON,
  },
  efectos: {
    type: Sequelize.STRING,
  },
  preguntas: {
    type: Sequelize.JSON,
  },
  duracion: {
    type: Sequelize.STRING,
  },
});
