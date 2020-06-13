<script>
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";
  import Notification from "./Notification.svelte";
  export let msg = "",
    buttonText = "",
    title = "Sucesso!";

  const dispatch = createEventDispatcher();
</script>

<Notification on:close>
  <h1 class="font-bold text-green-700 w">{title}</h1>
  <p class="text-green-500 w">{msg}</p>
  {#if buttonText}
    <Button className="my-2" on:click>{buttonText}</Button>
  {/if}
</Notification>
