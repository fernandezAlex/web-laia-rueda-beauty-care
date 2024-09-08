import Sequelize from "sequelize";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

// Usa DATABASE_URL si está definida
const dbConfig = process.env.DATABASE_URL || {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	dialect: "mysql",
	define: {
		timestamps: false,
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	operatorAliases: false,
};

const db = new Sequelize(dbConfig);

db.authenticate()
	.then(() => {
		console.log("Conexión a la base de datos exitosa");
	})
	.catch((error) => {
		console.error("Error al conectar a la base de datos:", error);
	});

export default db;
