<script>
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<style>

</style>

<Header />
<main
  class="flex container flex-col max-w-screen-xl mx-auto pt-10 md:pt-16 pb-10">
  <slot />
</main>
<Footer />
