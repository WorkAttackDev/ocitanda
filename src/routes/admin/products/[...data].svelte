<script context="module">
  import { fetchProducts, fetchCategories } from "../../../api";

  export async function preload(page) {
    const [pageNum, category, order] = page.params.data;

    if (isNaN(pageNum) || typeof category !== "string")
      throw new Error("Invalid params");

    const limit = 10;

    let categories = ["Todos", ...(await fetchCategories())];
    if (categories.error) categories = ["Todos"];

    let products = await fetchProducts(limit, pageNum, category, order);
    if (products.error) products = [];

    return {
      page: +pageNum,
      category,
      categories,
      products,
      limit,
      order: order || 1,
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import SelectDropdown from "../../../components/SelectDropdown.svelte";
  import ProductSection from "../../../components/ProductSection.svelte";
  import Pagination from "../../../components/products/Pagination.svelte";
  import Loading from "../../../components/Loading.svelte";

  export let categories,
    products,
    category = "Todos",
    fetching = true,
    limit = 10,
    page = 1,
    order = 1;

  $: categoriesHref = categories.map((_c) => ({
    text: _c,
    href: `/admin/products/${page}/${_c}/${order}`,
  }));

  onMount(() => {
    fetching = false;
  });

  const orders = [
    { text: "Nome (A-Z)", href: `/admin/products/${page}/${category}/1` },
    { text: "Nome (Z-A)", href: `/admin/products/${page}/${category}/2` },
    { text: "Baratos", href: `/admin/products/${page}/${category}/3` },
    { text: "Caros", href: `/admin/products/${page}/${category}/4` },
  ];
</script>

<svelte:head>
  <title>Ocitanda - Produtos pagina {page}</title>
</svelte:head>

<section class="relative flex flex-wrap mb-4 pb-2 bg-ocitanda-green">
  <SelectDropdown
    labelClassName="text-ocitanda-beige"
    items={categoriesHref}
    label="Categoria"
    anchor={true}
    selected={category} />
  <SelectDropdown
    anchor={true}
    labelClassName="text-ocitanda-beige"
    items={orders}
    selected={orders[order - 1].text}
    label="Ordenar por" />
</section>
{#if fetching}
  <Loading />
{:else}
  <ProductSection {products} vertical {fetching} />
{/if}
<Pagination
  pageCount={page}
  lastPage={products.length < limit}
  nextHref={`/admin/products/${page + 1}/${category}/${order}`}
  prevHref={`/admin/products/${page - 1}/${category}/${order}`} />
