<script>
  import { MobileCancelMajorMonotone } from "svelte-polaris-icons";
  import { createEventDispatcher } from "svelte";
  import { slide, fade } from "svelte/transition";

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
</style>

<section
  transition:slide
  class="fixed flex flex-col transform -translate-x-1/2 z-50
  bg-white w-full h-auto md:w-auto md:h-40 md:rounded shadow-xl p-5">
  <MobileCancelMajorMonotone
    on:click={() => dispatch('close')}
    class="absolute w-5 ml-auto mb-8 md:w-6" />
  <slot />
</section>

<div
  on:click={() => dispatch('close')}
  transition:fade
  class="fixed top-0 left-0 z-40 w-full h-full bg-black opacity-50" />
