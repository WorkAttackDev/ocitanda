<script>
  import { createEventDispatcher } from "svelte";
  import PostCard from "./PostCard.svelte";

  export let posts;

  const dispatch = createEventDispatcher();
</script>

<style>

</style>

<section class="flex flex-wrap -m-4">
  {#each posts as post}
    <PostCard on:click={() => dispatch('getpost', post.id)} {post} />
  {/each}
</section>
