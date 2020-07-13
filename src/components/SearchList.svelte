<script>
  import { fade } from "svelte/transition";
  import Loading from "./Loading.svelte";

  export let products = [],
    loading = false;
</script>

<style>

</style>

<ul class="mt-8 p-4 shadow-lg">
  {#if loading}
    <Loading />
  {:else}
    {#each products as sProd}
      <li transition:fade class="mb-4 text-ocitanda-green text-lg shadow">
        <a on:click class="flex items-center" href={`/product/${sProd.id}`}>
          <figure class="w-1/3 h-20 mr-4">
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
