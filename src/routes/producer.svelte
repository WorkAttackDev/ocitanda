<script>
  import ContactBox from "../components/ContactBox.svelte";
  import PageHeader from "../components/PageHeader.svelte";
  import InfoSection from "../components/producer/InfoSection.svelte";
</script>

<style>

</style>

<svelte:head>
  <title>Ocitanda - Produtor</title>
</svelte:head>

<section class="flex flex-col overflow-hidden">
  <PageHeader
    title="Um meio para os fornecedores"
    subTitle="Criamos laços com os nossos fornecedores"
    imgSrc="/greenhouse-X1.jpg"
    imgAlt="greenhouse" />

  <InfoSection
    title="Nossa relação com os produtores"
    src="/ocitanda/24.jpg"
    alt="agriculture" />
  <InfoSection
    title="Desde a plantação até a conheita"
    src="/ocitanda/2.jpg"
    alt="agriculture" reverse />
  
   <ContactBox />
</section>
