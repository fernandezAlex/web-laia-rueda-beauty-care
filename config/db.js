import Sequelize from "sequelize";
import dotenv from "dotenv/config";

console.log(
	`Conectando a la base de datos en el host: ${process.env.DB_HOST}, puerto: ${process.env.DB_PORT}, ${process.env.DB_NAME} con usuario: ${process.env.DB_USER}`
);

const db = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
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
	}
);

// Autenticar la base de datos
db.authenticate()
	.then(() => console.log("Conexión exitosa a la base de datos"))
	.catch((error) =>
		console.error("Error al conectar a la base de datos:", error)
	);

export default db;
