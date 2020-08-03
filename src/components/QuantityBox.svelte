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
  span {
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
  }
</style>

<section class="flex justify-center items-center my-2 text-white">
  <Button
    disabled={qty <= 1}
    on:click={onDecrease}
    className="mx-1 rounded-tl-md rounded-bl-md">
    <MinusMinor class="w-4 fill-current" />
  </Button>
  <span
    class="w-auto border-none bg-ocitanda-green bg-opacity-75 px-4 text-lg ">
    {qty}
  </span>
  <Button
    disabled={max}
    on:click={onIncrease}
    className="mx-1 rounded-tr-md rounded-br-md">
    <PlusMinor class="w-4 fill-current" />
  </Button>
</section>
