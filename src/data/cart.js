import ProductModel from "../models/Product";
import { products } from "./products";

export const Cart = (product = ProductModel(), qty = 0) => ({
	...product,
	qty,
});

export const cartProducts = [
	Cart(products[0], 3),
	Cart(products[3], 2),
	Cart(products[5], 4),
	Cart(products[6], 6),
	Cart(products[9], 9),
];
