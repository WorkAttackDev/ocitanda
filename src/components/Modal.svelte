<script>
  import { MobileCancelMajorMonotone } from "svelte-polaris-icons";
  import { createEventDispatcher } from "svelte";
  import { scale, fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
</script>

<style>
  section {
    top: 50%;
    left: 50%;
  }
</style>

<section
  transition:scale
  class="fixed flex flex-col transform -translate-x-1/2 -translate-y-1/2 z-50
  bg-white w-full h-full overflow-x-auto md:w-auto md:h-40 md:rounded shadow-xl p-5">
  <MobileCancelMajorMonotone
    on:click={() => dispatch('close')}
    class="w-5 min-h-5 ml-auto mb-8 md:w-6" />
  <slot />
</section>

<div
  on:click={() => dispatch('close')}
  transition:fade
  class="fixed z-40 w-full h-full bg-black opacity-50" />
