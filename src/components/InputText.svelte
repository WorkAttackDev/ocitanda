<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { ArrowRightMinor, SearchMajorMonotone } from "svelte-polaris-icons";

  export let value,
    typeSearch = false,
    className = "",
    type = "text",
    disabled = false,
    validators = [],
    label = "",
    name = "";

  const dispatch = createEventDispatcher();
  let errorStack = "";

  const validateInput = (e) => {
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
  .error-p-100 {
    bottom: -100%;
  }
  .error-p-40 {
    bottom: -40%;
  }
  label {
    position: absolute;
    @apply transition-all duration-300 ease-out opacity-75 font-semibold;
  }
  input:required{
    outline: none;
  }
  input:focus + label,
  textarea:focus + label,
  input:valid + label,
  textarea:valid + label {
    @apply text-xs text-ocitanda-green transform -translate-y-8 opacity-100 font-bold;
  }
</style>

<div
  class:error={errorStack}
  class={'relative flex rounded-sm py-2 px-3 bg-ocitanda-beige border-b-2 md:border-b-3 border-gray-400 hover:border-ocitanda-green ' + className}>
  {#if type !== 'area'}
    <input
      id={name}
      autocomplete
      required
      {type}
      {value}
      class="flex-grow md:text-lg leading-6 align-middle transition-colors
      duration-300 bg-ocitanda-beige outline-none"
      {name}
      on:input={validateInput} />
    <label class="capitalize pointer-events-none" for={name}>{label}</label>
    {#if !disabled}
      <button
        type="submit"
        {disabled}
        class="text-ocitanda-khaki text-2xl leading-6 align-middle
        transition-colors duration-300 outline-none hover:text-ocitanda-green">
        <slot>
          {#if typeSearch}
            <SearchMajorMonotone class="w-4 text-gray-500 fill-current" />
          {:else}
            <ArrowRightMinor
              on:click={() => dispatch('send')}
              class="w-4 text-gray-500 fill-current" />
          {/if}
        </slot>
      </button>
    {/if}
  {:else}
    <textarea
      required
      on:input={validateInput}
      class="flex-grow md:text-lg leading-6 align-middle transition-colors
      duration-300 bg-ocitanda-beige outline-none"
      {name}
      {value}
      rows="5" />
    <label class="capitalize" for={name}>{label}</label>
  {/if}

  {#if errorStack}
    <p
      transition:slide
      class:error-p-100={type !== 'area'}
      class:error-p-40={type === 'area'}
      class="absolute right-0 flex flex-col text-xs text-ocitanda-brown mb-3 mx-2">
      {errorStack}
    </p>
  {/if}
</div>
