<script>
  import PageHeader from "../components/PageHeader.svelte";
  import Button from "../components/Button.svelte";
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<section class="flex flex-col items-center text-center mx-auto p-8 w-full md:w-3/5">
  <img class="w-40 mb-4 xs:w-80" src="/logo_vertical.png" alt="logo ocitanda vertical">
  <h1 class="mb-4 text-xl font-bold">{status} - Página não Encontrada</h1>
  <p class="mb-4">A página requisitada não foi encontrada.</p>
  <Button href="/">Voltar ao Início</Button>
</section>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
