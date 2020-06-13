<script>
  import { onMount } from "svelte";
  // import axios from "axios";
  import SlideHero from "../components/home/SlideHero.svelte";
  import ProductSection from "../components/ProductSection.svelte";
  import TextBlock from "../components/TextBlock.svelte";
  import { fetchProducts } from "../api";

  let products = [];
  let fetching = true;

  onMount(async () => {
    products = await fetchProducts();
    if(products.error) products = [];
    fetching = false;
    console.log("terminou");
  });
</script>

<svelte:head>
  <title>Ocitanda</title>
</svelte:head>

<SlideHero />
<ProductSection {products} title="Destaques" {fetching} />
<ProductSection {products} title="Novos" {fetching} />
<TextBlock title="Quem Somos" />
