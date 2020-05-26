<script>
  import SelectDropdown from "../../components/SelectDropdown.svelte";
  import ProductGrid from "../../components/products/ProductGrid.svelte";
  import Pagination from "../../components/products/Pagination.svelte";
  import { products } from "../../data/products";

  export let categories = ["Todas", "Fruta", "Legume", "Carne"];
  export let order = ["Nome (A-Z)", "Nome (Z-A)", "Caros", "Baratos"];
</script>

<section class="relative flex flex-wrap mb-4 pb-2 bg-ocitanda-green">
  <SelectDropdown labelClassName="text-ocitanda-beige" items={categories} label="Categoria" />
  <SelectDropdown labelClassName="text-ocitanda-beige" items={order} label="Ordenar por" />
</section>
<ProductGrid {products} />
<Pagination />
