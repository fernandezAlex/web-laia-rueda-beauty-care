import content from "../constants/content.js";
import { Testimonial } from "../models/Testimoniales.js";

export const storeTestimonial = async (req, res) => {
  //   validation data
  const { nombre, correo, mensaje } = req.body;
  const errores = [];

  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre esta vacio" });
  }

  if (correo.trim() === "") {
    errores.push({ mensaje: "El correo esta vacio" });
  }

  if (mensaje.trim() === "") {
    errores.push({ mensaje: "El mensaje esta vacio" });
  }

  if (errores.length > 0) {
    // Check if there are some testimonial in the data base to render
    const testimoniales = await Testimonial.findAll();

    // show the view of testimonials with errors
    res.render("testimonios", {
      content: content.testimonios,
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales,
    });
  } else {
    // Store in the data base

    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje,
      });
      res.redirect("/testimonios");
    } catch (error) {
      console.log(
        "%cerror testimonialController.js line:40 ",
        "color: red; display: block; width: 100%;",
        error
      );
    }
  }
};
