<script>
  import { createEventDispatcher } from "svelte";

  import CheckoutStep1 from "./CheckoutStep1.svelte";
  import CreditCardMajorMonotone from "svelte-polaris-icons/lib/CreditCardMajorMonotone/CreditCardMajorMonotone.svelte";
  import Button from "../Button.svelte";
  import Purchase from "../../models/Purchase";
  import LocationCard from "./LocationCard.svelte";
  import PURCHASE_METHODS from "../../constants/purchase_methods";

  export let newPurchase = Purchase(),
    location;

  const totalQty = 0;
  const titular = "DP & DEEPL, Lda";

  const banksInfo = [
    "Banco BAI Número de Conta - 10130147910 001 (Moeda AKZ), IBAN/NIB - AO06 0040 0000 0130 1479 1013 7",
  ];

  const dispatch = createEventDispatcher();
</script>

<article class="shadow-lg p-4 border-ocitanda-beige border-2 my-4">
  <h1 class="text-lg font-semibold pb-4 border-b-2 border-ocitanda-green">
    Código de Encomenda - <strong> {newPurchase.code} </strong>
  </h1>
  <p class="text-ocitanda-green pt-4">
    A sua compra com o código de encomenda <strong> {newPurchase.code} </strong>
    já foi registrada e espera o pagamento.
  </p>
</article>
<LocationCard noDelete {location} />
<article class="shadow-2xl p-4 border-ocitanda-beige border-2 my-4">
  <h1 class="text-lg font-bold border-b-2 border-ocitanda-green">
    Pagamento - {PURCHASE_METHODS[newPurchase.purchase_method]}
  </h1>
  <p>Quantia: {newPurchase.quantity} AKZ</p>
  <p>Titular da Conta: {titular}</p>
  <ul>
    <li class="font-bold py-2 border-b-2 border-ocitanda-green">
      Detalhes da conta
    </li>
    {#each banksInfo as bi}
      <li class="text-ocitanda-green mb-4">{bi}</li>
    {/each}
  </ul>
  {#if newPurchase.purchase_method === PURCHASE_METHODS.transfer}
    <p class="text-lg mb-4">
      Enviar comprovativo de pagamento para <strong
        class="text-ocitanda-green">pagamentos@ocitanda.com</strong> , junto com
      o código de referência e atravéz deste email.
    </p>
  {/if}
  <Button on:click={() => dispatch('finish')}>Concluir</Button>
</article>
