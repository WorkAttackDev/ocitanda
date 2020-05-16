<script>
  import Product from "../components/Product.svelte";
  export let title = "";
</script>

<style>
  div {
    overscroll-behavior: x contain;
    scroll-snap-type: x proximity;
  }
</style>

<section class="ml-4 my-4">
  <h2 class="mb-4 font-bold md:text-xl">{title}</h2>
  <div class="flex overflow-x-auto">
    <Product className="pr-4" />
    <Product className="pr-4" />
    <Product className="pr-4" />
    <Product className="pr-4" />
    <Product className="pr-4" />
    <Product className="pr-4" />
  </div>
</section>
