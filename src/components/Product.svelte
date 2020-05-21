<script>
  import Button from "./Button.svelte";
  import Product from "../models/Product";
  export let className = "";
  export let product = Product();
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
  }
</style>

<article class={'prod-w shadow-sm' + ' ' + className}>
  <img class="w-full h-56 object-cover" src={product.img} alt={product.title} />
  <div class="flex flex-col p-4 bg-ocitanda-beige">
    <h1 class="font-bold text-ocitanda-green tracking-wide mb-4 truncate">
      {product.title}
    </h1>
    <p class="text-ocitanda-gold font-bold mb-4 self-end">{product.price} Kz</p>
    <Button>Comprar</Button>
  </div>
</article>
