<script>
  import { goto } from "@sapper/app";
  import ProductModel from "../models/Product";
  import Product from "../components/Product.svelte";

  export let title = "";
  export let fetching = false;
  export let products = [ProductModel()];

  const onOpenProduct = async (id = "") => await goto("/product/" + id);
</script>

<style>
  div {
    overscroll-behavior: x contain;
    scroll-snap-type: x proximity;
  }
</style>

<section class="ml-4 my-4">
  <h2 class="mb-4 font-bold text-lg text-ocitanda-green md:text-xl">{title}</h2>
  {#if fetching}
    <p class="text-4xl">Carregando...</p>
  {:else}
    <div class="flex overflow-x-auto pb-4">
      {#each products as product}
        <Product
          on:open={() => onOpenProduct(product.id)}
          {product}
          className="pr-4" />
      {/each}
    </div>
  {/if}
</section>
