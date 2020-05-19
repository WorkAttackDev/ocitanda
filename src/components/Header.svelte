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
    @apply border-b-2 border-ocitanda-beige;
  }
</style>

<header
  class="fixed z-40 left-0 top-0 w-full h-10 md:h-16 px-4 bg-ocitanda-khaki">
  <nav class="container mx-auto h-full flex justify-between items-center">
    <MenuIcon
      on:click={() => (showSideBar = true)}
      className="md:w-8 md:h-8 md:hidden" />
    <h1 class="font-bold md:text-xl">Ocitanda</h1>
    <ul class="hidden md:flex">
      {#each links as { name, href }}
        <li class="mx-4 hover:text-ocitanda-beige" class:active={href === '/'}>
          <a {href}>{name}</a>
        </li>
      {/each}
    </ul>
    <SearchMajorMonotone
      on:click={() => (showSearchModal = true)}
      class="w-4 md:w-5 " />
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
