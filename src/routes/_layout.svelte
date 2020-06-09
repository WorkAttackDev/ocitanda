<script>
  import ComingSoon from "./../components/coming/ComingSoon.svelte";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";

  const ready = true;
</script>

<style>

</style>

{#if ready}
  <Header />
  <main
    class="flex container flex-col max-w-screen-xl mx-auto pt-12 md:pt-16 pb-10">
    <slot />
  </main>
  <Footer />
{:else}
  <ComingSoon />
{/if}
