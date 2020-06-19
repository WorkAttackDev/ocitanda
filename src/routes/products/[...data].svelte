<script context="module">
  import { fetchProducts } from "../../api";

  export async function preload(page) {
    const [pageNum, category, order] = page.params.data;

    if (isNaN(pageNum) || typeof category !== "string")
      throw new Error("Invalid params");

    const limit = 10;

    let products = await fetchProducts(limit, pageNum, category, order || 1);
    if (products.error) products = [];

    return { page: +pageNum, category, products, limit, order: order || 1 };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import SelectDropdown from "../../components/SelectDropdown.svelte";
  import ProductGrid from "../../components/products/ProductGrid.svelte";
  import Pagination from "../../components/products/Pagination.svelte";
  import { fetchCategories } from "../../api";
  import Loading from "../../components/Loading.svelte";

  export let page = 1,
    category = "Todos",
    products,
    order,
    limit;

  let categories = ["Todos"],
    fetching = true;

  const orders = ["Nome (A-Z)", "Nome (Z-A)", "Baratos", "Caros"];

  onMount(async () => {
    fetching = true;
    categories = ["Todos", ...(await fetchCategories())];
    if (categories.error) categories = ["Todos"];
    fetching = false;
  });

  const onPagination = async (next) => {
    next ? (page += 1) : page <= 1 ? page : (page -= 1);
    await goto(`/products/${page}/${category}/${order}`);
  };

  const onFilterByCategory = async (ctg) => {
    category = ctg;
    page = 1;
    await goto(`/products/${page}/${category}/${order}`);
  };

  const onOrderBy = async (orderNum) => {
    page = 1;
    order = orders.findIndex((_item) => _item === orderNum);
    await goto(`/products/${page}/${category}/${++order}`);
  };
</script>

<section class="relative flex flex-wrap mb-4 pb-2 bg-ocitanda-green">
  <SelectDropdown
    labelClassName="text-ocitanda-beige"
    items={categories}
    label="Categoria"
    selected={category}
    on:selectitem={({ detail }) => onFilterByCategory(detail)} />
  <SelectDropdown
    labelClassName="text-ocitanda-beige"
    items={orders}
    selected={orders[order - 1]}
    on:selectitem={({ detail }) => onOrderBy(detail)}
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
