<script>
  import { createEventDispatcher } from "svelte";
  import { cart } from "../stores/cart";
  import { user } from "../stores/user";
  import { addToCart, removeFromCart } from "../api";
  import { stores } from "@sapper/app";
  import ProductModel from "../models/Product";
  import Product from "./Product.svelte";
  import Loading from "./Loading.svelte";
  import Notification from "./Notification.svelte";
  import Alert from "./Alert.svelte";
  import Button from "./Button.svelte";
  import QuantityBox from "./QuantityBox.svelte";

  export let title = "",
    fetching = false,
    vertical = false,
    products = [ProductModel()];

  const { page } = stores();
  const dispatch = createEventDispatcher();
  const productType = $page.path !== "/cart" ? "add" : "cart";

  let errorMsg = "";
  let successMsg = "";
  let alertMsg = "";

  $: filteredProducts = products.map((_p) =>
    $cart.products.some((_p2) => _p.id === _p2.id)
      ? { ..._p, onCart: true }
      : _p
  );

  const addProductToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!$user.token)
      return (errorMsg =
        "Crie uma conta ou inicie sessão para adicionar ao carrinho.");

    fetching = true;
    const res = await addToCart(productId, $user.consumer.id, $user.token);
    if (res.error) {
      errorMsg = "Ocorreu um erro ao adicionar o produto, tente novamente.";
    } else {
      successMsg = "O produto foi adicionado ao seu carrrinho.";
      cart.initCart($user.consumer.id, $user.token);
    }
    fetching = false;
  };

  const removeProductFromCart = async (e, cartId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!$user.token)
      return (errorMsg =
        "Crie uma conta ou inicie sessão para remover do carrinho.");

    fetching = true;
    const res = await cart.removeProduct(cartId, $user.token);
    res && res.error
      ? (errorMsg = "Ocorreu um erro ao remover o produto, tente novamente.")
      : (successMsg = "O produto foi removido ao seu carrrinho.");

    fetching = false;
  };

  const increaseQuantity = (cartId) => {
    cart.increase(cartId);
  };

  const decreaseQuantity = (cartId) => {
    cart.decrease(cartId);
  };
</script>

<style>
  div {
    overscroll-behavior: x contain;
    scroll-snap-type: x proximity;
  }
</style>

{#if vertical}
  <section class="flex flex-wrap mt-2">
    {#each filteredProducts as product}
      <div class=" w-full py-2 px-4 xs:w-1/2 md:w-1/3 lg:w-1/4">
        <a rel="prefetch" href={'/product/' + product.id}>
          <Product className="w-full" {product}>
            {#if productType === 'cart'}
              <QuantityBox
                max={product.quantity <= product.count}
                qty={product.count} />
              <Button
                on:click={() => removeProductFromCart(product.cartId)}
                className="bg-ocitanda-brown w-full">
                Remover
              </Button>
            {:else if productType === 'add' && !product.onCart}
              <Button
                on:click={async (e) => await addProductToCart(e, product.id)}>
                Adicionar
              </Button>
            {:else}
              <Button disabled>No Carrinho</Button>
            {/if}
          </Product>
        </a>
      </div>
    {/each}
  </section>
{:else}
  <section class="ml-4 my-4">
    <h2 class="mb-4 font-bold text-lg text-ocitanda-green md:text-xl">
      {title}
    </h2>
    {#if fetching}
      <Loading />
    {:else}
      <div class="flex overflow-x-auto pb-4">
        {#each filteredProducts as product}
          <a rel="prefetch" href={'/product/' + product.id}>
            <Product {product} className="pr-4">
              {#if productType === 'cart'}
                <QuantityBox
                  qty={product.count}
                  max={product.quantity <= product.count}
                  on:increase={() => increaseQuantity(product.cartId)}
                  on:decrease={() => decreaseQuantity(product.cartId)} />
                <Button
                  on:click={async (e) => await removeProductFromCart(e, product.cartId)}
                  className="bg-ocitanda-brown w-full">
                  Remover
                </Button>
              {:else if productType === 'add' && !product.onCart}
                <Button on:click={(e) => addProductToCart(e, product.id)}>
                  Adicionar
                </Button>
              {:else}
                <Button disabled>No Carrinho</Button>
              {/if}
            </Product>
          </a>
        {:else}
          <p class="mx-auto">Nenhum produto Encontrado!</p>
        {/each}
      </div>
    {/if}
  </section>
{/if}

{#if errorMsg}
  <Notification
    on:close={() => (errorMsg = '')}
    msg={errorMsg}
    type="error"
    title="Ocorreu um erro" />
{/if}

{#if successMsg}
  <Notification
    title="Operação realizada com sucesso"
    type="success"
    msg={successMsg}
    on:close={() => (successMsg = '')} />
{/if}
