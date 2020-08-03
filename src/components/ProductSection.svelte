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
  import Alert from "./Alert.svelte";

  export let title = "",
    admin = false,
    fetching = false,
    vertical = false,
    isDeleting = false,
    products = [ProductModel()];

  let currId;

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
      return notification.show({
        type: "error",
        msg: "Crie uma conta ou inicie sessão para adicionar ao carrinho.",
        title: "Ocorreu um erro",
      });

    fetching = true;
    const res = await addToCart(productId, $session.user.id);
    if (res.error)
      return notification.show({
        type: "error",
        msg: "Ocorreu um erro ao adicionar o produto, tente novamente.",
        title: "Ocorreu um erro",
        minimal: true,
      });

      notification.show({
        type: "success",
        msg: "Adicionado com sucesso.",
        title: "Sucesso",
        minimal: true,
      });

    cart.initCart($session.user.id);
    fetching = false;
  };

  const removeProductFromCart = async (e, cartId) => {
    if (!$session.isAuth)
      return notification.show({
        type: "error",
        msg: "Crie uma conta ou inicie sessão para remover do carrinho.",
        title: "Ocorreu um erro",
        minimal: true,
      });

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

  const openDeleteAlert = (e) => {
    currId = e.detail;
    isDeleting = true;
  };

  const handleToggleInvalid = async (e) => {
    const { id, invalid } = e.detail;
    const res = await productStore.invalidate(id, invalid);
    dispatch("refresh");
  };

  const handleDeleteProduct = async () => {
    loading.show();
    const res = await productStore.deleteProduct(currId);
    currId = null;
    isDeleting = false;
    dispatch("refresh");
    loading.close();
  };
</script>

<ProductSectionList
  {admin}
  {vertical}
  {title}
  {increaseQuantity}
  {decreaseQuantity}
  {fetching}
  {productType}
  products={filteredProducts}
  on:removefromcart={(e) => removeProductFromCart(e, e.detail)}
  on:addtocart={(e) => addProductToCart(e, e.detail)}
  on:delete={openDeleteAlert}
  on:toggleinvalid={handleToggleInvalid} />

{#if isDeleting}
  <Alert
    on:resolve={() => handleDeleteProduct(currId)}
    on:close={() => (isDeleting = false)}>
    <p class="mt-10">Vôce deseja apagar este Produto?</p>
  </Alert>
{/if}
