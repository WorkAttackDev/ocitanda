import Link from "../models/Link";
export const links = [
	Link("Início", "/"),
	Link("Produtos", `/products/1/Todos/1`),
	Link("Carrinho", "/cart"),
	Link("Fornecedor", "/producer"),
	// Link("Nutrição", "#"),
	Link("Sobre", "/about"),
];


export const adminLinks = [
	Link("Início", "/admin"),
	Link("Produtos", `/admin/products/1/Todos/1`),
	Link("Categorias", "/admin/categories"),
	Link("Fornecedor", "/admin/producer"),
];
