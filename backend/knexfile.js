// Update with your config settings.

module.exports = {
	development: {
		client: 'mysql2',
		connection: {
			host: '127.0.0.1',
			user: 'root',
			password: 'root',
			database: 'ocitanda',
		},
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},
	production: {
		client: 'mysql2',
		connection: {
			host: '127.0.0.1',
			user: 'ocitanda_denilson',
			password: 'OC2020#2020',
			database: 'ocitanda_e-commerce',
		},
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},
};
