<script>
  import { createEventDispatcher } from "svelte";

  import Button from "../Button.svelte";

  export let items = [];
  const dispatch = createEventDispatcher();
</script>

<style>
  th,
  td {
    @apply py-2 px-4 text-center;
  }

  tr:nth-of-type(even) {
    @apply bg-ocitanda-beige;
  }
  tr:last-of-type {
    @apply border-ocitanda-green;
  }

  table :global(button):last-of-type:hover {
    color: white;
  }
</style>

<table class=" w-11/12 border-collapse shadow my-8 text-sm mx-auto">
  <thead>
    <tr class="bg-ocitanda-green font-bold text-white">
      <th>#</th>
      <th>Nome</th>
      <th>Acções</th>
    </tr>
  </thead>
  <tbody>
    {#each items as item, i}
      <tr class="border-b-2 border-gray-300">
        <td>{i + 1}</td>
        <td>{item.name}</td>
        <td class="flex justify-center">
          <Button on:click={() => dispatch('edit', item)}>editar</Button>
          <Button
            on:click={() => dispatch('delete', item.id)}
            className="ml-2 hover:bg-ocitanda-brown">
            apagar
          </Button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
