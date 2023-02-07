import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";

// Use the local variables environtment, set in a file .env, if environtmen is not production
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 4000;

// Conect data base
db.authenticate()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.log("%cindex.js line:20 error", "color: #007acc;", error);
  });

// set live reload in browser
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());

// set PUG template engine
app.set("view engine", "pug");

// Get current yaer
app.use((req, res, next) => {
  const year = new Date();
  res.locals.currentYear = year.getFullYear();
  res.locals.siteName = "Laia Rueda";
  next();
});

// add body parse to get the body data in the request of the post form action
app.use(express.urlencoded({ extended: true }));

// define public folder to static files
app.use(express.static("public"));

// add router
app.use("/", router);

app.listen(PORT, () => {
  console.log(`el servidor esta funcionando en el puerto ${PORT}`);
});
