import { api } from "./api";
import { cart } from "./stores/cart";
import { user } from "./stores/user";

export const login = async (data) => {
	const remainMilliseconds = 60 * 60 * 24000;
	const expiryDate = new Date(new Date().getTime() + remainMilliseconds);
	data.consumer.user.image_url = api + data.consumer.user.image_url;
	const authInfo = {
		token: data.token,
		consumer: data.consumer,
		expiryDate,
		isAuth: true,
	};
	user.login(authInfo);
	localStorage.setItem(
		"user",
		JSON.stringify({ ...authInfo, expiryDate: expiryDate.toISOString() })
	);
	await cart.initCart(data.consumer.id, data.token);
};

export const logout = async () => {
	localStorage.setItem("user", JSON.stringify({}));
	user.logout();
	cart.reset();
};
