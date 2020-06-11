export const login = (data, userStore) => {
	const remainMilliseconds = 60 * 60 * 4000;
	const expiryDate = new Date(new Date() + remainMilliseconds);
	const authInfo = {
		token: data.token,
		consumer: data.consumer,
		expiryDate,
		isAuth: true,
	};
	userStore.login(authInfo);
	localStorage.setItem("user", JSON.stringify(authInfo));
};
