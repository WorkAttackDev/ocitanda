<script context="module">
  export async function preload(page) {
    const { number } = page.params;

    function handleOffline() {
      const posts = JSON.parse(localStorage.getItem("posts" + number));
      if (!posts.length) throw new Error("Error on local storage!");
      return posts;
    }

    async function handleOnline() {
      let data;
      const res = await fetch(`https://dev.to/api/articles?page=${number}`);
      data = await res.json();
      localStorage.setItem("posts" + number, JSON.stringify(data));
      return data;
    }

    // init
    const isOnline = navigator.onLine;

    let data;
    let posts = [];

    if (isOnline) {
      data = await handleOnline();
    } else {
      data = handleOffline();
    }

    posts = data.map(_d =>
      Post(_d.id, _d.title, _d.description, _d["tag_list"], _d["cover_image"])
    );

    return { posts, number };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  // import paginationStore from "../../stores/pagination";
  import PostsGrid from "../../components/PostsGrid.svelte";
  import Pagination from "../../components/Pagination.svelte";
  import LoadingOverlay from "../../components/LoadingOverlay.svelte";

  import Post from "../../models/Post";

  export let posts;
  export let number;

  let isOnline;
  let isFetching = true;

  onMount(() => {
    isFetching = false;
  });

  async function getPost(id) {
    await goto(`/articles/${id}`);
  }

  async function nextPage() {
    // paginationStore.nextPage();
    isFetching = true;
    await goto(`/page/${++number}`);
    isFetching = false;
  }

  async function prevPage() {
    if (number <= 0) return;
    // paginationStore.prevPage();
    isFetching = true;
    await goto(`/page/${--number}`);
    isFetching = false;
  }
</script>

<svelte:head>
  <title>{`WAB - artigos página ${number}`}</title>
</svelte:head>

<Pagination on:prev={prevPage} on:next={nextPage} pageCount={number} />
<PostsGrid {posts} on:getpost={e => getPost(e.detail)} />
<Pagination on:prev={prevPage} on:next={nextPage} pageCount={number} />

{#if isFetching}
  <LoadingOverlay />
{/if}
