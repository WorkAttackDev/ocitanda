<script>
  import { goto } from "@sapper/app";
  import ProductModel from "../models/Product";
  import { Cart } from "../data/cart";
  import Product from "../components/Product.svelte";

  export let title = "";
  export let products = [ProductModel() || Cart()];

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
  <div class="flex overflow-x-auto pb-4">
    {#each products as product}
      <Product
        on:open={() => onOpenProduct(product.id)}
        {product}
        className="pr-4" />
    {/each}
  </div>
</section>
