<script>
  export let title, src, alt, reverse = false;
</script>

<style>

</style>

<section class={`flex flex-col m-4  ${ reverse ? "md:flex-row" : "md:flex-row-reverse" } md:m-8`}>
  <figure class="w-full min-h-full md:w-1/2">
    <img class="w-full h-full object-cover" {src} {alt} />
  </figure>
  <article class="flex flex-col p-6 border-opacity-75 border-b-2 border-ocitanda-khaki  w-full md:border-none md:w-1/2 md:p-12">
    <h1 class="font-bold text-2xl mb-4 text-ocitanda-green">{title}</h1>
    <p class="text-lg text-gray-600">
      <slot>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi dicta
        quibusdam veritatis aliquam exercitationem inventore modi natus
        voluptates dolor at totam, quia aliquid est ullam rerum illo ea minus
        deleniti.
      </slot>
    </p>
  </article>
</section>
