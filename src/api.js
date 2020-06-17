import Product from "./models/Product";
import Cart from "./models/Cart";
import axios from "axios";

// export const api = "https://www.ocitanda.com/api";
// export const serverImages = "https://www.ocitanda.com/images";
export const api = "http://localhost:5050/api";
export const serverImages = "http://localhost:5050/";

const handleError = (err) => {
	if (!err.response) return { error: true, msg: "Network Problem" };
	return {
		msg: err.response.data.message,
		error: true,
		statusCode: err.response.status,
	};
};

export const fetchProducts = async (limit, page) => {
	try {
		let res = await axios.get(api + "/products", {
			params: {
				limit,
				page
			}
		});
		return res.data.map(
			({ name, id, quantity, price, image_url, description }) =>
				Product(
					id,
					name,
					description,
					price,
					"Ocitanda",
					serverImages + image_url
				)
		);
	} catch (error) {
		console.log(error, error.response);
		return handleError(error);
	}
};

export const fetchProductById = async (id) => {
	try {
		const res = await axios.get(api + "/products/" + id);
		const data = res.data;

		const product = Product(
			data.id,
			data.name,
			data.description,
			data.price,
			"Ocitanda",
			serverImages + data.image_url
		);

		return product;
	} catch (error) {
		return handleError(error);
	}
};

export const fetchUserCartItems = async (userId, authToken) => {
	try {
		let res = await axios.get(api + "/carts/" + userId, {
			headers: { Authorization: "Bearer " + authToken },
		});
		let data = res.data;
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
	} catch (error) {
		return handleError(error);
	}
};

export const fetchCategories = async () => {
	try {
		let res = await axios.get(api + "/categories");
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
		let res = await axios.delete(api + `/consumers/${userId}`, {
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
		let res = await axios.post(api + "/auth/signup", {
			...user,
		});
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const updateConsumer = async (consumer) => {
	console.log(consumer);

	try {
		let res = await axios.put(api + "/auth/update", consumer);
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const signin = async (user) => {
	console.log(user);

	try {
		let res = await axios.post(api + "/auth/login", {
			...user,
		});
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const forgotPassword = async (email) => {
	try {
		let res = await axios.post(api + "/forgot-password", {
			email,
		});
		return res;
	} catch (err) {
		return handleError(err);
	}
};

export const verifyResetToken = async (token) => {
	try {
		let res = await axios.get(api + "/forgot-password", {
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
		let res = await axios.put(api + "/forgot-password", {
			password,
			token,
		});
		return res;
	} catch (err) {
		return handleError(err);
	}
};
