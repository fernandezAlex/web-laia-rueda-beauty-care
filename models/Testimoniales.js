import Sequelize from "sequelize";
import db from "../config/db.js";

export const Testimonial = db.define("testimonios", {
  nombre: {
    type: Sequelize.STRING,
  },
  correo: {
    type: Sequelize.STRING,
  },
  mensaje: {
    type: Sequelize.STRING,
  },
  img: {
    type: Sequelize.STRING,
  },
  stars: {
    type: Sequelize.STRING,
  },
  service: {
    type: Sequelize.STRING,
  },
});
