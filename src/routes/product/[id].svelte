<script context="module">
  import Product from "../../models/Product";
  import { fetchProductById } from "../../api";
  export async function preload(page) {
    const { id } = page.params;

    const product = await fetchProductById(id);

    if (product.error) product = {};

    return { product };
  }
</script>

<script>
  //   import { goto } from "@sapper/app";
  import Content from "../../components/product-page/Content.svelte";
  import Image from "../../components/product-page/Image.svelte";

  export let product = Product();

</script>

<svelte:head>
  <title>{`Ocitanda - ${product ? product.name : "Produto não encontrado."}`}</title>
</svelte:head>

<section class="flex flex-col p-4 md:flex-row">
  {#if !product}
    <p>Produto não encontrado!</p>
  {:else}
    <Image className="w-full md:w-2/5" src={product.img} alt={product.name} />
    <Content className="w-full md:w-3/5" {product} />
  {/if}
</section>
