<script>
  import { goto } from "@sapper/app";
  import { cart } from "./../stores/cart.js";
  import { user } from "./../stores/user.js";
  import { onMount } from "svelte";
  import { fetchUserCartItems } from "../api";
  import ProductSection from "../components/ProductSection.svelte";
  import Notification from "../components/Notification.svelte";
  import Button from "../components/Button.svelte";
  import CheckoutBox from "../components/cart/CheckoutBox.svelte";
  import Modal from "../components/Modal.svelte";

  let fetching = true, wantCheckout = false;

  $: fetchBlock($user.token);
  $: products = $cart.products;
  $: total = $cart.total;

  onMount(async () => {
    await fetchBlock($user.token);
  });

  async function fetchBlock(token) {
    if (!token) return (fetching = false);
    fetching = true;
    cart.initCart($user.consumer.id, token);
    fetching = false;
  }
</script>

<svelte:head>
  <title>Ocitanda - Carrinho</title>
</svelte:head>

<ProductSection title="Meus Produtos" {products} {fetching} />
<CheckoutBox on:checkout={()=> wantCheckout = true} {total} Subtotal={total} />

{#if !$user.token}
  <Notification
    title="Informação"
    msg="Crie uma conta, para adicionar produtos ao carrinho"
    on:close={async () => await goto('/')}
    buttonText="Criar Conta"
    href="/signup" />
{/if}

{#if wantCheckout}
  <Modal on:close={()=> wantCheckout = false}>
    <h1>Brevemente poderá realizar pagamentos atravéz do nosso site.</h1>
  </Modal>
{/if}