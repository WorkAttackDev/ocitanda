<script context="module">
  import { products } from "../../data/products";
  export async function preload(page) {
    const { id } = page.params;
    const product = products.find((_p) => _p.id === id);

    if (!product) throw new Error("product not found");

    return { product };
  }
</script>

<script>
  //   import { goto } from "@sapper/app";
  import Content from "../../components/product-page/Content.svelte";
  import Image from "../../components/product-page/Image.svelte";
  import Product from "../../models/Product";

  export let product = Product();

  let isOnline;
</script>

<svelte:head>
  <title>{`Ocitanda - ${product.title}`}</title>
</svelte:head>

<section class="flex flex-col p-4 md:flex-row">
  <Image className="w-full md:w-1/2" src={product.img} alt={product.title} />
  <Content className="w-full md:w-1/2" {product} />
</section>