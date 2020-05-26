<script>
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";
  import Product from "../models/Product";
  import QuantityBox from "./QuantityBox.svelte";

  export let className = "";
  export let product = Product();

  const dispatch = createEventDispatcher();

  const openProduct = async (id = "") => await goto("/product/" + id);
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
  <img
    on:click={() => dispatch('open')}
    class="w-full h-56 object-cover"
    src={product.img}
    alt={product.title} />
  <div class="flex flex-col p-4 bg-ocitanda-beige">
    <h1 class="font-bold text-ocitanda-green tracking-wide mb-4 truncate">
      {product.title}
    </h1>
    <p class="text-ocitanda-gold font-bold mb-4 self-end">{product.price} Kz</p>
    {#if product.qty}
      <QuantityBox qty={product.qty} />
    {:else}
      <Button>Comprar</Button>
    {/if}
  </div>
</article>
