<script>
  import ProductSection from "../components/ProductSection.svelte";
  import PriceBox from "../components/cart/PriceBox.svelte";
  import { cartProducts } from "../data/cart";

  let total = 0;
  cartProducts.forEach(({ price }) => (total += price));
</script>

<ProductSection title="Meus Produtos" products={cartProducts} />
<PriceBox {total} Subtotal={total} />
