<script>
  import { onMount } from "svelte";
  import SelectDropdown from "../../components/SelectDropdown.svelte";
  import ProductGrid from "../../components/products/ProductGrid.svelte";
  import Pagination from "../../components/products/Pagination.svelte";
  import { fetchProducts, fetchCategories } from "../../api";
  import Loading from "../../components/Loading.svelte";

  let categories = ["Todos"];
  let products = [];
  let fetching = true;
  let order = ["Nome (A-Z)", "Nome (Z-A)", "Caros", "Baratos"];
  let page = 1,
    limit = 10;

    $:console.log(products);
    

  onMount(async () => {
    categories = ["Todos", ...(await fetchCategories())];
    if (categories.error) categories = ["Todos"];
    await fetchProductsBlock();
  });

  const fetchProductsBlock = async (page) => {
    fetching = true;
    products = await fetchProducts(limit, page || 1);
    if (products.error) products = [];
    fetching = false;
  };

  const onPagination = async (next) => {
    next ? (page += 1) : page <= 1 ? page : (page -= 1);
    await fetchProductsBlock(page);
  };
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
  <Loading />
{:else}
  <ProductGrid {products} />
{/if}
<Pagination
  pageCount={page}
  lastPage={products.length < limit}
  on:next={() => onPagination(true)}
  on:prev={() => onPagination(false)} />
