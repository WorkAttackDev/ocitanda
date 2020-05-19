<script>
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  import CloseIcon from "./CloseIcon.svelte";

  const dispatch = createEventDispatcher();
</script>

<aside
  transition:fly={{ x: -window.innerWidth }}
  class="fixed z-50 bg-white left-0 top-0 w-3/4 h-full">
  <header
    class="flex justify-between items-center w-full h-10 md:h-16 px-4
    bg-ocitanda-khaki">
    <h1 class="font-bold md:text-xl">Ocitanda</h1>
    <CloseIcon on:click={() => dispatch('close')} className="md:w-8 md:h-8" />
  </header>
  <h3 class="uppercase text-center my-4">Menu</h3>
  <ul class="flex flex-col text-center">
    <li class="py-2 px-4 mb-1 bg-ocitanda-beige hover:bg-ocitanda-khaki">
      Início
    </li>
    <li class="py-2 px-4 mb-1 bg-ocitanda-beige hover:bg-ocitanda-khaki">
      Produtos
    </li>
    <li class="py-2 px-4 mb-1 bg-ocitanda-beige hover:bg-ocitanda-khaki">
      Cesta
    </li>
    <li class="py-2 px-4 mb-1 bg-ocitanda-beige hover:bg-ocitanda-khaki">
      Fornecedor
    </li>
    <li class="py-2 px-4 mb-1 bg-ocitanda-beige hover:bg-ocitanda-khaki">
      Sobre
    </li>
  </ul>
</aside>
<div
  transition:fade
  on:click={() => dispatch('close')}
  class="fixed w-full h-full z-40 bg-black opacity-50 " />
