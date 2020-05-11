<script>
  export let className;
  export let disabled = false;
</script>

<style>
  button:disabled {
    background-color: gray;
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }
</style>

<button
  on:click
  {disabled}
  class={'w-auto border-none bg-primary-500 hover:bg-primary-700 px-6 py-2 text-white transition duration-300 ease-in-out' + ' ' + className}>
  <slot>lorem</slot>
</button>
