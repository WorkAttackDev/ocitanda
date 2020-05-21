<script>
  import SelectDropdown from "../../components/SelectDropdown.svelte";
  import ProductGrid from "../../components/products/ProductGrid.svelte";
  import { products } from "../../data/products";

  export let categories = ["Todas", "Fruta", "Legume", "Carne"];
  export let order = ["Nome (A-Z)", "Nome (Z-A)", "Caros", "Baratos"];
</script>

<section class="relative flex flex-wrap mb-4 pb-2 bg-ocitanda-green">
  <SelectDropdown items={categories} label="Categoria" />
  <SelectDropdown items={order} label="Ordenar por" />
</section>
<ProductGrid {products} />
