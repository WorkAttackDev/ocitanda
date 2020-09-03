<script>
  import { createEventDispatcher } from "svelte";
  import { stores } from "@sapper/app";
  import { fly, fade } from "svelte/transition";
  import CloseIcon from "./CloseIcon.svelte";
  import UserAvatar from "./UserAvatar.svelte";
  import { links, adminLinks } from "../data/links";
  import Label from "./Label.svelte";
  import SideBarList from "./SideBarList.svelte";
  import InputText from "./InputText.svelte";

  const { page } = stores();
  const dispatch = createEventDispatcher();

  let activeAdmin = $page.path.startsWith("/admin");

  $: activeLinks = activeAdmin ? adminLinks : links;
</script>

<aside
  transition:fly={{ x: -window.innerWidth }}
  class="fixed z-50 bg-white left-0 top-0 h-full w-3/4 md:w-2/4 pb-8">
  <header
    class="flex justify-between items-center shadow w-full h-12 md:h-16 px-4
    bg-white text-ocitanda-green">
    <img class="w-32" src="/logo_horizontal.png" alt="OCITANDA logo" />
    <CloseIcon
      on:click={() => dispatch('close')}
      className="md:w-8 md:h-8 fill-current" />
  </header>
  <div class="overflow-y-auto h-full pb-12">
    <UserAvatar on:close />
    <div class="px-4" on:click={() => dispatch('search')}>
      <InputText name="search_place" typeSearch value="" label="Procurar" />
    </div>
    <h3 class="uppercase font-bold text-ocitanda-green text-center my-4">
      Menu
    </h3>
    {#if $page.path.startsWith('/admin')}
      <span class="flex mb-4">
        <Label
          className="w-full"
          active={activeAdmin}
          on:click={() => (activeAdmin = true)}>
          Admin
        </Label>
        <Label
          className="w-full"
          active={!activeAdmin}
          on:click={() => (activeAdmin = false)}>
          Site
        </Label>
      </span>
    {/if}

    <SideBarList links={activeLinks} on:close />
  </div>
</aside>
<div
  transition:fade
  on:click={() => dispatch('close')}
  class="fixed w-full h-full z-40 bg-black opacity-50 " />
