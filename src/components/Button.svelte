<script>
  export let className = "",
    disabled = false,
    scrollTop = false,
    href = "",
    type = "button";
</script>

<style>
  .scrollTop {
    position: absolute;
    top: -1rem;
    right: 1rem;
  }
  button:disabled,
  .disabled {
    @apply bg-gray-400 text-gray-600 cursor-not-allowed pointer-events-none;
  }
</style>

{#if !href}
  <button
    {disabled}
    {type}
    on:click
    class:scrollTop
    class={'flex items-center justify-center px-4 py-2 bg-ocitanda-green text-ocitanda-beige capitalize hover:bg-ocitanda-khaki hover:text-ocitanda-green hover:shadow ' + className}>
    <slot>lorem ipum</slot>
  </button>
{:else}
  <a
    rel="prefetch"
    class:disabled
    href={disabled ? '' : href}
    class={'flex items-center justify-center px-4 py-2 bg-ocitanda-green text-ocitanda-beige capitalize hover:bg-ocitanda-khaki hover:text-ocitanda-green ' + className}>
    <slot>lorem ipum</slot>
  </a>
{/if}
