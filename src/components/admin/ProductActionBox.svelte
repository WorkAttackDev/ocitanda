<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button.svelte";

  const dispatch = createEventDispatcher();
</script>

<style>

</style>

<article class="flex justify-evenly w-full">
  <Button className="w-full" on:click={()=> dispatch("edit")}>Editar</Button>
  <Button className="w-full" on:click={()=> dispatch("toogleinvalid")}>Invalidar</Button>
</article>
