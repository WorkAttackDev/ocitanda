<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button.svelte";

  export let pageCount = 1;
  export let lastPage = false;

  const dispatch = createEventDispatcher();
</script>

<style>

</style>

<section class="flex justify-center items-center my-8 ">
  <Button
    disabled={pageCount <= 1}
    on:click={() => dispatch('prev')}
    className="mx-2">
    Anterior
  </Button>
  <span
    class="w-auto border-none bg-ocitanda-khaki px-6 py-2 text-white text-lg">
    {pageCount}
  </span>
  <Button
    disabled={lastPage}
    on:click={() => !lastPage && dispatch('next')}
    className="mx-2">
    Proximo
  </Button>
</section>
