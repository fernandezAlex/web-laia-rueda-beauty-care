import express from "express";
import { upload } from "../multerConfig.js"; // Importa la instancia de Multer desde multerConfig.js
import {
  aboutUsPage,
  homePage,
  reviewsPage,
  treatmentsPage,
  treatmentPageDetails,
  contactPage,
  adminTratamientos,
} from "../controllers/pagesController.js";
import { storeTestimonial } from "../controllers/testimonialController.js";
import { storeContacts } from "../controllers/storeContacts.js";
import { treatmentController } from "../controllers/treatmentsController.js";
// Importa la instancia de Multer

const router = express.Router();

router.get("/", homePage);

router.get("/sobre-mi", aboutUsPage);

router.get("/servicios", treatmentsPage);
router.get("/servicios/:servicio", treatmentPageDetails);

router.get("/testimonios", reviewsPage);
router.post("/testimonios", storeTestimonial);

router.get("/contacto", contactPage);
router.post("/contacto", storeContacts);

router.get("/servicios-administrador", adminTratamientos);
router.post(
  "/servicios-administrador",
  upload.single("imagen"),
  treatmentController
);

export default router;
