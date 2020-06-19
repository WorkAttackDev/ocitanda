<script>
  import { user } from "./../stores/user.js";
  import { onMount } from "svelte";
  import ProductSection from "../components/ProductSection.svelte";
  import PriceBox from "../components/cart/PriceBox.svelte";
  import { fetchUserCartItems } from "../api";

  let total = 0;

  let products = [];
  let fetching = true;
  $: total = products.reduce((prev, curr) => prev + curr.price, 0);

  $: fetchBlock($user.token);

  onMount(async () => {
    await fetchBlock($user.token);
  });

  async function fetchBlock(token) {
    if(!token) return fetching = false;
    fetching = true;
    products = await fetchUserCartItems(1, token);
    if (products.error) products = [];
    fetching = false;
  }
</script>

<ProductSection title="Meus Produtos" {products} {fetching} />
<PriceBox {total} Subtotal={total} />
