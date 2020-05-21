<script>
  import { SearchMajorMonotone } from "svelte-polaris-icons";
  import MenuIcon from "./MenuIcon.svelte";
  import SideBar from "./SideBar.svelte";
  import Modal from "./Modal.svelte";
  import InputText from "./InputText.svelte";
  import { links } from "../data/links";

  let showSideBar = false;
  let showSearchModal = false;
</script>

<style>
  .active {
    @apply border-b-2 border-ocitanda-khaki;
  }
</style>

<header
  class="fixed z-40 left-0 top-0 w-full h-12 md:h-16 px-4 bg-ocitanda-green
  text-ocitanda-beige">
  <nav class="container mx-auto h-full flex justify-between items-center">
    <MenuIcon
      on:click={() => (showSideBar = true)}
      className="md:w-8 md:h-8 md:hidden fill-current text-ocitanda-beige" />
    <h1 class="font-bold md:text-xl uppercase">Ocitanda</h1>
    <ul class="hidden uppercase text-sm md:flex">
      {#each links as { name, href }}
        <li class="mx-4 hover:text-ocitanda-khaki" class:active={href === '/'}>
          <a {href}>{name}</a>
        </li>
      {/each}
    </ul>
    <SearchMajorMonotone
      on:click={() => (showSearchModal = true)}
      class="w-4 md:w-5 fill-current" />
  </nav>
</header>

{#if showSideBar}
  <SideBar on:close={() => (showSideBar = false)} />
{/if}

{#if showSearchModal}
  <Modal on:close={() => (showSearchModal = false)}>
    <InputText typeSearch placeholder="Procurar" />
  </Modal>
{/if}
