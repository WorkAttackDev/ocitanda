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
  import { products } from "../stores/products";
  import isAlphanumeric from "validator/lib/isAlphanumeric";
  import SearchList from "./SearchList.svelte";

  const { page } = stores();

  let searchValue = "",
    searchProducts = [],
    showSideBar = false,
    showSearchModal = false,
    searchLoading = false,
    timeout;

  $: if (!searchValue) searchProducts = [];

  const onGotoCart = async () => await goto("/cart");

  const onSearchProducts = async () => {
    if (!isAlphanumeric(searchValue.trim())) return;
    searchLoading = true;
    searchProducts = await products.searchProductsBySlug(searchValue);
    if (timeout) clearTimeout(timeout);
    setTimeout(() => (searchLoading = false), 500);
  };
</script>

<style>
  .active {
    @apply border-b-2 border-ocitanda-khaki;
  }

  header :global(svg) {
    @apply cursor-pointer transition duration-300;
  }
</style>

<header
  class="fixed z-40 left-0 top-0 w-full h-12 md:h-16 px-4 bg-ocitanda-green
  text-ocitanda-beige">
  <nav class="container mx-auto h-full flex justify-between items-center">
    {#if $page.path.substring(0, 9) === '/product/'}
      <ArrowLeftMinor
        on:click={() => window.history.back()}
        class="w-6 md:w-7 md:mr-8 fill-current hover:text-ocitanda-khaki" />
    {:else}
      <MenuIcon
        on:click={() => (showSideBar = true)}
        className="md:w-8 lg:hidden fill-current text-ocitanda-beige
        hover:text-ocitanda-khaki" />
    {/if}

    <a
      href="/"
      class="font-bold uppercase ml-auto -mr-8 md:text-xl lg:ml-0 lg:mr-auto">
      Ocitanda
    </a>
    <ul class="hidden uppercase text-sm lg:flex md:mr-auto">
      {#each links as { name, href }}
        <li
          class="mx-4 hover:text-ocitanda-khaki"
          class:active={href === $page.path || $page.path.substring(0, 10) === href.substring(0, 10)}>
          <a {href}>{name}</a>
        </li>
      {/each}
    </ul>
    {#if $page.path !== '/consumer'}
      <UserAvatar dropDownMode />
    {/if}
    <CartMajorMonotone
      on:click={onGotoCart}
      class="w-4 fill-current ml-auto mr-8 md:w-5 hover:text-ocitanda-khaki" />
    <SearchMajorMonotone
      on:click={() => (showSearchModal = true)}
      class="w-4 md:w-5 fill-current hover:text-ocitanda-khaki" />
  </nav>
</header>

{#if showSideBar}
  <SideBar on:close={() => (showSideBar = false)} />
{/if}

{#if showSearchModal}
  <Modal
    on:close={() => (showSearchModal = false)}
    className="overflow-x-hidden">
    <form on:submit|preventDefault={onSearchProducts}>
      <InputText
        typeSearch
        value={searchValue}
        placeholder="Procurar"
        on:validated={({ detail }) => (searchValue = detail)} />
    </form>
    <SearchList
      on:click={() => (showSearchModal = false)}
      products={searchProducts}
      loading={searchLoading} />
  </Modal>
{/if}
