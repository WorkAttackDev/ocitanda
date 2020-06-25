import Product from "./models/Product";
import Cart from "./models/Cart";
import axios from "axios";

// export const api = "https://www.ocitanda.com/api/";
export const api = "http://localhost:5050/api/";

const handleError = (err) => {
	if (!err.response) return { error: true, msg: "Network Problem" };
	return {
		msg: err.response.data.message,
		error: true,
		statusCode: err.response.status,
	};
};

export const fetchProducts = async (
	limit = 10,
	page = 1,
	category = "Todos",
	order = 1
) => {
	try {
		let res = await axios.get(api + "products", {
			params: {
				limit,
				page,
				category,
				order,
			},
		});
		return res.data.map(
			({ name, id, quantity, price, image_url, description }) =>
				Product(
					id,
					name,
					description,
					price,
					"Ocitanda",
					api + image_url
				)
		);
	} catch (error) {
		console.log(error, error.response);
		return handleError(error);
	}
};

export const fetchProductById = async (id) => {
	try {
		const res = await axios.get(api + "products/" + id);
		const data = res.data;

		const product = Product(
			data.id,
			data.name,
			data.description,
			data.price,
			"Ocitanda",
			api + data.image_url
		);

		return product;
	} catch (error) {
		return handleError(error);
	}
};

export const fetchUserCartItems = async (userId, authToken) => {
	try {
		let res = await axios.get(api + "carts/" + userId, {
			headers: { Authorization: "Bearer " + authToken },
		});
		let data = res.data;
		return data.map((_d) =>
			Cart(
				_d.id,
				1,
				_d.consumer_id,
				_d.product_id,
				_d.product.quantity,
				_d.product.producer_id,
				_d.product.price,
				_d.product.name,
				api + _d.product.image_url,
				_d.product.description,
				_d.product.category_id
			)
		);
	} catch (error) {
		return handleError(error);
	}
};

export const fetchCategories = async () => {
	try {
		let res = await axios.get(api + "categories");
		let data = res.data;
		return data.map(({ name }) => name);
	} catch (error) {
		return handleError(error);
	}
};

export const getConsumer = async (userId, authToken) => {
	try {
		let res = await axios.get(api + `/consumers/${userId}`, {
			headers: { Authorization: "Bearer " + authToken },
		});
		return res;
	} catch (error) {
		return handleError(error);
	}
};

export const deleteConsumer = async (userId, authToken) => {
	try {
		let res = await axios.delete(api + `consumers/${userId}`, {
			headers: { Authorization: "Bearer " + authToken },
		});
		return res;
	} catch (error) {
		return handleError(error);
	}
};

export const signup = async (user) => {
	console.log(user);

	try {
		let res = await axios.post(api + "auth/signup", {
			...user,
		});
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const updateConsumer = async (consumer) => {
	try {
		let res = await axios.put(api + "auth/update", consumer);
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const signin = async (user) => {
	try {
		let res = await axios.post(api + "auth/login", {
			...user,
		});
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const forgotPassword = async (email) => {
	try {
		let res = await axios.post(api + "forgot-password", {
			email,
		});
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const verifyResetToken = async (token) => {
	try {
		let res = await axios.get(api + "forgot-password", {
			params: {
				token,
			},
		});
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const resetPassword = async (password, token) => {
	try {
		let res = await axios.put(api + "forgot-password", {
			password,
			token,
		});
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const addToCart = async (productId, consumerId, authToken) => {
	console.log(productId, consumerId);
	try {
		let res = await axios.post(
			api + "carts",
			{
				productId,
				consumerId,
			},
			{ headers: { Authorization: "Bearer " + authToken } }
		);
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const removeFromCart = async (cartId, authToken) => {
	try {
		let res = await axios.delete(api + `carts/${cartId}`, {
			headers: { Authorization: "Bearer " + authToken },
		});
		return res;
	} catch (err) {
		return handleError(err);
	}
};
