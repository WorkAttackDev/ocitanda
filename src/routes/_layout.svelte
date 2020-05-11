<script>
  import { stores } from "@sapper/app";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";

  const { preloading } = stores();
</script>

<style>

</style>

<Header />
<main class="container mx-auto py-24 px-4">
  <slot />
</main>
<Footer />

{#if $preloading}
  <LoadingOverlay />
{/if}
