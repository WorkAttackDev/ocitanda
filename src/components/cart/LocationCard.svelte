<script>
  import { createEventDispatcher } from "svelte";
  import MobileCancelMajorMonotone from "svelte-polaris-icons/lib/MobileCancelMajorMonotone/MobileCancelMajorMonotone.svelte";
  import { slide } from "svelte/transition";
  import ConsumerLocation from "../../models/ConsumerLocation";

  const dispatch = createEventDispatcher();
  export let location = ConsumerLocation({});
  export let noDelete = false;
</script>

<article
  transition:slide={{ duration: 500 }}
  class="flex flex-col w-full min-w-56 my-4 bg-gray-200 shadow-md p-2
    text-center">
  <span class="flex justify-between w-full text-gray-800 px-2 my-4">
    <h1 class="text-base font-bold text-gray-800 mx-auto mb-2">Localização</h1>
    {#if !noDelete}
      <MobileCancelMajorMonotone
        on:click={() => dispatch('delete', location.id)}
        class="w-1 h-1 fill-current hover:text-ocitanda-brown" />
    {/if}
  </span>
  <p><strong>Bairro:</strong> {location.neighborhood}</p>
  <p><strong>Rua:</strong> {location.street}</p>
  <p><strong>Residência:</strong> {location.house}</p>
  <p><strong>Mais Informações:</strong> {location.details}</p>
  <p><strong>Número de telemovel:</strong> {location.extra_phone}</p>
  <slot />
</article>
