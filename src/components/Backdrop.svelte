<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
</script>

<div
  on:click={() => dispatch('close')}
  transition:fade
  class="fixed top-0 left-0 z-40 w-full h-full bg-black opacity-75" />
