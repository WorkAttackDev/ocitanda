import { fetchUserCartItems, removeFromCart, axiosInstance } from "../api";
import { writable } from "svelte/store";

function createCart() {
  const initial = { products: [], total: 0 };
  const { subscribe, set, update } = writable(initial);

  const getTotal = (products) =>
    !products.length
      ? 0
      : products.reduce((prev, curr) => prev + curr.price, 0);

  const addProduct = (cartId, productId, price) =>
    update((_cart) => {
      _cart.products.push({ cartId, productId, price, count: 0 });
      _cart.total = getTotal(_cart.products);
      return _cart;
    });

  const increase = (cartId) => {
    update((_cart) => {
      const products = _cart.products.map((_p) => {
        return _p.cartId === cartId && _p.quantity > _p.count
          ? {
              ..._p,
              count: _p.count + 1,
              price: _p.originalPrice * (_p.count + 1),
            }
          : _p;
      });
      return { products, total: getTotal(products) };
    });
  };

  const decrease = (cartId) => {
    update((_cart) => {
      const products = _cart.products.map((_p) => {
        return _p.cartId === cartId && _p.count > 1
          ? {
              ..._p,
              count: _p.count - 1,
              price: _p.originalPrice * (_p.count - 1),
            }
          : _p;
      });
      return { products, total: getTotal(products) };
    });
  };

  const addProducts = (products = []) =>
    set({
      products,
      total: getTotal(products),
    });

  const removeProduct = async (cartId) => {
    let res = await removeFromCart(cartId);
    if (res.error) return res;
    update((_cart) => {
      const products = _cart.products.filter((_p) => _p.cartId !== cartId);
      return { products, total: getTotal(products) };
    });
  };

  const removeProductsByConsumerId = async (consumerId) => {
    let res = await axiosInstance.delete("/carts/consumer/" + consumerId);
    if (res.error) return res;
    update((_cart) => {
      const products = _cart.products.filter((_p) => _p.consumerId !== consumerId);
      return { products, total: getTotal(products) };
    });
  };

  const initCart = async (consumerId) => {
    let products = await fetchUserCartItems(consumerId);
    if (products.error) products = [];
    addProducts(products);
  };

  return {
    subscribe,
    addProduct,
    addProducts,
    removeProduct,
    initCart,
    increase,
	decrease,
	removeProductsByConsumerId,
    reset: () => set(initial),
  };
}

export const cart = createCart();
