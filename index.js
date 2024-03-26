import express from "express";
import { upload } from "./multerConfig.js"; // Importa la instancia de Multer desde multerConfig.js
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

// Use the local variables environment, set in a file .env, if environment is not production
if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}
const app = express();
const PORT = process.env.PORT || 4000;
console.log(process.env.PORT);

// Create __dirname variable
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect data base
db.authenticate()
	.then(() => {
		console.log("Base de datos conectada");
	})
	.catch((error) => {
		console.log("%cindex.js line:20 error", "color: #007acc;", error);
	});

// Set live reload in browser
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh("/");
	}, 100);
});

app.use(connectLiveReload());

// Set PUG template engine
app.set("view engine", "pug");

// Get current year
app.use((req, res, next) => {
	const year = new Date();
	res.locals.currentYear = year.getFullYear();
	res.locals.siteName = "Laia Rueda";
	next();
});

// Add body parse to get the body data in the request of the post form action
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define public folder to static files
app.use(express.static("public"));

// Add router
// app.use("/", router);
app.use("/", "error");

app.listen(PORT, () => {
	console.log(`el servidor esta funcionando en el puerto ${PORT}`);
});
