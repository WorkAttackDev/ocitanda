// Update with your config settings.

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
	},
};
