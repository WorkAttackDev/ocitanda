<script>
  import { createEventDispatcher } from "svelte";
  import PURCHASE_METHODS from "../../constants/purchase_methods";

  import CreditCardMajorMonotone from "svelte-polaris-icons/lib/CreditCardMajorMonotone/CreditCardMajorMonotone.svelte";
  import Button from "../Button.svelte";

  export let methodKey = "";

  const dispatch = createEventDispatcher();
  const isActive = (_methodKey) => _methodKey === methodKey;
</script>

<article
  class="flex flex-col w-full min-w-56 items-center my-2 bg-gray-100 shadow-md
    p-2 text-center">
  <h1 class="text-lg font-bold text-gray-800 mb-4">Metodos de pagamento</h1>
  {#each Object.keys(PURCHASE_METHODS) as key}
    <Button
      className={`mb-2 ${key !== methodKey && 'bg-ocitanda-beige'}`}
      on:click={() => dispatch('select', key)}>
      <CreditCardMajorMonotone
        class={`w-3 h-3 mr-2 ${key !== methodKey && 'text-ocitanda-green'}`} />
      <p
        class={`capitalize text-sm ${key !== methodKey && 'text-ocitanda-green'}`}>
        {PURCHASE_METHODS[key]}
      </p>
    </Button>
  {/each}
</article>
