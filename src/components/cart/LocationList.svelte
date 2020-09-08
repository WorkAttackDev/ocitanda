<script>
  import { createEventDispatcher } from "svelte";
  import MobileCancelMajorMonotone from "svelte-polaris-icons/lib/MobileCancelMajorMonotone/MobileCancelMajorMonotone.svelte";
  import Button from "../Button.svelte";
  import LocationCard from "./LocationCard.svelte";
  import ConsumerLocation from "../../models/ConsumerLocation";

  export let locations = [ConsumerLocation()];

  const dispatch = createEventDispatcher();
</script>

<section>
  <span class="flex justify-between w-full text-gray-800 px-2 my-4">
    <h1 class="text-lg text-center font-bold text-gray-800">
      Minhas Localizações
    </h1>
    <MobileCancelMajorMonotone
      on:click={() => dispatch('close')}
      class="w-3 h-3 fill-current hover:text-ocitanda-brown" />
  </span>
  {#each locations as _l, i (_l.id)}
    <LocationCard on:delete location={_l}>
      <Button on:click={()=> dispatch("select", _l)}>Selecionar</Button>
    </LocationCard>
  {/each}
</section>
