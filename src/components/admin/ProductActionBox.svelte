<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button.svelte";

  const dispatch = createEventDispatcher();
  export let invalidate, teste;
  console.log(teste);

  const handleToggleInvalid = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch("toggleinvalid");
  };
</script>

<style>

</style>

<article class="flex justify-evenly w-full">
  <Button className="w-full" on:click={() => dispatch('edit')}>Editar</Button>
  <Button className="w-full bg-ocitanda-gold" on:click={handleToggleInvalid}>
    {!invalidate ? 'Invalidar' : 'Mostrar'}
  </Button>
</article>
