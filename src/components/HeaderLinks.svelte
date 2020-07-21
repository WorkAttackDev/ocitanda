<script>
    export let links, page;
</script>

<style>
    
</style>

<ul class="hidden uppercase text-sm lg:flex md:mr-auto">
    {#each links as { name, href }}
      <li
        class="mx-4 hover:text-ocitanda-khaki"
        class:active={href === $page.path || $page.path.substring(0, 10) === href.substring(0, 10)}>
        <a {href}>{name}</a>
      </li>
    {/each}
  </ul>