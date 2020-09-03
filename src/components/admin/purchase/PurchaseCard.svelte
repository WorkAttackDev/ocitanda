<script>
  import { format } from "fecha";
  import Purchase from "../../../models/Purchase";

  export let purchase = Purchase();

  const formatDate = (datetime) =>
    format(new Date(datetime), "DD-MM-YYYY [às] HH:mm");
</script>

<div
  on:click
  class="min-w-96 w-1/3 p-2 m-2 cursor-pointer shadow text-gray-800 bg-gray-200
    hover:bg-gray-400">
  <h1 class="font-bold">
    código: <span class="font-normal">{purchase.code}</span>
  </h1>
  <p class="font-bold">
    total: <span class="font-normal">{purchase.quantity} AKZ</span>
  </p>
  <p class="font-bold">
    produtos: <span class="font-normal">{purchase.products.length}</span>
  </p>
  <p class="font-bold">
    data de encomenda: <span class="font-normal">{formatDate(purchase.purchase_date)}</span>
  </p>
  <slot></slot>
</div>
