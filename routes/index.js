import express from "express";
import {
  aboutUsPage,
  homePage,
  reviewsPage,
  treatmentsPage,
  treatmentPageDetails,
  contactPage,
} from "../controllers/pagesController.js";
import { storeTestimonial } from "../controllers/testimonialController.js";
import { storeContacts } from "../controllers/storeContacts.js";

const router = express.Router();

router.get("/", homePage);

router.get("/sobre-mi", aboutUsPage);

router.get("/tratamientos", treatmentsPage);
router.get("/tratamientos/:tratamiento", treatmentPageDetails);

router.get("/testimonios", reviewsPage);
router.post("/testimonios", storeTestimonial);

router.get("/contacto", contactPage);
router.post("/contacto", storeContacts);

export default router;
