<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button.svelte";

  const dispatch = createEventDispatcher();
  export let invalidate;

  const handleToggleInvalid = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch("toggleinvalid");
  };
</script>

<style>

</style>

<article class="flex justify-evenly w-full">
  <Button className="w-full font-bold bg-ocitanda-gold" on:click={handleToggleInvalid}>
    {!invalidate ? 'Ocultar' : 'Mostrar'}
  </Button>
  <Button className="w-full bg-ocitanda-brown" on:click={() => dispatch('delete')}>Apagar</Button>
</article>
