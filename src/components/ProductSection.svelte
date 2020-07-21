<script>
  import { createEventDispatcher } from "svelte";
  import { cart } from "../stores/cart";
  import { products as productStore } from "../stores/products";
  import { notification } from "../stores/notification";
  import { loading } from "../stores/loading";
  import { addToCart, removeFromCart } from "../api";
  import { stores } from "@sapper/app";
  import ProductModel from "../models/Product";
  import ProductSectionList from "./ProductSectionList.svelte";

  export let title = "",
    fetching = false,
    vertical = false,
    products = [ProductModel()];

  const { page, session } = stores();
  const dispatch = createEventDispatcher();
  const productType = $page.path.startsWith("/admin")
    ? "admin"
    : $page.path !== "/cart"
    ? "add"
    : "cart";

  $: filteredProducts = products.map((_p) =>
    $cart.products.some((_p2) => _p.id === _p2.id)
      ? { ..._p, onCart: true }
      : _p
  );

  const addProductToCart = async (e, productId) => {
    if (!$session.isAuth)
      return notification.show(
        "error",
        "Crie uma conta ou inicie sessão para adicionar ao carrinho.",
        "Ocorreu um erro"
      );

    fetching = true;
    const res = await addToCart(productId, $session.user.id);
    if (res.error)
      return notification.show(
        "error",
        "Ocorreu um erro ao adicionar o produto, tente novamente.",
        "Ocorreu um erro"
      );

    cart.initCart($session.user.id);
    fetching = false;
  };

  const removeProductFromCart = async (e, cartId) => {
    if (!$session.isAuth)
      return notification.show(
        "error",
        "Crie uma conta ou inicie sessão para remover do carrinho.",
        "Ocorreu um erro"
      );

    fetching = true;
    const res = await cart.removeProduct(cartId);
    fetching = false;
  };

  const increaseQuantity = (cartId) => {
    cart.increase(cartId);
  };

  const decreaseQuantity = (cartId) => {
    cart.decrease(cartId);
  };

  const handleToggleInvalid = async (e)=> {
    e.preventDefault();
    e.stopPropagation();
    const {id, invalid} = e.detail;
    loading.show();
    const res = productStore.invalidate(id, invalid);
    loading.close();
  } 
</script>

<ProductSectionList
  {vertical}
  {title}
  {increaseQuantity}
  {decreaseQuantity}
  {fetching}
  {productType}
  products={filteredProducts}
  on:removefromcart={(e) => removeProductFromCart(e, e.detail)}
  on:addtocart={(e) => addProductToCart(e, e.detail)} 
  on:toggleinvalid={handleToggleInvalid}/>
