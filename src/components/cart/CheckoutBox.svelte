<script>
  import { createEventDispatcher } from "svelte";
  import { PaymentsMajorMonotone } from "svelte-polaris-icons";
  import { currecy } from "../../lib/format";
  import Button from "../Button.svelte";

  export let total = 0,
    tax = 0,
    Subtotal = 0;

  const dispatch = createEventDispatcher();
</script>

<article
  class="flex flex-col bg-ocitanda-beige text-ocitanda-green w-11/12 p-4 m-4
    shadow md:flex-row md:justify-between md:items-baseline md:mx-auto">
  <span class="flex justify-between items-center mb-2">
    <p class="font-bold md:mr-8">Subtotal:</p>
    <p class="text-lg">{currecy(Subtotal)} Kz</p>
  </span>
  <span class="flex justify-between items-center mb-2">
    <p class="font-bold md:mr-8">Taxa:</p>
    <p class="text-lg">{currecy(tax)} Kz</p>
  </span>
  <span class="flex justify-between items-center">
    <p class="font-bold md:mr-8 text-lg">Total:</p>
    <p class="text-lg">{currecy(total)} Kz</p>
  </span>
  <Button
    disabled={total <= 0}
    on:click={() => total > 0 && dispatch('checkout')}>
    <PaymentsMajorMonotone class="fill-current w-4 mr-2" />
    finalizar compra
  </Button>
</article>
