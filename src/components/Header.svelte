<script>
  import MenuIcon from "./MenuIcon.svelte";
  import SearchIcon from "./SearchIcon.svelte";
</script>

<header
  class="fixed z-40 left-0 top-0 flex justify-between items-center w-full h-10
  md:h-16 px-4 bg-ocitanda-khaki">
  <MenuIcon className="md:w-8 md:h-8" />
  <h1 class="font-bold md:text-xl">Ocitanda</h1>
  <SearchIcon className="md:w-6 md:h-6" />
</header>
