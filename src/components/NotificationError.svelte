<script>
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";
  import Notification from "./Notification.svelte";
  export let errorMsg = "",
    buttonText = "",
    title = "Ocorreu um erro!";

  const dispatch = createEventDispatcher();
</script>

<Notification on:close>
  <h1 class="font-bold text-red-700 w">{title}</h1>
  <p class="text-red-500 w">{errorMsg}</p>
  {#if buttonText}
    <Button className="my-2" on:click>{buttonText}</Button>
  {/if}
</Notification>
