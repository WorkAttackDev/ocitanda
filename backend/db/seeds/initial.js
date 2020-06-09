// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const orderedTables = require('../../src/constants/orderedTables');
const tableNames = require('../../src/constants/tableNames');

//	dummy

const products = require('../../src/dummy/products');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
	await orderedTables.reduce(async (promise, tableName) => {
		await promise;
		return knex(tableName).del();
	}, Promise.resolve());

	const password = crypto.randomBytes(15).toString('hex');

	const provinces = [
		'Luanda',
		'Cabinda',
		'Cunene',
		'Malanje',
		'Zaire',
		'Moxico',
		'Huambo',
		'Benguela',
		'Uíge',
		'Kuando Kubango',
		'Lunda Norte',
		'Lunda Sul',
		'Kwanza Norte',
		'Kwanza Sul',
		'Bié',
		'Lubango',
	].map((name) => ({ name }));

	const categories = ['Legumes', 'Frutas', 'Peixes'].map((name) => ({
		name,
	}));

	const user = [
		{
			email: 'denilson2770@gmail.com',
			name: 'Denilson Costa',
			password: await bcrypt.hash(password, 12),
			phone: '997267270',
			image_url: 'https://wwfjdkfjksdjflk.com/fkdsfk',
		},
		{
			email: 'loremFarm@gmail.com',
			name: 'Farm roll',
			password: await bcrypt.hash(password, 12),
			phone: '993228333',
			image_url: 'https://wwfjdkfjksdjflk.com/fkdsfk',
		},
	];

	const address = {
		location: 'Gamek, Vila',
		province_id: 1,
		user_id: 1,
	};

	const costumer = {
		birth_date: new Date(),
		user_id: 1,
	};

	const producer = {
		owner: 'The company owner',
		user_id: 2,
	};

	const purchase = {
		purchase_date: new Date(),
		quantity: 4,
		consumer_id: 1,
		product_id: 1,
	};

	const cartItems = [
		{
			count: 4,
			consumer_id: 1,
			product_id: 3,
		},
		{
			count: 4,
			consumer_id: 1,
			product_id: 4,
		},
		{
			count: 4,
			consumer_id: 1,
			product_id: 5,
		},
		{
			count: 4,
			consumer_id: 1,
			product_id: 6,
		},
		{
			count: 4,
			consumer_id: 1,
			product_id: 8,
		},
	];

	console.log('user created ', password);

	await knex(tableNames.user).insert(user);
	await knex(tableNames.province).insert(provinces);
	await knex(tableNames.category).insert(categories);
	await knex(tableNames.address).insert(address);
	await knex(tableNames.consumer).insert(costumer);
	await knex(tableNames.producer).insert(producer);
	await knex(tableNames.product).insert(products);
	await knex(tableNames.purchase).insert(purchase);
	await knex(tableNames.cart_item).insert(cartItems);
};
