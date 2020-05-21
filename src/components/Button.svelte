<script>
  export let className = "";
  export let scrollTop = false;
</script>

<style>
  .scrollTop {
    position: absolute;
    top: -1rem;
    right: 1rem;
  }
</style>
<button on:click class:scrollTop class={"px-4 py-2 bg-ocitanda-green text-ocitanda-beige "+ className}>
  <slot>lorem ipum</slot>
</button>
