<script context="module">
  import { purchase } from "../../../stores/purchase";
  import { producer as ProducerStore } from "../../../stores/producer";

  export async function preload(page, session) {
    const init = () =>
      !session.isAuth || !session.user.isAdmin
        ? this.redirect(302, "login")
        : null;
    init();

    const purchases = await purchase.get();
    if (purchases && purchases.error) return { purchases: [] };
    return { purchases };
  }
</script>

<script>
  import PurchaseMain from "../../../components/admin/purchase/PurchaseMain.svelte";

  import { createEventDispatcher } from "svelte";

  export let purchases = [];

  const handleUpdatePaid = (purchaseId) => {
    purchases = purchases.map((_p) =>
      _p.id === purchaseId ? { ..._p, paid: true } : _p
    );
  };

  const handleUpdateDelivered = (purchaseId) => {
    purchases = purchases.map((_p) =>
      _p.id === purchaseId ? { ..._p, delivered: true } : _p
    );
  };
</script>

<PurchaseMain
  on:paid={(e) => handleUpdatePaid(e.detail)}
  on:delivered={(e) => handleUpdateDelivered(e.detail)}
  {purchases} />
