require("dotenv").config();

module.exports = {
	development: {
		client: "mysql2",
		connection: {
			host: "127.0.0.1",
			user: "root",
			password: "root",
			database: "ocitanda",
		},
		migrations: {
			directory: "./db/migrations",
		},
		seeds: {
			directory: "./db/seeds",
		},
	},
	production: {
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
		},
		migrations: {
			directory: "./db/migrations",
		},
		seeds: {
			directory: "./db/seeds",
		},
	},
};
