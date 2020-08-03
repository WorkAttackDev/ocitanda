<script>
//   import PageHeader from "../components/PageHeader.svelte";
//   import Button from "../components/Button.svelte";
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  h1 {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<!-- <PageHeader
  imgAlt="Page not found"
  imgSrc="/404.jpg"
  title="Pagina não encontrada"
  subTitle="O nosso servidor não encontrou esta página">
  <Button href="/">Voltar ao Início</Button>
</PageHeader> -->

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
