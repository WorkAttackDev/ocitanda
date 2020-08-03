<script>
  import { onMount } from "svelte";
  import { cart } from "./../stores/cart";
  import { notification } from "./../stores/notification";
  import { loading } from "./../stores/loading";
  import { stores } from "@sapper/app";
  import { AbandonedCartMajorMonotone } from "svelte-polaris-icons";

  import ComingSoon from "./../components/coming/ComingSoon.svelte";
  import Header from "../components/Header.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import Footer from "../components/Footer.svelte";
  import Notification from "../components/Notification.svelte";

  const { preloading, session } = stores();
  let ready = true;

  onMount(async () => {
    if ($session.isAuth) {
      await cart.initCart($session.user.id);
    }
  });
</script>

{#if ready}
  <Header />
  <main
    class="flex flex-col w-full max-w-screen-xxl mx-auto pt-12 pb-10">
    <slot />
  </main>
  <Footer />
{:else}
  <ComingSoon />
{/if}

{#if $preloading || $loading}
  <LoadingOverlay />
{/if}
{#if $notification.msg}
  <Notification
    minimal={$notification.minimal}
    title={$notification.title}
    msg={$notification.msg}
    type={$notification.type}
    href={$notification.button.href}
    buttonText={$notification.button.text}
    on:close={() => notification.close()}
    on:click={() => ($notification.button.onClick ? $notification.button.onClick() : null)} />
{/if}
