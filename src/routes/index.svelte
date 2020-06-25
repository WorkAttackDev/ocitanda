<script>
  import { onMount } from "svelte";
  import SlideHero from "../components/home/SlideHero.svelte";
  import ProductSection from "../components/ProductSection.svelte";
  import TextBlock from "../components/TextBlock.svelte";
  import { fetchProducts } from "../api";

  let products = [],
    products2 = [];
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
<TextBlock title="Quem Somos">
  A DP & DEEPL, Comércio e Prestação de Serviços, Lda., doravante referida por
  <strong>DEEPL,</strong>
  é uma sociedade comercial constituída à luz do ordenamento jurídico angolano,
  com sede em Luanda, no Bairro Cassenda, Rua 3, Casa nº 33, Distrito Urbano da
  Maianga, Município e província de Luanda.
  <strong>A DEEPL é detentora da marca OCITANDA.</strong>
</TextBlock>
