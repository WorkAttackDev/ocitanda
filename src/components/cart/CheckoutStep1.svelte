<script>
  import { createEventDispatcher } from "svelte";  

  import CreditCardMajorMonotone from "svelte-polaris-icons/lib/CreditCardMajorMonotone/CreditCardMajorMonotone.svelte";
  import Button from "../Button.svelte";
  
  const dispatch = createEventDispatcher();
</script>

<figure>
    <img class="w-56 mb-2 mx-auto" src="/svg/payment.svg" alt="ocitanda payment illustration" />
    <figcaption class="text-center">
        Selecione a opção para efectuar o pagamento.
    </figcaption>
  </figure>
  <article class="my-4 bg-gray-100 shadow-md p-2 text-center">
    <h1 class="text-xl  mb-4">Metodos de pagamento</h1>
    <Button on:click={()=> dispatch("next")}>
      <CreditCardMajorMonotone class="w-4 h-4 mr-2 fill-current" />
      <p>Tranferência Bancária</p>
    </Button>
  </article>

