<script>
  import { onMount } from "svelte";
  import { user } from "./../stores/user.js";
  import { cart } from "./../stores/cart";
  import { stores } from "@sapper/app";

  import ComingSoon from "./../components/coming/ComingSoon.svelte";
  import Header from "../components/Header.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import Footer from "../components/Footer.svelte";

  onMount(async () => {
    const authInfo = JSON.parse(localStorage.getItem("user"));

    if (authInfo && new Date(authInfo.expiryDate) > new Date()) {
      await user.login(authInfo);
      await cart.initCart(authInfo.consumer.id, authInfo.token);
    } else {
    }
  });

  const { preloading } = stores();
  const ready = true;
</script>

{#if ready}
  <Header />
  <main
    class="flex container flex-col max-w-screen-xxl mx-auto pt-12 md:pt-16 pb-10
    ">
    <slot />
  </main>
  <Footer />
{:else}
  <ComingSoon />
{/if}

{#if $preloading}
  <LoadingOverlay />
{/if}
