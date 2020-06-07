<script>
  import { onMount } from "svelte";
  import SelectDropdown from "../../components/SelectDropdown.svelte";
  import ProductGrid from "../../components/products/ProductGrid.svelte";
  import Pagination from "../../components/products/Pagination.svelte";
  import { fetchProducts, fetchCategories } from "../../api";

  let categories = ["Todos"];
  let products = [];
  let fetching = true;
  let order = ["Nome (A-Z)", "Nome (Z-A)", "Caros", "Baratos"];

  onMount(async () => {
    try {
      let fetching = true;
      categories = ["Todos", ...(await fetchCategories())];
      products = await fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      fetching = false;
      console.log("terminou");
    }
  });
</script>

<section class="relative flex flex-wrap mb-4 pb-2 bg-ocitanda-green">
  <SelectDropdown
    labelClassName="text-ocitanda-beige"
    items={categories}
    label="Categoria" />
  <SelectDropdown
    labelClassName="text-ocitanda-beige"
    items={order}
    label="Ordenar por" />
</section>
{#if fetching}
  <p class="text-4xl">Carregando...</p>
{:else}
  <ProductGrid {products} />
{/if}
<Pagination />
