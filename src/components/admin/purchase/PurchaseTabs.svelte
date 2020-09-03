<script>
  import { createEventDispatcher } from "svelte";

  export let index = 0;

  const dispatch = createEventDispatcher();
  const tabs = ["Não pago", "Pago", "Entregue"];
</script>

<style>
  button {
    transition: background 0.3s ease-out, color 0.3s ease-out;
  }

  .active {
    @apply bg-ocitanda-green text-white;
  }
</style>

<article class="flex rounded-sm">
  {#each tabs as _t, i}
    <button
      class:active={index === i}
      class="w-full capitalize p-2 text-gray-700 bg-gray-200"
      on:click={() => index !== i && dispatch('switch', i)}>
      {_t}
    </button>
  {/each}
</article>
