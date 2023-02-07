import express from "express";
import {
  aboutUsPage,
  homePage,
  reviewsPage,
  treatmentsPage,
  treatmentPageDetails,
} from "../controllers/pagesController.js";
import { storeTestimonial } from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/", homePage);

router.get("/nosotros", aboutUsPage);

router.get("/tratamientos", treatmentsPage);
router.get("/tratamientos/:tratamiento", treatmentPageDetails);

router.get("/testimonios", reviewsPage);
router.post("/testimonios", storeTestimonial);

export default router;
