<script>
  export let title = "Lorem ipsum dolor sit amet.";
</script>

<style>
  h1::after {
    content: "";
    width: 70%;
    bottom: -1rem;
    left: 50%;
    @apply absolute h-1 bg-black transform -translate-x-1/2;
  }
</style>

<article class="flex flex-col text-center items-center px-4 md:px-16 my-4">
  <h1 class="relative font-bold mb-8 md:text-xl">{title}</h1>
  <p>
    <slot>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
      maiores est esse deleniti voluptas quidem possimus rem! Ipsum nisi magnam
      architecto sint accusamus quaerat ea at, corrupti alias quisquam delectus.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident
      dolorum a. Doloremque delectus quam quis alias sint quod officia eos
      blanditiis, perspiciatis iste voluptate laborum quisquam, quo corrupti
      quasi!
    </slot>
  </p>
</article>
