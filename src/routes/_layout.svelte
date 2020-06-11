<script>
  import { onMount } from "svelte";
  import { user } from "./../stores/user.js";
  import { stores } from "@sapper/app";

  import ComingSoon from "./../components/coming/ComingSoon.svelte";
  import Header from "../components/Header.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import Footer from "../components/Footer.svelte";

  onMount(() => {
    const authInfo = JSON.parse(localStorage.getItem("user"));
    if (authInfo) user.login(authInfo);
  });

  const { preloading } = stores();
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

{#if $preloading}
  <LoadingOverlay />
{/if}
