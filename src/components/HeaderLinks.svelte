<script>
  export let links, page;
</script>

<style>
  .active {
    @apply border-b-2 border-ocitanda-orange;
  }
</style>

<ul class="hidden captalize text-xs lg:flex md:mr-auto">
  {#each links as { name, href }}
    <li
      class="mx-4 hover:text-ocitanda-oborder-ocitanda-orange"
      class:active={href === $page.path || $page.path.substring(0, 10) === href.substring(0, 10)}>
      <a {href}>{name}</a>
    </li>
  {/each}
</ul>
