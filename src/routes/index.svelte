<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import PostHero from "../components/home/PostHero.svelte";
  import paginationStore from "../stores/pagination";
  import PostsGrid from "../components/PostsGrid.svelte";
  import Pagination from "../components/Pagination.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import Button from "../components/Button.svelte";

  import Post from "../models/Post";

  let isOnline;
  let posts = [];
  let isFetching = true;

  onMount(async () => {
    isOnline = navigator.onLine;
    isFetching = true;
    let data;

    if (isOnline) {
      data = await handleOnline();
    } else {
      data = handleOffline();
    }

    posts = data.map(_d =>
      Post(_d.id, _d.title, _d.description, _d["tag_list"], _d["cover_image"])
    );
    isFetching = false;
  });

  async function handleOnline() {
    let data;
    const res = await fetch(`https://dev.to/api/articles?page=1`);
    data = await res.json();
    localStorage.setItem("posts1", JSON.stringify(data));
    return data.slice(0, 5);
  }

  async function getPost(id) {
    await goto(`/articles/${id}`);
  }

  function handleOffline() {
    const posts = JSON.parse(localStorage.getItem("posts" + $paginationStore));
    if (!posts.length) throw new Error("Error on local storage!");
    return posts.slice(0, 5);
  }
</script>

<svelte:head>
  <title>WAB - WorkAttack Blog</title>
</svelte:head>

<PostHero on:click={e => getPost(posts[0].id)} post={posts[0]} />
<PostsGrid posts={posts.slice(1)} on:getpost={e => getPost(e.detail)} />
<Button on:click={() => goto('/page/1')} className="items-center mt-4 mx-auto">
  Ver mais
</Button>

{#if isFetching}
  <LoadingOverlay />
{/if}
