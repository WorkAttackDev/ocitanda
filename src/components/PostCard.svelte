<script>
  import { createEventDispatcher } from "svelte";

  export let post;

  const dispatch = createEventDispatcher();

  function truncate(string = "") {
    if (string.length < 120) return string;
    const trucatedString = string.substring(0, 120);
    return trucatedString.endsWith("...")
      ? trucatedString
      : trucatedString + "...";
  }

  function imgLoadError(e) {
    e.target.src = "/successkid.jpg";
  }
</script>

<article class="w-full md:w-1/3 break-words p-4 ">
  <div on:click class="shadow-xs cursor-pointer">
    {#if post.img}
      <img
        loading="lazy"
        class="mb-3"
        src={post.img}
        on:error={imgLoadError}
        alt="teste" />
    {/if}
    <span class="flex flex-wrap m-2">
      {#each post.tags as tag}
        <p class="font-semibold text-primary-400 my-1 mx-2">#{tag}</p>
      {/each}
    </span>
    <h1 class="text-2xl text-primary-800 font-bold mb-1 px-4">{post.title}</h1>
    <h3 class="text-primary-700 text-lg px-4 pb-4">{truncate(post.desc)}</h3>
  </div>
</article>
