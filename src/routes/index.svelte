<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import paginationStore from "../stores/pagination";
  import PostsGrid from "../components/PostsGrid.svelte";
  import Pagination from "../components/Pagination.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";

  import Post from "../models/Post";

  let isOnline;
  let posts = [];
  let isFetching = true;

  onMount(() => {
    isOnline = navigator.onLine;
    isFetching = true;
    fetchData();
  });

  async function fetchData() {
    console.log(navigator.onLine);
    let response, data;
    if (isOnline) {
      response = await fetch(
        isOnline
          ? `https://dev.to/api/articles?page=${$paginationStore}`
          : "/data/posts.json"
      );
      data = await response.json();
    } else {
      const temp = JSON.parse(localStorage.getItem("posts"));
      if (!temp.length) throw new Error("Error on local storage!");
      data = temp;
    }
    localStorage.setItem("posts" + $paginationStore, JSON.stringify(data));
    posts = data.map(_d =>
      Post(_d.id, _d.title, _d.description, _d["tag_list"], _d["cover_image"])
    );
    isFetching = false;
  }

  async function getPost(id) {
    await goto(`/articles/${id}`);
  }

  function nextPage() {
    paginationStore.nextPage();
    isFetching = true;
    fetchData();
  }

  function prevPage() {
    if ($paginationStore <= 0) return;
    paginationStore.prevPage();
    isFetching = true;
    fetchData();
  }
</script>

<svelte:head>
  <title>WAB - WorkAttack Blog</title>
</svelte:head>

<PostsGrid {posts} on:getpost={e => getPost(e.detail)} />
<Pagination
  on:prev={prevPage}
  on:next={nextPage}
  pageCount={$paginationStore} />

{#if isFetching}
  <LoadingOverlay />
{/if}
