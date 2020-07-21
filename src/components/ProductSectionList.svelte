<script>
  import { createEventDispatcher } from "svelte";

  import LoadingOverlay from "./LoadingOverlay.svelte";
  import Button from "./Button.svelte";
  import Product from "./Product.svelte";
  import ProductActionBox from "./admin/ProductActionBox.svelte";
  import QuantityBox from "./QuantityBox.svelte";

  export let vertical = false,
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
</style>

{#if vertical}
  <section class="flex flex-wrap mt-2">
    {#each products as product}
      <div class=" w-full py-2 px-4 xs:w-1/2 md:w-1/3 lg:w-1/4">
        <a href={'/product/' + product.id}>
          <Product className="w-full" {product}>
            {#if productType === 'cart'}
              <QuantityBox
                max={product.quantity <= product.count}
                qty={product.count} />
              <Button
                on:click={() => dispatch('removefromcart', product.cartId)}
                className="bg-ocitanda-brown w-full">
                Remover
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
                teste={product}
                on:toggleinvalid={() => dispatch('toggleinvalid', {
                    id: product.id,
                    invalid: !product.deletedAt,
                  })} />
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
      <LoadingOverlay />
    {:else}
      <div class="flex overflow-x-auto pb-4">
        {#each products as product}
          <a href={'/product/' + product.id}>
            <Product {product} className="pr-4">
              {#if productType === 'cart'}
                <QuantityBox
                  qty={product.count}
                  max={product.quantity <= product.count}
                  on:increase={() => increaseQuantity(product.cartId)}
                  on:decrease={() => decreaseQuantity(product.cartId)} />
                <Button
                  on:click={(e) => {
                    e.preventDefault();
                    dispatch('removefromcart', product.cartId);
                  }}
                  className="bg-ocitanda-brown w-full">
                  Remover
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
                <ProductActionBox />
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
