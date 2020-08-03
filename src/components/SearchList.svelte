<script>
  import { fade } from "svelte/transition";
  import Loading from "./Loading.svelte";

  export let products = [],
    loading = false;
</script>

<style>
  ul {
    overscroll-behavior: x contain;
    scroll-snap-type: x proximity;
  }

  li {
    scroll-snap-align: center;
    box-shadow: 0px 2px 5px #00000054;
    transition: box-shadow .3s ease-out;
  }
</style>

<ul class="flex overflow-x-auto  mt-8 p-4 ">
  {#if loading}
    <Loading />
  {:else}
    {#each products as sProd}
      <li transition:fade class="flex mr-4 mb-4 text-ocitanda-green text-lg shadow">
        <a on:click class="flex text-center justify-center flex-col items-center px-4 py-2" href={`/product/${sProd.id}`}>
          <figure class="w-32 h-24 mb-1 ">
            <img
              class="w-full h-full object-cover"
              src={sProd.img}
              alt={sProd.name} />
          </figure>
          {sProd.name}
        </a>
      </li>
    {:else}
      <p transition:fade class="text-xl p-4">Nenhum produto encontrado</p>
    {/each}
  {/if}
</ul>
