<script>
  import { ArrowLeftMinor, ArrowRightMinor } from "svelte-polaris-icons";

  const imgs = [
    { src: "/vegetables_bowls.jpg", alt: "farm photo" },
    { src: "/vegetables.jpg", alt: "farm photo" },
    { src: "/agri-1.jpg", alt: "farm photo" },
  ];

  let end = false,
    start = true;

  const scrollBy = (el, x) =>
    setTimeout(() => {
      el.scrollBy(x, 0);
    }, 20);

  const calcBounderies = (slider, right = true) => {
    if (right) {
      end = slider.scrollLeft >= slider.offsetWidth * imgs.length * 0.5;
      start = false;
    } else {
      end = false;
      start = slider.scrollLeft - slider.offsetWidth <= 0;
    }
  };

  // const handleWheelSlide = (e) => {
  //   if (e.deltaY > 0) {
  //     scrollBy(e.target, 800);
  //     calcBounderies(e.target);
  //   } else {
  //     scrollBy(e.target, -800);
  //     calcBounderies(e.target, false);
  //   }
  // };

  const next = (e) => {
    const slider = e.target.parentElement.children[2];
    scrollBy(slider, 800);
    calcBounderies(slider);
  };
  const prev = (e) => {
    const slider = e.target.parentElement.children[2];
    scrollBy(slider, -800);
    calcBounderies(slider, false);
  };
</script>

<style>
  section {
    @apply h-96 max-h-96;
  }
  article {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
  }

  figure {
    scroll-snap-align: start;
  }

  button {
    @apply bg-ocitanda-green bg-opacity-50 text-white py-1 px-2;
  }

  button :global(svg) {
    @apply min-w-5 min-h-5 fill-current pointer-events-none;
  }

  .next {
    top: 50%;
    right: 5%;
  }
  .prev {
    top: 50%;
    left: 5%;
  }

  .disabled {
    @apply bg-gray-500 text-gray-700 cursor-not-allowed;
  }

  @screen md {
    section {
      height: 25rem;
      max-height: 25rem;
    }
  }
</style>

<section class="relative flex w-full overflow-x-hidden">
  <button
    class:disabled={start}
    disabled={start}
    class="prev hidden absolute z-20 transform -translate-y-1/2 sm:block"
    on:click={prev}>
    <ArrowLeftMinor class="w-4" />
  </button>
  <button
    class:disabled={end}
    disabled={end}
    class="next hidden absolute z-20 transform -translate-y-1/2 sm:block"
    on:click={next}>
    <ArrowRightMinor class="w-4" />
  </button>
  <article
    class="relative flex w-full overflow-x-auto scrolling-touch">
    {#each imgs as { src, alt }}
      <figure class="flex-none w-full h-full pointer-events-none">
        <img class="w-full h-full object-cover" {src} {alt} />
      </figure>
    {/each}
  </article>
  <div
    class="absolute z-10 w-full h-full left-0 top-0 flex flex-col items-center
    justify-center bg-black bg-opacity-50 text-white pointer-events-none px-8
    text-center">
    <h1 class="text-4xl ">25% de Desconto</h1>
    <h3 class="text-xl">Em todos os Vegetais</h3>
  </div>
</section>
