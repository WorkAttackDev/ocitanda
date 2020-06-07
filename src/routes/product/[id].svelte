<script context="module">
  import Product from "../../models/Product";
  import { fetchProductById } from "../../api";
  export async function preload(page) {
    const { id } = page.params;

    const product = await fetchProductById(id);

    if (!product) throw new Error("product not found");

    return { product };
  }
</script>

<script>
  //   import { goto } from "@sapper/app";
  import Content from "../../components/product-page/Content.svelte";
  import Image from "../../components/product-page/Image.svelte";

  export let product = Product();

  let isOnline;
</script>

<svelte:head>
  <title>{`Ocitanda - ${product.name}`}</title>
</svelte:head>

<section class="flex flex-col p-4 md:flex-row">
  <Image className="w-full md:w-2/5" src={product.img} alt={product.name} />
  <Content className="w-full md:w-3/5" {product} />
</section>
