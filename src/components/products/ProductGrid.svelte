<script>
  import Product from "../Product.svelte";
  import ProductModel from "../../models/Product";

  export let products = [Product()];
</script>

<section class="flex flex-wrap mt-2">
  {#each products as product}
    <div class=" w-full py-2 px-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <Product className="w-full" {product} />
    </div>
  {/each}
</section>
