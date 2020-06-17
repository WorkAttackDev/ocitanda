<script>
  import { onMount } from "svelte";
  import SlideHero from "../components/home/SlideHero.svelte";
  import ProductSection from "../components/ProductSection.svelte";
  import TextBlock from "../components/TextBlock.svelte";
  import { fetchProducts } from "../api";

  let products = [], products2 = [];
  let fetching = true;

  onMount(async () => {
    products = await fetchProducts(6);
    if (products.error) products = [];
    products2 = await fetchProducts(6, 2);
    if (products2.error) products2 = [];
    fetching = false;
  });
  
</script>

<svelte:head>
  <title>Ocitanda</title>
</svelte:head>

<SlideHero />
<ProductSection {products} title="Destaques" {fetching} />
<ProductSection products={products2} title="Novos" {fetching} />
<TextBlock title="Quem Somos" />

