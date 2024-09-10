import Sequelize from "sequelize";

console.log(
	`Conectando a la base de datos en el host: ${process.env.DB_HOST}, puerto: ${process.env.DB_PORT}, ${process.env.DB_NAME} con usuario: ${process.env.DB_USER} y password: ${process.env.DB_PASS}, URL: ${process.env.DATABASE_URL}`
);

const db = process.env.DATABASE_URL
	? new Sequelize(process.env.DATABASE_URL)
	: new Sequelize({
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
	  });

// Autenticar la base de datos
db.authenticate()
	.then(() => console.log("Conexión exitosa a la base de datos"))
	.catch((error) =>
		console.error("Error al conectar a la base de datos:", error)
	);

export default db;
