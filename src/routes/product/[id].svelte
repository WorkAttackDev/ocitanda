<script context="module">
  import Product from "../../models/Product";
  import { fetchProductById } from "../../api";
  export async function preload(page) {
    const { id } = page.params;

    const product = await fetchProductById(id);

    if (product.error) product = {};

    return { product };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { cart } from "../../stores/cart";
  import { user } from "../../stores/user";
  import { addToCart } from "../../api";
  import Content from "../../components/product-page/Content.svelte";
  import Image from "../../components/product-page/Image.svelte";
  import Notification from "../../components/Notification.svelte";
  import LoadingOverlay from "../../components/LoadingOverlay.svelte";

  export let product = Product();
  let isOnCart = false,
    loading = false;

  let errorMsg = "",
    successMsg = "";

  onMount(() => {
    isOnCart = $cart.products.some((_p2) => product.id === _p2.id);
  });

  const addProductToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!$user.token)
      return (errorMsg =
        "Crie uma conta ou inicie sessão para adicionar ao carrinho.");

    loading = true;
    const res = await addToCart(productId, $user.consumer.id, $user.token);
    if (res.error) {
      errorMsg = "Ocorreu um erro ao adicionar o produto, tente novamente.";
    } else {
      successMsg = "O produto foi adicionado ao seu carrrinho.";
      cart.initCart($user.consumer.id, $user.token);
    }
    loading = false;
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

{#if errorMsg}
  <Notification
    on:close={() => (errorMsg = '')}
    msg={errorMsg}
    type="error"
    title="Erro adicionar produto ao carrinho" />
{/if}

{#if successMsg}
  <Notification
    title="Adicionado com sucesso"
    msg={successMsg}
    type="success"
    on:close={() => (successMsg = '')} />
{/if}

{#if loading}
  <LoadingOverlay />
{/if}
