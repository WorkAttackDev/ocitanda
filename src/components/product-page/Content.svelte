<script>
  import { goto } from "@sapper/app";
  import SelectDropdown from "../SelectDropdown.svelte";
  import Button from "../Button.svelte";
  import QuantityBox from "../QuantityBox.svelte";
  import Product from "../../models/Product";

  export let product = Product();
  export let className = "";

  const qty = [1, 2, 3, 4, 5, 6];
  let selectedQty = 1;
</script>

<style>

</style>

<article class={'flex flex-col items-center text-center p-4 ' + className}>
  <h1
    class="font-bold break-words text-3xl md:text-4xl text-ocitanda-green my-4">
    {product.name}
  </h1>
  <h3 class="text-lg text-ocitanda-green mb-4">
    Produtor:
    <strong>{product.producer}</strong>
  </h3>
  <p class="mb-4">{product.desc}</p>
  <span class="flex flex-col">
    <p class="text-2xl font-bold text-ocitanda-gold">{product.price} Kz</p>
    <QuantityBox qty={product.count || 1} />
  </span>
  <Button on:click={async () => await goto('/cart')} className="mt-4">
    Adicionar ao Carrinho
  </Button>
</article>
