<script>
  import Product from "../models/Product";
  import { currecy } from "../lib/format";

  export let className = "",
    product = Product();
</script>

<style>
  article {
    scroll-snap-align: center;
  }

  article:first-of-type {
    scroll-snap-align: start;
  }

  article:last-of-type {
    scroll-snap-align: end;
  }

  .prod-w {
    min-width: 14rem;
    max-width: 18rem;
  }
</style>

<article class={'prod-w shadow-sm' + ' ' + className}>
  <img
    class="w-full h-56 object-cover cursor-pointer"
    src={product.img}
    alt={product.name} />
  <div class="flex flex-col p-4 bg-ocitanda-beige">
    <h1 class="font-bold text-ocitanda-green tracking-wide mb-4 truncate">
      {product.name}
    </h1>
    <p class="text-ocitanda-gold font-bold mb-4 self-end">
      {currecy(product.price)} Kz
    </p>
    <slot />
  </div>
</article>
