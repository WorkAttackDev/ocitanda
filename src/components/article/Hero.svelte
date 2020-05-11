<script>
  export let title;
  export let cover;
  export let tags;
</script>

<style>

</style>

<header
  class="relative flex flex-col justify-center items-center mb-20 -mt-20 -mx-5
  py-20 px-10 text-white text-center">
  <img
    class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
    src={cover}
    alt={title} />
  <div
    class="absolute top-0 left-0 w-full h-full bg-black opacity-50
    pointer-events-none" />
  <span class="relative flex flex-wrap justify-center">
    {#each tags as tag}
      <small class="mx-4 my-2">{tag}</small>
    {/each}
  </span>
  <h1 class="relative text-6xl font-bold">{title}</h1>
</header>
