<script>
  import { createEventDispatcher } from "svelte";
  import { stores, goto } from "@sapper/app";
  import Logo from "./Logo.svelte";
  import BackArrow from "./BackArrow.svelte";
  import MenuIcon from "./MenuIcon.svelte";

  import links from "../data/links";

  export let showMenu = false;

  const { page } = stores();
  const dispatch = createEventDispatcher();

  async function handleGoBack() {
    window.history.back();
  }
</script>

<header
  class="fixed z-30 flex h-16 w-full px-5 bg-primary-500 text-white shadow-xs">
  <nav class="container mx-auto flex items-center">
    <a
      class="w-32 md:w-24 flex justify-between md:mr-8 cursor-default"
      href="/">
      {#if $page.path !== '/'}
        <BackArrow on:click={handleGoBack} />
      {/if}
      <Logo />
    </a>
    <ul class="items-center w-4/6 -mx-2 hidden md:flex text-primary-100">
      {#each links as { name, href }}
        <li
          class="flex items-center h-8 px-2 uppercase hover:text-white
          transition duration-300 ease-out font-bold"
          class:text-white={$page.path === href || ($page.path.includes(href.substr(0, 6)) && name === 'Artigos')}>
          <a {href}>{name}</a>
        </li>
      {/each}
    </ul>
    <MenuIcon
      isOpen={showMenu}
      on:click={() => dispatch('showmenu')}
      className="w-auto ml-auto md:hidden" />
  </nav>
</header>
