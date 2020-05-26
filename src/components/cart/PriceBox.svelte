<script>
  export let total = 0,
    tax = 0,
    Subtotal = 0;
</script>

<article
  class="flex flex-col bg-ocitanda-beige text-ocitanda-green w-11/12 p-4 m-4
  shadow md:flex-row md:justify-between md:items-baseline md:mx-auto">
  <span class="flex justify-between items-center mb-2">
    <p class="font-bold md:mr-8">Subtotal:</p>
    <p class="text-lg">{Subtotal} Kz</p>
  </span>
  <span class="flex justify-between items-center mb-2">
    <p class="font-bold md:mr-8">Taxa:</p>
    <p class="text-lg">{tax} Kz</p>
  </span>
  <span class="flex justify-between items-center">
    <p class="font-bold md:mr-8 text-lg">Total:</p>
    <p class="text-lg">{total} Kz</p>
  </span>
</article>
