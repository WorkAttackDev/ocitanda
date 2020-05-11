<script context="module">
  import Post from "../../models/Post";

  export async function preload(page) {
    const { id } = page.params;

    const handleOnline = async () => {
      const res = await this.fetch(`https://dev.to/api/articles/${id}`);
      let article = await res.json();

      const post = Post(
        article.id,
        article.title,
        article.description,
        article.tags,
        article["cover_image"],
        article["body_html"]
      );

      localStorage.setItem(`article${post.id}`, JSON.stringify(post));

      return post;
    };

    const handleOffline = () => {
      let savedPost = Post();
      savedPost = JSON.parse(localStorage.getItem(`article${id}`));

      if (!savedPost && !savedPost.id) {
        console.log("post não disponivel offline!");
        return {};
      }

      return savedPost;
    };

    // init
    const isOnline = navigator.onLine;
    let post;

    if (isOnline) {
      post = await handleOnline();
    } else {
      post = handleOffline();
    }

    return { post };
  }
</script>

<script>
  import Hero from "../../components/article/Hero.svelte";

  export let post = Post();
</script>

<style>

</style>

<svelte:head>
  <title>WAB - {post.title || 'Não foi possivel carregar'}</title>
  <link rel="stylesheet" href="article.css" />
</svelte:head>

<Hero title={post.title} tags={post.tags} cover={post.img} />
<section class="wab-article px-20">
  {@html post.body}
</section>
