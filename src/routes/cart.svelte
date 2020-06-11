<script>
  import { onMount } from "svelte";
  import ProductSection from "../components/ProductSection.svelte";
  import PriceBox from "../components/cart/PriceBox.svelte";
  import { fetchUserCartItems } from "../api";

  let total = 0;

  let products = [];
  let fetching = true;
  $: total = products.reduce((prev, curr) => prev + curr.price, 0);

  onMount(async () => {
    try {
      products = await fetchUserCartItems(1);
    } catch (err) {
      console.error(err);
    } finally {
      fetching = false;
      console.log("terminou");
    }
  });
</script>

<ProductSection title="Meus Produtos" {products} {fetching} />
<PriceBox {total} Subtotal={total} />
