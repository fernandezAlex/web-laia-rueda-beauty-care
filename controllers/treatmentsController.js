import content from "../constants/content.js";
import path from "path";
import { Treatment } from "../models/Treatments.js";
import { slugGenerator } from "../helpers/helpers.js";

export const treatmentController = async (req, res) => {
  // Asegúrate de que la imagen haya sido cargada
  if (!req.file) {
    return res.status(400).send({ message: "No image uploaded" });
  }

  // Guarda la ruta del archivo en la base de datos
  const imagePath = path.join(
    "/img/tratamientos",
    path.basename(req.file.path)
  );

  // Resto del código de tu controlador
  const {
    nombre,
    precio,
    descripcion,
    slug,
    beneficios,
    cuidados,
    efectos,
    preguntas,
    duracion,
  } = req.body;
  const errores = [];

  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre esta vacio" });
  }

  if (precio.trim() === "") {
    errores.push({ mensaje: "El correo esta vacio" });
  }

  if (descripcion.trim() === "") {
    errores.push({ mensaje: "El mensaje esta vacio" });
  }

  if (errores.length > 0) {
    // Check if there are some testimonial in the data base to render
    const testimoniales = await Testimonial.findAll();

    // show the view of testimonials with errors
    res.render("adminTratamientos", {
      content: content.admin,
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales,
    });
  } else {
    // Store in the data base
    try {
      await Treatment.create({
        nombre,
        precio,
        descripcion,
        imagen: imagePath, // Guarda la ruta de la imagen en la base de datos
        slug: slugGenerator(nombre),
        beneficios,
        cuidados,
        efectos,
        preguntas,
        duracion,
      });
      res.redirect("/servicios-administrador");
    } catch (error) {
      console.log(
        "%cerror testimonialController.js line:40 ",
        "color: red; display: block; width: 100%;",
        error
      );
    }
  }
};
