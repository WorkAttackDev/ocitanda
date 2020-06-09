import Product from "./models/Product";
import Cart from "./models/Cart";

// export const api = "https://www.ocitanda.com/api";
// export const serverImages = "https://www.ocitanda.com/images";
export const api = "http://localhost:5050/api";
export const serverImages = "http://localhost:5050/images";

export const fetchProducts = async () => {
	let res = await fetch(api + "/products");
	let data = await res.json();
	return data.map(({ name, id, quantity, price, image_url, description }) =>
		Product(
			id,
			name,
			description,
			price,
			"Ocitanda",
			serverImages + image_url
		)
	);
};

export const fetchProductById = async (id) => {
	const res = await fetch(api + "/products/" + id);
	const data = await res.json();

	const product = Product(
		data.id,
		data.name,
		data.description,
		data.price,
		"Ocitanda",
		serverImages + data.image_url
	);

	return product;
};

export const fetchUserCartItems = async (userId) => {
	let res = await fetch(api + "/carts/" + userId);
	let data = await res.json();
	return data.map(
		({
			id,
			count,
			consumer_id,
			product_id,
			quantity,
			producer_id,
			price,
			name,
			image_url,
			description,
			category_id,
		}) =>
			Cart(
				id,
				count,
				consumer_id,
				product_id,
				quantity,
				producer_id,
				price,
				name,
				serverImages + image_url,
				description,
				category_id
			)
	);
};

export const fetchCategories = async () => {
	let res = await fetch(api + "/categories");
	let data = await res.json();
	return data.map(({ name }) => name);
};
