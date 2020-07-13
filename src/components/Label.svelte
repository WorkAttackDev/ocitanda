<script>
  export let active = true,
    className = "";
</script>

<style>
  .active {
    @apply bg-ocitanda-green text-ocitanda-beige;
  }
</style>

<button
  on:click
  class:active={active}
  class={'flex items-center justify-center px-4 py-2 bg-gray-600 text-gray-900 capitalize hover:bg-ocitanda-khaki hover:text-ocitanda-green hover:shadow ' + className}>
  <slot>Lorem</slot>
</button>
