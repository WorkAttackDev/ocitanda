<script>
  export let title = "Titulo";
  export let imgSrc = "/meeting.jpg";
  export let imgAlt = "photo";
  export let className = "";
</script>

<style>
  figure:hover figcaption {
    @apply bg-opacity-75;
  }
</style>

<figure class={'relative text-white min-h-96 ' + className}>
  <img
    class="absolute top-0 left-0 w-full h-full object-cover"
    src={imgSrc}
    alt={imgAlt} />
  <figcaption
    class="absolute bottom-0 left-0 w-full h-full z-10 flex flex-col text-center
    justify-end p-4 bg-ocitanda-green bg-opacity-50 transition ease-in-out
    duration-700">
    <h1 class="text-xl font-extrabold tracking-wider">{title}</h1>
    <p class="text-lg">
      <slot>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis,
        iusto.
      </slot>
    </p>
  </figcaption>
</figure>
