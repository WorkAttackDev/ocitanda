<script>
  import { MobileCancelMajorMonotone } from "svelte-polaris-icons";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import Button from "./Button.svelte";
  import Backdrop from "./Backdrop.svelte";

  export let msg = "",
    minimal = false,
    type = "info",
    buttonText = "",
    title = "Notificação",
    href = "",
    isSlot = false;

  let timeout;

  const dispatch = createEventDispatcher();

  if (minimal) {
    if (timeout) clearTimeout();
    setTimeout(() => {
      dispatch("close");
    }, 5000);
  }
</script>

<style>
  section {
    top: 0;
    left: 50%;
  }

  section :global(svg) {
    right: 1rem;
  }

  .minimal {
    position: fixed;
    bottom: 5%;
    top: auto;
    max-width: 90%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem;
    min-height: 1rem;
    box-shadow: 0px 0px 1px 2px #00000062;
    @apply rounded-sm;
  }

  .minimal p {
    width: 90%;
  }

  .error {
    @apply text-ocitanda-brown;
  }
  .success {
    @apply text-ocitanda-green;
  }
  /* .warning {
    @apply text-ocitanda-gold;
  } */
</style>

<section
  transition:slide
  class:minimal
  class="fixed flex flex-col transform -translate-x-1/2 z-50 bg-white w-full
  text-grey-700 h-auto md:w-auto md:min-h-40 md:rounded shadow-xl p-5">
  <MobileCancelMajorMonotone
    on:click={()=> dispatch("close")}
    class="absolute w-5 ml-auto mb-8 cursor-pointer fill-current
    hover:text-ocitanda-brown md:w-6" />

  {#if isSlot}
    <slot />
  {:else}
    {#if !minimal}
      <h1
        class="text-2xl font-bold w-11/12"
        class:error={type.toLowerCase() === 'error'}
        class:success={type.toLowerCase() === 'success'}>
        {title}
      </h1>
    {/if}
    <p class="text-lg lg:text-xl">{msg}</p>
    {#if buttonText && !href}
      <Button className="my-2" on:click>{buttonText}</Button>
    {/if}
    {#if buttonText && href}
      <Button className="my-2" {href}>{buttonText}</Button>
    {/if}
  {/if}
</section>

{#if !minimal}
  <Backdrop on:close />
{/if}
