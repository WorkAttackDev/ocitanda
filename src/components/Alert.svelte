<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import Notification from "./Notification.svelte";
  import Button from "./Button.svelte";

  export let waitToResolve = 0;

  const dispatch = createEventDispatcher();

  let timeoutId,
    allowResolve = true;

  $: console.log(allowResolve);

  if (waitToResolve > 500 && !timeoutId) {
    console.log("enter");
    allowResolve = false;
    timeoutId = setTimeout(() => {
      allowResolve = true;
    }, waitToResolve);
  }

  onDestroy(() => (timeoutId = undefined));
</script>

<style>

</style>

<Notification on:close>
  <slot>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum distinctio
    nihil laudantium at natus atque.
  </slot>
  <div class="flex justify-evenly mt-4">
    <Button
      disabled={!allowResolve}
      className="h-8 px-8"
      on:click={() => dispatch('resolve')}>
      sim
    </Button>
    <Button className="bg-red-500 h-8 px-8" on:click={() => dispatch('close')}>
      não
    </Button>
  </div>
</Notification>
