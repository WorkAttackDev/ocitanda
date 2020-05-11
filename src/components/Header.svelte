<script>
  import { stores, goto } from "@sapper/app";
  import paginationStore from "../stores/pagination";
  import Logo from "./Logo.svelte";
  import BackArrow from "./BackArrow.svelte";
  import MenuIcon from "./MenuIcon.svelte";

  const { page } = stores();

  $: console.log($page.path);

  const Link = (name, href) => ({ name, href });

  const links = [Link("Início", "/"), Link("Teste", "#"), Link("Sobre", "#")];

  async function handleGoBack() {
    if ($page.path !== "/") {
      await goto("/");
      return;
    }

    paginationStore.prevPage();
  }
</script>

<header
  class="fixed z-50 flex h-16 w-full px-5 bg-primary-500 text-white shadow-xs">
  <nav class="container mx-auto flex items-center">
    <a class="w-5/6 md:w-24 flex justify-between mr-8 cursor-default" href="/">
      {#if $page.path !== '/' || $paginationStore > 1}
        <BackArrow on:click={handleGoBack} />
      {/if}
      <Logo />
    </a>
    <ul class="items-center w-4/6 -mx-2 hidden md:flex">
      {#each links as { name, href }}
        <li class="flex items-center h-8 px-2 uppercase font-bold">
          <a {href}>{name}</a>
        </li>
      {/each}
    </ul>
    <MenuIcon className="w-auto ml-auto" />
  </nav>
</header>
