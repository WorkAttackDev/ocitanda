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
  import { links, adminLinks } from "../data/links";
  import { products } from "../stores/products";
  import isAlphanumeric from "validator/lib/isAlphanumeric";
  import SearchList from "./SearchList.svelte";
  import HeaderLinks from "./HeaderLinks.svelte";

  const { page } = stores();

  let searchValue = "",
    searchProducts = [],
    showSideBar = false,
    showSearchModal = false,
    searchLoading = false,
    timeout;

  $: activeLinks = $page.path.startsWith("/admin") ? adminLinks : links;

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
  header :global(svg) {
    @apply cursor-pointer transition duration-300;
  }
</style>

<header
  class="fixed z-40 left-0 top-0 w-full shadow h-12 px-4 bg-white
  text-gray-700">
  <nav class="container mx-auto h-full flex justify-between items-center">
    {#if $page.path.substring(0, 9) !== '/'}
      <ArrowLeftMinor
        on:click={() => window.history.back()}
        class="w-6 mr-4 md:w-7 md:mr-8 fill-current hover:text-ocitanda-orange" />
    {/if}
    <MenuIcon
      on:click={() => (showSideBar = true)}
      className="md:w-8 lg:hidden fill-current 
      hover:text-ocitanda-orange" />

    <a
      href="/"
      class="font-bold ml-auto md:text-xl lg:ml-0 lg:mr-auto">
      <img class="w-24" src="/logo_horizontal.svg" alt="OCITANDA logo">
    </a>
    <HeaderLinks links={activeLinks} {page} />
    {#if $page.path !== '/consumer'}
      <UserAvatar dropDownMode />
    {/if}
    <CartMajorMonotone
      on:click={onGotoCart}
      class="w-4 fill-current ml-auto xs:mr-8 md:w-5 hover:text-ocitanda-orange" />
    <SearchMajorMonotone
      on:click={() => (showSearchModal = true)}
      class="w-4 hidden xs:flex md:w-5 fill-current hover:text-ocitanda-orange" />
  </nav>
</header>

{#if showSideBar}
  <SideBar on:search={()=> showSearchModal = true} on:close={() => (showSideBar = false)} />
{/if}

{#if showSearchModal}
  <Modal
    on:close={() => (showSearchModal = false)}
    className="overflow-x-hidden">
    <form on:submit|preventDefault={onSearchProducts}>
      <InputText
        typeSearch
        value={searchValue}
        label="Procurar"
        on:validated={({ detail }) => (searchValue = detail)} />
    </form>
    <SearchList
      on:click={() => (showSearchModal = false)}
      products={searchProducts}
      loading={searchLoading} />
  </Modal>
{/if}
