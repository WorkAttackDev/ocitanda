<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  export let links;

  const dispatch = createEventDispatcher();
</script>

<style>

</style>

<ul class="flex flex-col text-center capitalize text-sm text-gray-700">
  {#each links as { name, href }}
    <li class="mb-1 bg-ocitanda-beige hover:bg-ocitanda-khaki">
      <a transition:fade on:click={() => dispatch('close')} class="py-2 px-4 block" {href}>
        {name}
      </a>
    </li>
  {/each}
</ul>
