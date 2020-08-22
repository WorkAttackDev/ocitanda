<script>
  import CarrocelSlide from "../components/CarrocelSlide.svelte";

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
  <title>Ocitanda - E-commerce</title>
</svelte:head>

<!-- <SlideHero /> -->
<CarrocelSlide />
<ProductSection {products} title="Destaques" {fetching} />
<ProductSection products={products2} title="Novos" {fetching} />
<TextBlock title="Quem Somos">
  <img class="w-56 mx-auto mb-4" src="/logo_vertical.png" alt="vertical ocitanda logo">
  Somos especializados na distribuição de alimentos
  <strong>orgânicos</strong>
  e
  <strong>frescos</strong>
  , contando para isso, com uma equipa qualificada na busca de soluções
  adequadas para o
  <strong>bem-estar dos nossos clientes e colaboradores</strong>
  . Prezamos por padrões de qualidade focados na conquista e fidelização dos
  nossos clientes.
</TextBlock>
