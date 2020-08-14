<script>
  import { createEventDispatcher } from "svelte";
  import LoadingOverlay from "./LoadingOverlay.svelte";
  import Button from "./Button.svelte";
  import Product from "./Product.svelte";
  import ProductActionBox from "./admin/ProductActionBox.svelte";
  import QuantityBox from "./QuantityBox.svelte";
  import DeleteMajorMonotone from "svelte-polaris-icons/lib/DeleteMajorMonotone/DeleteMajorMonotone.svelte";

  export let vertical = false,
    admin = false,
    products,
    productType,
    title,
    fetching,
    increaseQuantity,
    decreaseQuantity;

  const dispatch = createEventDispatcher();
</script>

<style>
  div {
    overscroll-behavior: x contain;
    scroll-snap-type: x proximity;
  }

  .delete-btn {
    top: -0.5rem;
    right: -0.5rem;
    transition: all 0.2s ease-out;
    cursor: pointer;
  }

  .delete-btn:hover {
    @apply bg-opacity-75;
    transform: scale(1.05);
  }
</style>

{#if vertical}
  <section class="flex flex-wrap mt-2">
    {#each products as product}
      <div class=" w-full py-4 px-4 xs:w-1/2 md:w-1/3 lg:w-1/4">
        <Product {admin} className="w-full" {product}>
          {#if productType === 'cart'}
            <QuantityBox
              max={product.quantity <= product.count}
              qty={product.count} />
            <Button
              on:click={() => dispatch('removefromcart', product.cartId)}
              className="absolute top-0 right-0 bg-ocitanda-brown w-full">
              <DeleteMajorMonotone class="w-2 h-auto" />
            </Button>
          {:else if productType === 'add' && !product.onCart}
            <Button
              on:click={(e) => {
                e.preventDefault();
                dispatch('addtocart', product.id);
              }}>
              Adicionar
            </Button>
          {:else if productType === 'admin'}
            <ProductActionBox
              invalidate={product.deletedAt}
              on:delete={() => dispatch('delete', product.id)}
              on:toggleinvalid={() => dispatch('toggleinvalid', {
                  id: product.id,
                  invalid: !product.deletedAt,
                })} />
          {:else}
            <Button disabled>No Carrinho</Button>
          {/if}
        </Product>
      </div>
    {/each}
  </section>
{:else}
  <section class="ml-4 my-4">
    <h2 class="mb-4 font-bold text-lg text-ocitanda-green md:text-xl">
      {title}
    </h2>
    {#if fetching}
      <LoadingOverlay />
    {:else}
      <div class="flex overflow-x-auto pb-4">
        {#each products as product}
          <Product {product} horizontal className="my-4">
            {#if productType === 'cart'}
              <QuantityBox
                qty={product.count}
                max={product.quantity <= product.count}
                on:increase={() => increaseQuantity(product.cartId)}
                on:decrease={() => decreaseQuantity(product.cartId)} />
              <button
                on:click={() => dispatch('removefromcart', product.cartId)}
                class="delete-btn absolute bg-ocitanda-brown p-4 rounded-full">
                <DeleteMajorMonotone
                  class="w-4 min-w-4 h-auto fill-current text-white" />
              </button>
            {:else if productType === 'add' && !product.onCart}
              <Button
                on:click={(e) => {
                  e.preventDefault();
                  dispatch('addtocart', product.id);
                }}>
                Adicionar
              </Button>
            {:else if productType === 'admin'}
              <ProductActionBox />
            {:else}
              <Button disabled>No Carrinho</Button>
            {/if}
          </Product>
        {:else}
          <p class="mx-auto">Nenhum produto Encontrado!</p>
        {/each}
        <div class="w-2 h-full opacity-0">lore</div>
      </div>
    {/if}
  </section>
{/if}
