<script>
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  import CloseIcon from "./CloseIcon.svelte";
  import { links } from "../data/links";

  const dispatch = createEventDispatcher();
</script>

<aside
  transition:fly={{ x: -window.innerWidth }}
  class="fixed z-50 bg-white left-0 top-0 w-3/4 h-full">
  <header
    class="flex justify-between items-center w-full h-12 md:h-16 px-4
    bg-ocitanda-green text-ocitanda-beige">
    <h1 class="font-bold md:text-xl">Ocitanda</h1>
    <CloseIcon
      on:click={() => dispatch('close')}
      className="md:w-8 md:h-8 fill-current" />
  </header>
  <h3 class="uppercase font-bold text-ocitanda-green text-center my-4">Menu</h3>
  <ul class="flex flex-col text-center uppercase text-sm text-ocitanda-green">
    {#each links as { name, href }}
      <li class="mb-1 bg-ocitanda-beige hover:bg-ocitanda-khaki">
        <a class="py-2 px-4 block" {href}>{name}</a>
      </li>
    {/each}
  </ul>
</aside>
<div
  transition:fade
  on:click={() => dispatch('close')}
  class="fixed w-full h-full z-40 bg-black opacity-50 " />
