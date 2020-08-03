<script context="module">
  import Product from "../../models/Product";
  import { products } from "../../stores/products";

  export async function preload(page) {
    const { id } = page.params;

    let product = await products.getProductById(id);

    if (product.error) product = {};

    return { product };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import { cart } from "../../stores/cart";
  import { loading } from "../../stores/loading";
  import { notification } from "../../stores/notification";
  import { addToCart } from "../../api";
  import Content from "../../components/product-page/Content.svelte";
  import Image from "../../components/product-page/Image.svelte";
  import Notification from "../../components/Notification.svelte";
  import LoadingOverlay from "../../components/LoadingOverlay.svelte";

  export let product = Product();

  const { session } = stores();

  let isOnCart = false;

  let errorMsg = "",
    successMsg = "";

  onMount(() => {
    isOnCart = $cart.products.some((_p2) => product.id === _p2.id);
  });

  const addProductToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!$session.isAuth)
      return notification.show({
        type: "error",
        msg: "Crie uma conta ou inicie sessão para adicionar ao carrinho.",
        title: "Erro adicionar produto ao carrinho",
        minimal: true,
      });

    loading.show();
    const res = await addToCart(productId, $session.user.id);
    if (res.error) {
      notification.show({
        type: "error",
        msg: "Ocorreu um erro ao adicionar o produto, tente novamente.",
        title: "Erro adicionar produto ao carrinho",
        minimal: true,
      });
    } else {
      notification.show({
        type: "success",
        msg: "O produto foi adicionado ao seu carrrinho.",
        title: "Adicionado com sucesso",
        minimal: true,
      });
      cart.initCart($session.user.id);
    }
    loading.close();
  };
</script>

<svelte:head>
  <title>
    {`Ocitanda - ${product ? product.name : 'Produto não encontrado.'}`}
  </title>
</svelte:head>

<section class="flex flex-col p-4 md:flex-row">
  {#if !product}
    <p>Produto não encontrado!</p>
  {:else}
    <Image className="w-full md:w-2/5" src={product.img} alt={product.name} />
    <Content
      on:add={async (e) => await addProductToCart(e, product.id)}
      className="w-full md:w-3/5"
      {product}
      {isOnCart} />
  {/if}
</section>
