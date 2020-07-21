import Product from "./models/Product";
import Cart from "./models/Cart";
import axios from "axios";

// export const api = "https://www.ocitanda.com/api/";
export const site =
  process.env.NODE_ENV !== "development"
    ? "https://www.ocitanda.com/"
    : "http://localhost:3000/";

export const api =
  process.env.NODE_ENV !== "development"
    ? "https://www.ocitanda.com/api/"
    : "http://localhost:5050/api/";

export const handleError = (err) => {
  if (!err.response) return { error: true, msg: "Network Problem" };
  return {
    msg: err.response.data.message,
    error: true,
    statusCode: err.response.status,
  };
};

export const axiosInstance = axios.create({
  baseURL: api,
  timeout: 3000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export const fetchProducts = async (
  limit = 10,
  page = 1,
  category = "Todos",
  order = 1
) => {
  try {
    let res = await axiosInstance.get("products", {
      params: {
        limit,
        page,
        category,
        order,
      },
    });
    return res.data.map(
      ({ name, id, quantity, price, image_url, description, deleted }) =>
        Product({
          id,
          deletedAt: deleted,
          desc: description,
          img: api + image_url,
          name,
          price,
          producer: "Ocitanda",
          qty: quantity,
        })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await axiosInstance.get("products/" + id);
    const data = res.data;

    const product = Product({
      id: data.id,
      name: data.name,
      desc: data.description,
      price: data.price,
      producer: "Ocitanda",
      img: api + data.image_url,
      deletedAt: data.deleted
    });

    return product;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchUserCartItems = async (userId, authToken) => {
  try {
    let res = await axiosInstance.get("carts/" + userId, {
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

export const getConsumer = async (userId, authToken) => {
  try {
    let res = await axiosInstance.get(`/consumers/${userId}`, {
      headers: { Authorization: "Bearer " + authToken },
    });
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getConsumerbyEmail = async (email) => {
  try {
    let res = await axiosInstance.get(`/consumers/email/${email}`);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteConsumer = async (userId) => {
  try {
    let res = await axiosInstance.delete(`consumers/${userId}`);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const signup = async (user) => {
  console.log(user);

  try {
    let res = await axiosInstance.post("auth/signup", {
      ...user,
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
};

export const updateConsumer = async (consumer) => {
  try {
    let res = await axiosInstance.put("auth/update", consumer);
    return res;
  } catch (err) {
    return handleError(err);
  }
};

export const signin = async (user) => {
  try {
    let res = await axiosInstance.post("auth/login", {
      ...user,
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
};

export const googleSignin = async () => {
  try {
    let res = await axiosInstance.get("auth/google");
    return res;
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
};

export const sendVerifyEmail = async (email) => {
  try {
    let res = await axiosInstance.post("verify-email", {
      email,
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
};

export const verifyEmail = async (token) => {
  try {
    let res = await axiosInstance.get("verify-email", {
      params: {
        token,
      },
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
};

export const forgotPassword = async (email) => {
  try {
    let res = await axiosInstance.post("forgot-password", {
      email,
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
};

export const verifyResetToken = async (token) => {
  try {
    let res = await axiosInstance.get("forgot-password", {
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
    let res = await axiosInstance.put("forgot-password", {
      password,
      token,
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
};

export const addToCart = async (productId, consumerId) => {
  try {
    let res = await axiosInstance.post("carts", {
      productId,
      consumerId,
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
};

export const removeFromCart = async (cartId) => {
  try {
    let res = await axiosInstance.delete(`carts/${cartId}`);
    return res;
  } catch (err) {
    return handleError(err);
  }
};

export const subscribeEmail = async (email) => {
  try {
    let res = await axiosInstance.post(`subscribers`, {
      email,
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
};
