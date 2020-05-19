<script>
  import SlideHero from "../components/home/SlideHero.svelte";
  import ProductSection from "../components/ProductSection.svelte";
  import TextBlock from "../components/TextBlock.svelte";
  import { products } from "../data/products";
</script>

<svelte:head>
  <title>Ocitanda</title>
</svelte:head>

<SlideHero />
<ProductSection {products} title="Destaques" />
<ProductSection {products} title="Novos" />
<TextBlock title="Quem Somos" />
