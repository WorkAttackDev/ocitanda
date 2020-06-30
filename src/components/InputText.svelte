<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { ArrowRightMinor, SearchMajorMonotone } from "svelte-polaris-icons";

  export let value;
  export let placeholder = "Digite aqui";
  export let typeSearch = false;
  export let className = "";
  export let type = "text";
  export let disabled = false;
  export let validators = [];

  const dispatch = createEventDispatcher();
  let errorStack = "";

  const validateInput = e => {
    const value = e.target.value.trim();

    const isAllValid = validators.every(({ validator, errorMsg }) => {
      const isValid = validator(value) === true;
      if (!isValid) {
        errorStack = errorMsg;
        return false;
      }
      errorStack = "";
      return true;
    });

    dispatch("validated", isAllValid ? value : "");
  };
</script>

<style>
  .error {
    border-color: red;
  }
</style>

<div
  class:error={errorStack}
  class={'relative flex rounded-sm py-2 px-3 bg-ocitanda-beige border-b-2 md:border-b-3 border-gray-400 hover:border-ocitanda-green ' + className}>
  <input
    autocomplete
    {type}
    {value}
    class="flex-grow md:text-lg leading-6 align-middle transition-colors
    duration-300 bg-ocitanda-beige outline-none"
    {placeholder}
    on:input={validateInput} />
  {#if !disabled}
    <button
      type="submit"
      {disabled}
      class="text-ocitanda-khaki text-2xl leading-6 align-middle
      transition-colors duration-300">
      <slot>
        {#if typeSearch}
          <SearchMajorMonotone class="w-4 text-gray-500 fill-current" />
        {:else}
          <ArrowRightMinor on:click={()=> dispatch("send")} class="w-4 text-gray-500 fill-current" />
        {/if}
      </slot>
    </button>
  {/if}
</div>

{#if errorStack}
  <p transition:slide class="flex flex-col text-red-600 mb-3 mx-2">
    {errorStack}
  </p>
{/if}
