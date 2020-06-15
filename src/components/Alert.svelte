<script>
  import { createEventDispatcher } from "svelte";
  import Notification from "./Notification.svelte";
  import Button from "./Button.svelte";

  export let show = false;

  const dispatch = createEventDispatcher();
</script>

<style>

</style>

{#if show}
  <Notification on:close>
    <slot>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
      distinctio nihil laudantium at natus atque.
    </slot>
    <div class="flex justify-evenly mt-4">
      <Button className="h-8 px-8" on:click={()=> dispatch("resolve")}>sim</Button>
      <Button className="bg-red-500 h-8 px-8" on:click={()=> dispatch("close")}>não</Button>
    </div>
  </Notification>
{/if}
