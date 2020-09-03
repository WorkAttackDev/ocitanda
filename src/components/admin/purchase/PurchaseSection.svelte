<script>
  import { createEventDispatcher } from "svelte";
  import { api } from "../../../api";
  import { alert } from "../../../stores/alert";
  import { stores } from "@sapper/app";
  import { loading } from "../../../stores/loading";
  import { notification } from "../../../stores/notification";
  import { purchase as purchaseStore } from "../../../stores/purchase";
  import Button from "../../Button.svelte";

  import Modal from "../../Modal.svelte";
  import SearchList from "../../SearchList.svelte";

  import PurchaseCard from "./PurchaseCard.svelte";

  export let purchases = [];
  const { page } = stores();

  const dispatch = createEventDispatcher();

  let showProductsModal = false;
  let currPurchaseProducts = [];

  const handleOpenCard = (purchase) => {
    currPurchaseProducts = purchase.products;
    showProductsModal = true;
  };

  const handletogglePayPurchase = async (purchaseId) => {
    loading.show();
    const res = await purchaseStore.togglePay(true, purchaseId);
    loading.close();
    console.log(res);
    if (res === undefined || res.error)
      return notification.show({
        type: "error",
        minimal: true,
        msg: "erro ao confirmar pagamento.",
      });
    dispatch("paid", purchaseId);
  };

  const handletoggleDeliverPurchase = async (purchaseId) => {
    loading.show();
    const res = await purchaseStore.toggleDelivered(true, purchaseId);
    loading.close();
    console.log(res);
    if (res === undefined || res.error)
      return notification.show({
        type: "error",
        minimal: true,
        msg: "erro ao confirmar entrega.",
      });
    dispatch("delivered", purchaseId);
  };

  const showDeleteAlert = () => {
    alert.show({ text: "Deseja apagar esta compra?", reject: alert.close });
  };
</script>

<article class="flex overflow-x-auto">
  {#each purchases as _p}
    <PurchaseCard purchase={_p}>
      <span class="flex flex-wrap justify-between my-2">
        <Button on:click={() => handleOpenCard(_p)}>Ver Produtos</Button>
        {#if $page.path === '/admin/purchase'}
          {#if !_p.paid}
            <Button on:click={() => handletogglePayPurchase(_p.id)}>
              Validar como pago
            </Button>
          {/if}
          {#if _p.paid && !_p.delivered}
            <Button on:click={() => handletoggleDeliverPurchase(_p.id)}>
              Validar como entregue
            </Button>
          {/if}
          <Button
            on:click={() => showDeleteAlert()}
            className="bg-ocitanda-brown">
            Apagar
          </Button>
        {/if}
      </span>
    </PurchaseCard>
  {:else}
    <p class="text-center self-center font-semibold text-xl my-4">
      Nenhuma compra disponível
    </p>
  {/each}
</article>

{#if showProductsModal}
  <Modal
    on:close={() => (showProductsModal = false)}
    className="overflow-x-hidden">
    <SearchList
      on:click={() => (showProductsModal = false)}
      products={currPurchaseProducts}
      loading={false} />
  </Modal>
{/if}
