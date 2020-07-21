<script>
  import { ArrowLeftMinor, ArrowRightMinor } from "svelte-polaris-icons";

  const imgs = [
    { src: "/ocitanda/1.jpg", alt: "farm photo" },
    { src: "/ocitanda/2.jpg", alt: "farm photo" },
    { src: "/ocitanda/3.jpg", alt: "farm photo" },
  ];

  let end = false,
    start = true;

  $: console.log(end);

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

  const handleWheelSlide = (e) => {
    if (e.deltaY > 0) {
      scrollBy(e.target, 800);
      calcBounderies(e.target);
    } else {
      scrollBy(e.target, -800);
      calcBounderies(e.target, false);
    }
  };

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
    right: 0%;
  }
  .prev {
    top: 50%;
    left: 10%;
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
    class="prev absolute z-10 transform -translate-x-1/2"
    on:click={prev}>
    <ArrowLeftMinor />
  </button>
  <button
    class:disabled={end}
    disabled={end}
    class="next absolute z-10 transform -translate-x-1/2"
    on:click={next}>
    <ArrowRightMinor />
  </button>
  <article
    on:mousewheel|preventDefault|stopPropagation={handleWheelSlide}
    class="relative flex w-full overflow-x-auto scrolling-touch">
    {#each imgs as { src, alt }}
      <figure class="flex-none w-full h-full pointer-events-none">
        <img class="w-full h-full object-cover" {src} {alt} />
      </figure>
    {/each}
  </article>
</section>
