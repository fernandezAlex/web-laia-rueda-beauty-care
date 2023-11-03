import content from "../constants/content.js";
import { Contacto } from "../models/Contacto.js";
import nodemailer from "nodemailer";
import { Treatment } from "../models/Treatments.js";
import dotenv from "dotenv/config";

export const storeContacts = async (req, res) => {
  //   validation data
  const { nombre, apellidos, correo, telefono, servicio, mensaje } = req.body;
  const errores = [];

  //Generate content of Email
  const contentEmail = `<h1>Nueva petición de un usuario,</h1>
    <h3>Un usuario ha enviado una solicitud de contacto a través de la página web.</h3>
    <ul>
      <li><strong>Nombre:</strong> ${nombre}</li>
      <li><strong>Apellidos:</strong> ${apellidos}</li>
      <li><strong>Correo:</strong> ${correo}</li> 
      <li><strong>Teléfono:</strong> ${telefono}</li> 
      <li><strong>Servicio:</strong> ${servicio}</li> 
      <li><strong>Mensaje:</strong></br></br></br><span style="white-space: pre-line;">${mensaje}<span></br></br></br></li> 

    </ul >
  `;

  const mailList = process.env.EMAIL_LIST;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.EMAIL_TLS,
      ciphers: "SSLv3",
    },
  });

  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre esta vacio" });
  }

  if (apellidos.trim() === "") {
    errores.push({ mensaje: "Los apellidos estan vacios" });
  }

  if (telefono.trim() === "") {
    errores.push({ mensaje: "El correo esta vacio" });
  }

  if (servicio.trim() === "") {
    errores.push({ mensaje: "El telefono esta vacio" });
  }

  if (correo.trim() === "") {
    errores.push({ mensaje: "No has elegido un servicio" });
  }

  if (mensaje.trim() === "") {
    errores.push({ mensaje: "El mensaje esta vacio" });
  }

  if (errores.length > 0) {
    // Check if there are some contact in the data base to render
    const contactos = await Contacto.findAll();

    // show the view of testimonials with errors
    res.render("contact", {
      content: content.contactos,
      errores,
      nombre,
      apellidos,
      telefono,
      servicio,
      correo,
      mensaje,
      contactos,
    });
  } else {
    // Store in the data base
    try {
      const info = await transporter.sendMail({
        from: "'Laia Beauty Care' <info@laiabeautycare.com>",
        to: mailList,
        subject: "Nueva solicitud de información en la web Laia Beauty care",
        html: contentEmail,
      });

      // console.log("Message sent", info.messageId);

      await Contacto.create({
        nombre,
        apellidos,
        telefono,
        servicio,
        correo,
        mensaje,
      });

      const treatments = await Treatment.findAll();
      res.render("contact", {
        content: content.contacto,
        treatments,
        success:
          "Tu solicitud de información ha sido enviada correctamente, en un plazo 48 horas me pondré en contacto contigo.",
      });
    } catch (error) {
      console.log(
        "%cerror Contract controller.js line:40 ",
        "color: red; display: block; width: 100%;",
        error
      );
    }
  }
};
