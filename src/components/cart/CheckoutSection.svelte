<script>
  import CheckoutStep2 from "./CheckoutStep2.svelte";
  import CheckoutStep1 from "./CheckoutStep1.svelte";
  import CreditCardMajorMonotone from "svelte-polaris-icons/lib/CreditCardMajorMonotone/CreditCardMajorMonotone.svelte";
  import Button from "../Button.svelte";
  import Purchase from "../../models/Purchase";

  import { cart } from "../../stores/cart";
  import { purchase } from "../../stores/purchase";
  import { loading } from "../../stores/loading";
  import { notification } from "../../stores/notification";

  export let consumerId;

  const totalQty = 0;
  const titular = "Ocitanda";

  let newPurchase, location;

  const handleCheckout = async (e) => {
    const { methodKey, purchaseLocation } = e.detail;

    const cartProducts = $cart.products.map((_p) => ({
      product_id: _p.id,
      count: _p.count,
    }));

    const newP = Purchase({
      consumer_id: consumerId,
      products: cartProducts,
      purchase_method: methodKey,
      consumer_location_id: purchaseLocation.id,
      purchase_date: new Date().toISOString(),
      quantity: $cart.total,
    });
    loading.show();
    const res = await purchase.create(newP);
    loading.close();
    if (res && res.error) {
      return notification.show({
        type: "error",
        msg: "Ocorreu um erro tente novamente.",
      });
    }
    location = purchaseLocation;
    newP.id = res.id;
    newP.code = res.code;
    newPurchase = newP;

    const cleanCart = await cart.removeProductsByConsumerId(consumerId);

    if (cleanCart && cleanCart.error)
      return notification.show({
        type: "error",
        msg: "Ocorreu um erro ao limpar o carrinho.",
      });
  };
</script>

<section class="flex flex-col items-center">
  {#if !newPurchase}
    <CheckoutStep1 {consumerId} on:next={handleCheckout} />
  {:else}
    <CheckoutStep2 on:finish {newPurchase} {location} />
  {/if}
</section>
