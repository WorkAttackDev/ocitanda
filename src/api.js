import Product from "./models/Product";
import Cart from "./models/Cart";
import axios from "axios";

// export const api = "https://www.ocitanda.com/api";
// export const serverImages = "https://www.ocitanda.com/images";
export const api = "http://localhost:5050/api";
export const serverImages = "http://localhost:5050/images";

export const fetchProducts = async () => {
  try {
    let res = await axios.get(api + "/products");
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
    return error;
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
    return error;
  }
};

export const fetchUserCartItems = async (userId) => {
  let res = await axios.get(api + "/carts/" + userId);
  let data = await res.data;
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
  let res = await axios.get(api + "/categories");
  let data = await res.data;
  return data.map(({ name }) => name);
};

export const signup = async (user) => {
  console.log(user);

  try {
    let res = await axios.post(api + "/auth/signup", {
      ...user,
    });
    return res;
  } catch (err) {
    const error = {
      msg: err.response.data.message,
      error: true,
      statusCode: err.response.status,
    };
    return error;
  }
};
