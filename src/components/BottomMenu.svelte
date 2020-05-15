<script>
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { circInOut } from "svelte/easing";
  import { stores } from "@sapper/app";

  import links from "../data/links";

  const dispatch = createEventDispatcher();
  const { page } = stores();
</script>

<div
  transition:fade={{ duration: 300 }}
  on:click={() => dispatch('close')}
  class="fixed z-40 w-full h-full left-0 top-0 bg-black opacity-25" />
<section
  transition:fly={{ duration: 500, y: window.innerHeight, easing: circInOut }}
  class="fixed z-50 flex flex-col justify-center bottom-0 w-full h-auto
  bg-primary-500 p-4 ">
  <ul class="w-full flex flex-col items-center text-primary-100">
    {#each links as { name, href }}
      <li
        on:click={() => dispatch('close')}
        class="flex items-center h-8 px-2 uppercase hover:text-white transition
        duration-300 ease-out font-bold"
        class:text-white={$page.path === href || ($page.path.includes(href.substr(0, 6)) && name === 'Artigos')}>
        <a {href}>{name}</a>
      </li>
    {/each}
  </ul>
</section>
