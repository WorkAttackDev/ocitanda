<script>
  export let className = "",
    disabled = false,
    scrollTop = false,
    small = false,
    href = "",
    type = "button",
    link = false;
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

  
  button::before,
  a::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #ffffff6c, transparent);
    transition: 0.5s ease-out;
  }
  
  button:hover::before,
  a:hover::before {
    left: 100%;
  }
  
  .link {
    @apply bg-ocitanda-beige text-ocitanda-green;
  }
  .small{
    @apply px-4 py-1 text-sm;
  }
  
  </style>

{#if !href}
  <button
    {disabled}
    {type}
    on:click
    class:scrollTop
    class:link
    class:small
    class={'relative flex items-center justify-center px-4 py-2 bg-ocitanda-green text-ocitanda-beige capitalize hover:bg-ocitanda-khaki hover:text-ocitanda-green hover:shadow overflow-hidden ' + className}>
    <slot>lorem ipum</slot>
  </button>
{:else}
  <a
    rel="prefetch"
    class:disabled
    class:link
    class:small
    href={disabled ? '' : href}
    class={'relative flex items-center justify-center px-4 py-2 bg-ocitanda-green text-ocitanda-beige capitalize hover:bg-ocitanda-khaki hover:text-ocitanda-green hover:shadow overflow-hidden ' + className}>
    <slot>lorem ipum</slot>
  </a>
{/if}
