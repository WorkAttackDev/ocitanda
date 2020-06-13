<script>
  export let className = "";
  export let disabled = false;
  export let scrollTop = false;
</script>

<style>
  .scrollTop {
    position: absolute;
    top: -1rem;
    right: 1rem;
  }
  button:disabled {
    @apply bg-gray-400 text-gray-600 cursor-not-allowed;
  }
</style>

<button
  {disabled}
  on:click
  class:scrollTop
  class={'px-4 py-2 bg-ocitanda-green text-ocitanda-beige ' + className}>
  <slot>lorem ipum</slot>
</button>
