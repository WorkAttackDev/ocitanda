<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button.svelte";

  export let pageCount = 1,
    lastPage = false,
    nextHref = "",
    prevHref = "";

  const dispatch = createEventDispatcher();
</script>

<style>

</style>

<section class="flex justify-center items-center my-8 ">
  <Button disabled={pageCount <= 1} href={prevHref} className="mx-2">
    Anterior
  </Button>
  <span
    class="w-auto border-none bg-ocitanda-khaki px-6 py-2 text-white text-lg">
    {pageCount}
  </span>
  <Button disabled={lastPage} href={nextHref} className="mx-2">Proximo</Button>
</section>
