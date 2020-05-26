<script>
  import { ArrowRightMinor, SearchMajorMonotone } from "svelte-polaris-icons";

  export let value;
  export let placeholder = "Digite aqui";
  export let typeSearch = false;
  export let className = "";
  export let type = "text";
</script>

<style>

</style>

<div
  class={'relative flex rounded-sm py-2 px-3 bg-ocitanda-beige border-b-2 md:border-b-3 border-gray-400 hover:border-ocitanda-green ' + className}>
  {#if type === "password"}
  <input type="password"
    class="flex-grow md:text-lg leading-6 align-middle transition-colors
    duration-300 bg-ocitanda-beige outline-none"
    {placeholder}
    bind:value />
  {:else}
  <input
    class="flex-grow md:text-lg leading-6 align-middle transition-colors
    duration-300 bg-ocitanda-beige outline-none"
    type="text"
    {placeholder}
    bind:value />
  {/if}
  <button
    type="submit"
    class="text-ocitanda-khaki text-2xl leading-6 align-middle transition-colors
    duration-300">
    <slot>
      {#if typeSearch}
        <SearchMajorMonotone class="w-4 text-gray-500 fill-current" />
      {:else}
        <ArrowRightMinor class="w-4 text-gray-500 fill-current" />
      {/if}
    </slot>
  </button>
</div>
