import { serverImages } from "./api";

export const login = (data, userStore) => {
  const remainMilliseconds = 60 * 60 * 2000;
  const expiryDate = new Date(new Date().getTime() + remainMilliseconds);
  data.consumer.user.image_url = serverImages + data.consumer.user.image_url;
  const authInfo = {
    token: data.token,
    consumer: data.consumer,
    expiryDate,
    isAuth: true,
  };
  userStore.login(authInfo);
  localStorage.setItem(
    "user",
    JSON.stringify({ ...authInfo, expiryDate: expiryDate.toISOString() })
  );
};
