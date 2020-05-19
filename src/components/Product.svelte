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

  .prod-w {
    min-width: 14rem;
  }
</style>

<article class={'prod-w' + ' ' + className}>
  <img class="w-full h-56 object-cover" src={product.img} alt={product.title} />
  <div class="flex flex-col p-4 bg-ocitanda-beige">
    <h1 class="font-extrabold mb-4 truncate">{product.title}</h1>
    <p class="text-ocitanda-green font-bold mb-4 self-end">
      {product.price} Kz
    </p>
    <Button>Comprar</Button>
  </div>
</article>
