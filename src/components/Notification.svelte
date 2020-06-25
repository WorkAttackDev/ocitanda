<script>
  import { MobileCancelMajorMonotone } from "svelte-polaris-icons";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import Button from "./Button.svelte";
  import Backdrop from "./Backdrop.svelte";

  export let msg = "",
    type = "info",
    buttonText = "",
    title = "Notificação",
    href = "";

  const dispatch = createEventDispatcher();
</script>

<style>
  section {
    top: 0;
    left: 50%;
  }

  section :global(svg) {
    right: 1rem;
  }

  .error {
    @apply text-ocitanda-brown;
  }
  .success {
    @apply text-ocitanda-green;
  }
  .warning {
    @apply text-ocitanda-gold;
  }
</style>

<section
  transition:slide
  class="fixed flex flex-col transform -translate-x-1/2 z-50 bg-white w-full
  text-grey-700 h-auto md:w-auto md:h-40 md:rounded shadow-xl p-5">
  <MobileCancelMajorMonotone
    on:click={() => dispatch('close')}
    class="absolute w-5 ml-auto mb-8 cursor-pointer fill-current
    hover:text-ocitanda-brown md:w-6" />

  <h1
    class="text-2xl font-bold w-11/12"
    class:error={type === 'error'}
    class:success={type === 'success'}>
    {title}
  </h1>
  <p class="text-lg lg:text-xl">{msg}</p>
  {#if buttonText && !href}
    <Button className="my-2" on:click>{buttonText}</Button>
  {/if}
  {#if buttonText && href}
    <Button className="my-2" on:click>{buttonText}</Button>
  {/if}
</section>


<Backdrop on:close />