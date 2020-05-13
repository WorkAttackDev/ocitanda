<script>
  import Post from "../../models/Post";

  export let post = Post();
</script>

<style>

</style>

<header
  on:click
  class="relative cursor-pointer flex max-w-screen-xl flex-col justify-center
  items-center mb-20 -mt-20 py-20 px-10 text-white text-center">
  <img
    class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
    src={post.img}
    alt={post.title} />
  <div
    class="absolute top-0 left-0 w-full h-full bg-black opacity-50
    pointer-events-none" />
  <span class="relative flex flex-wrap justify-center">
    {#each post.tags as tag}
      <small class="mx-4 my-2">{tag}</small>
    {/each}
  </span>
  <h1 class="relative text-4xl md:text-6xl font-bold">{post.title}</h1>
  <h3 class="relative text-gray-100 text-lg px-4 pb-4">{post.desc}</h3>
</header>
