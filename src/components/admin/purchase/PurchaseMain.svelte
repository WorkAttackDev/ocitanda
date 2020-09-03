<script>
  import PurchaseSection from "../../../components/admin/purchase/PurchaseSection.svelte";
  import PurchaseTabs from "../../../components/admin/purchase/PurchaseTabs.svelte";

  export let purchases = [];

  let index = 0;

  $: filteredProducts = purchases.filter((_p) => !_p.paid && !_p.delivered);

  const handleSwitch = async (e) => {
    index = e.detail;
    if (index === 1)
      return (filteredProducts = purchases.filter((_p) => _p.paid && !_p.delivered));
    if (index === 2)
      return (filteredProducts = purchases.filter((_p) => _p.paid && _p.delivered));
    return (filteredProducts = purchases.filter((_p) => !_p.paid && !_p.delivered));
  };
</script>

<section class="p-4">
  <PurchaseTabs {index} on:switch={handleSwitch} />
  <PurchaseSection on:paid on:delivered purchases={filteredProducts} />
</section>
