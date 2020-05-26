<script>
  import { createEventDispatcher } from "svelte";
  import { PlusMinor, MinusMinor } from "svelte-polaris-icons";
  import Button from "./Button.svelte";

  export let qty = 1;
  export let max = false;

  const dispatch = createEventDispatcher();
</script>

<style>

</style>

<section class="flex justify-center items-center my-2 text-white">
  <Button
    disabled={qty <= 1}
    on:click={() => dispatch('decrease')}
    className="mx-2">
    <MinusMinor class="w-4 fill-current" />
  </Button>
  <span
    class="w-auto border-none bg-ocitanda-green bg-opacity-75 px-4 py-2 text-lg">
    {qty}
  </span>
  <Button
    disabled={max}
    on:click={() => !max && dispatch('increase')}
    className="mx-2">
    <PlusMinor class="w-4 fill-current" />
  </Button>
</section>
