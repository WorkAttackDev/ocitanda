<script>
  import { MobileCancelMajorMonotone } from "svelte-polaris-icons";
  import { createEventDispatcher } from "svelte";
  import { scale, fade } from "svelte/transition";
   import Backdrop from "./Backdrop.svelte";

   export let className = "";
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
  class={`fixed flex flex-col transform -translate-x-1/2 -translate-y-1/2 z-50
  bg-white w-full h-full overflow-x-auto md:w-auto md:h-auto md:min-h-40
  md:max-h-11/12 md:rounded shadow-xl p-5 ${className}`}>
  <MobileCancelMajorMonotone
    on:click={() => dispatch('close')}
    class="w-5 min-h-5 ml-auto fill-current mb-8 cursor-pointer hover:text-ocitanda-brown md:w-6" />
  <slot />
</section>


<Backdrop on:close />
