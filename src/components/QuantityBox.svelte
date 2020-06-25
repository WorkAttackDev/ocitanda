<script>
  import { createEventDispatcher } from "svelte";
  import { PlusMinor, MinusMinor } from "svelte-polaris-icons";
  import Button from "./Button.svelte";

  export let qty = 1;
  export let max = false;

  const dispatch = createEventDispatcher();

  const onIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!max) dispatch("increase");
  };

  const onDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty > 1) dispatch("decrease");
  };
</script>

<style>

</style>

<section class="flex justify-center items-center my-2 text-white">
  <Button disabled={qty <= 1} on:click={onDecrease} className="mx-2">
    <MinusMinor class="w-4 fill-current" />
  </Button>
  <span
    class="w-auto border-none bg-ocitanda-green bg-opacity-75 px-4 py-2 text-lg
    mx-2">
    {qty}
  </span>
  <Button disabled={max} on:click={onIncrease} className="mx-2">
    <PlusMinor class="w-4 fill-current" />
  </Button>
</section>
