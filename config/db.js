import Sequelize from "sequelize";
import dotenv from "dotenv/config";

// Determinar si estamos en producción o desarrollo
const isProduction = process.env.NODE_ENV === "production";

// Configuración de la base de datos según el entorno
const dbConfig = {
	host: isProduction ? process.env.DB_HOST : process.env.DB_HOST_DEV,
	port: isProduction ? process.env.DB_PORT : process.env.DB_PORT_DEV,
	database: isProduction ? process.env.DB_NAME : process.env.DB_NAME_DEV,
	username: isProduction ? process.env.DB_USER : process.env.DB_USER_DEV,
	password: isProduction ? process.env.DB_PASS : process.env.DB_PASS_DEV,
};

// Mensaje de conexión para verificar a qué base de datos te estás conectando
console.log(
	`Conectando a la base de datos en el host: ${dbConfig.host}, puerto: ${dbConfig.port}, ${dbConfig.database}`
);

// Crear la instancia de Sequelize con la configuración adecuada
const db = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		port: dbConfig.port,
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
