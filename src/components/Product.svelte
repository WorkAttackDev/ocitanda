<script>
  import Product from "../models/Product";
  import { currecy } from "../lib/format";

  export let className = "",
    horizontal = false,
    admin = false,
    product = Product();

  let href = admin
    ? "/admin/product/" + product.id
    : "/product/" + product.id;
</script>

<style>
  article {
    scroll-snap-align: center;
    box-shadow: 0px 2px 5px #00000054;
    transition: box-shadow 0.3s ease-out;
  }

  article:hover {
    box-shadow: 0px 4px 10px #00000077;
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

  .horizontal {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
</style>

<article
  class:horizontal
  class={'prod-w mx-auto relative overflow-hidden' + ' ' + className}>
  <a {href}>
    <img
      class="w-full h-56 p-1 object-cover cursor-pointer"
      src={product.img}
      alt={product.name} />
  </a>
  <div class="flex flex-col text-center p-4 bg-gray-200">
    <h1 class="font-bold text-ocitanda-green tracking-wide truncate">
      {product.name}
    </h1>
    <p class="text-ocitanda-gold font-bold mb-2">
      {currecy(product.price)} Kz/
      <strong>{product.unity}</strong>
    </p>
    <slot />
  </div>
</article>
