<script>
  import { createEventDispatcher } from "svelte";
  import { EditMajorMonotone, DeleteMajorMonotone } from "svelte-polaris-icons";

  const dispatch = createEventDispatcher();
</script>

<article
  class="flex bg-ocitanda-beige text-ocitanda-green mt-4 mb-6 mx-auto max-w-xs">
  <button
    on:click={() => dispatch('edit')}
    class="flex flex-col justify-center items-center w-1/2 p-2 border-r-2
    border-gray-200">
    <EditMajorMonotone class="w-5 fill-current opacity-75" />
    <p>Editar</p>
  </button>
  <button
    on:click={() => dispatch('delete')}
    class="flex flex-col justify-center items-center w-1/2 p-2 ">
    <DeleteMajorMonotone class="w-5 fill-current opacity-75" />
    <p>Eliminar</p>
  </button>
</article>
