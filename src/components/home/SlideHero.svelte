<script>
  import { onMount } from "svelte";
  import Swiper from "swiper";

  import { sliders } from "../../data/sliders";

  let swiper;

  onMount(() => {
    swiper = new Swiper(".swiper-container", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
</script>

<style>

</style>

<svelte:head>
  <link rel="stylesheet" href="/swiper.min.css" />
</svelte:head>

<section
  class="swiper-container relative bg-ocitanda-khaki h-64 md:h-96 w-full mb-8">
  <div
    class="absolute z-10 w-full h-full left-0 top-0 flex flex-col items-center
    justify-center bg-black bg-opacity-50 text-white pointer-events-none">
    <h1 class="text-4xl ">25% de Desconto</h1>
    <h3 class="text-xl">Em todos os Vegetais</h3>
  </div>
  <article class="swiper-wrapper w-full h-full">
    {#each sliders as { src, alt }}
      <img class="swiper-slide w-full h-full object-cover" {src} {alt} />
    {/each}
  </article>
  <!-- Arrows -->
  <div class="swiper-button-next" />
  <div class="swiper-button-prev" />
</section>
