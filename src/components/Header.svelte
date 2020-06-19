<script>
  import { stores, goto } from "@sapper/app";
  import {
    SearchMajorMonotone,
    ArrowLeftMinor,
    CartMajorMonotone,
  } from "svelte-polaris-icons";
  import MenuIcon from "./MenuIcon.svelte";
  import SideBar from "./SideBar.svelte";
  import Modal from "./Modal.svelte";
  import UserAvatar from "./UserAvatar.svelte";
  import InputText from "./InputText.svelte";
  import { links } from "../data/links";

  const { page } = stores();

  let showSideBar = false;
  let showSearchModal = false;

  const onGotoCart = async () => await goto("/cart");
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
    {#if $page.path.substring(0, 9) === '/product/'}
      <ArrowLeftMinor
        on:click={() => window.history.back()}
        class="w-6 md:w-7 md:mr-8 fill-current" />
    {:else}
      <MenuIcon
        on:click={() => (showSideBar = true)}
        className="md:w-8 lg:hidden fill-current text-ocitanda-beige" />
    {/if}

    <h1 class="font-bold uppercase ml-auto -mr-8 md:text-xl lg:ml-0 lg:mr-auto">
      Ocitanda
    </h1>
    <ul class="hidden uppercase text-sm lg:flex md:mr-auto">
      {#each links as { name, href }}
        <li class="mx-4 hover:text-ocitanda-khaki" class:active={href === $page.path}>
          <a {href}>{name}</a>
        </li>
      {/each}
    </ul>
    {#if $page.path !== '/consumer'}
      <UserAvatar dropDownMode />
    {/if}
    <CartMajorMonotone
      on:click={onGotoCart}
      class="w-4 fill-current ml-auto mr-8 md:w-5" />
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
