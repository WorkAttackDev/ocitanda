<script>
  import Button from "./Button.svelte";
  export let className = "";
</script>

<style>
  article {
    scroll-snap-align: center;
  }
</style>

<article class={'w-64' + ' ' + className}>
  <img
    class="w-full h-56 object-cover"
    src="/vegetables.jpg"
    alt="vegetables" />
  <div class="flex flex-col p-4 bg-ocitanda-beige">
    <h1 class="font-extrabold mb-4 truncate">Lorem ipsum dolor sit amet.</h1>
    <p class="text-ocitanda-green font-bold mb-4 self-end">999.999 Kz</p>
    <Button>Comprar</Button>
  </div>
</article>
