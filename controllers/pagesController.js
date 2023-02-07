import content from "../constants/content.js";
import { Treatment } from "../models/Treatments.js";
import { Testimonial } from "../models/Testimoniales.js";

export const homePage = async (req, res) => {
  // consult 3 treatments in db in the same time with promise
  const promiseDB = [];

  promiseDB.push(Treatment.findAll({ limit: 3 }));
  promiseDB.push(Testimonial.findAll({ limit: 3 }));

  try {
    const result = await Promise.all(promiseDB);
    res.render("inicio", {
      content: content.inicio,
      clase: "home",
      treatments: result[0],
      testimoniales: result[1],
    });
  } catch (error) {
    console.log(
      "%cerror pagesController.js line:14 ",
      "color: red; display: block; width: 100%;",
      error
    );
  }
};

export const aboutUsPage = (req, res) => {
  res.render("nosotros", {
    content: content.nosotros,
  });
};

export const treatmentsPage = async (req, res) => {
  // consult database
  const treatments = await Treatment.findAll();
  res.render("tratamientos", {
    content: content.tratamientos,
    treatments,
  });
};

// Show a treatment by the slugs
export const treatmentPageDetails = async (req, res) => {
  const { tratamiento } = req.params;
  try {
    const result = await Treatment.findOne({ where: { slug: tratamiento } });

    res.render("tratamiento", {
      content: content.tratamientos,
      result,
    });
  } catch (error) {
    console.log(
      "%cerror pagesController.js line:33 ",
      "color: red; display: block; width: 100%;",
      error
    );
  }
};

export const reviewsPage = async (req, res) => {
  try {
    const testimoniales = await Testimonial.findAll();
    res.render("testimonios", {
      content: content.testimonios,
      testimoniales,
    });
  } catch (error) {
    console.log(
      "%cerror pagesController.js line:51 ",
      "color: red; display: block; width: 100%;",
      error
    );
  }
};
