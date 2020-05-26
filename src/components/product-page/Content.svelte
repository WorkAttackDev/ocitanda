<script>
  import { goto } from "@sapper/app";
  import SelectDropdown from "../SelectDropdown.svelte";
  import Button from "../Button.svelte";
  import Product from "../../models/Product";

  export let product = Product();
  export let className = "";

  const qty = [1, 2, 3, 4, 5, 6];
  let selectedQty = 1;
</script>

<style>

</style>

<article class={'flex flex-col items-center text-center p-4 ' + className}>
  <h1 class="font-bold text-3xl md:text-4xl text-ocitanda-green my-4">
    {product.title}
  </h1>
  <h3 class="text-lg text-ocitanda-green mb-4">
    Produtor:
    <strong>{product.producer}</strong>
  </h3>
  <p class="mb-4">{product.desc}</p>
  <SelectDropdown
    labelClassName="text-ocitanda-gold font-bold text-lg"
    label={`${product.price * selectedQty} Kz`}
    items={qty} />
  <Button on:click={async () => await goto('/cart')} className="mt-4">
    Adicionar ao Carrinho
  </Button>
</article>
