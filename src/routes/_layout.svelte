<script>
  import { stores } from "@sapper/app";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import BottomMenu from "../components/BottomMenu.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";

  const { preloading } = stores();
  let showMenu = false;
</script>

<style>

</style>

<Header on:showmenu={() => (showMenu = !showMenu)} {showMenu} />
<main class="flex container flex-col max-w-screen-xl mx-auto pt-24 pb-12">
  <slot />
</main>
{#if showMenu}
  <BottomMenu on:close={() => (showMenu = false)} />
{/if}
<Footer />

{#if $preloading}
  <LoadingOverlay />
{/if}
