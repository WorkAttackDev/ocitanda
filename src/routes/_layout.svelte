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
<main class="flex flex-col max-w-screen-xl mx-auto pt-24 pb-12">
  <slot />
</main>
<Footer />

{#if $preloading}
  <LoadingOverlay />
{/if}
