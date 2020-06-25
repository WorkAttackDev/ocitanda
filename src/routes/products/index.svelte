<script context="module">
  import { fetchProducts, fetchCategories } from "../../api";

  export async function preload(page) {
    let categories = ["Todos", ...(await fetchCategories())];
    if (categories.error) categories = ["Todos"];

    let products = await fetchProducts(10, 1, "Todos", 1);
    if (products.error) products = [];

    return { categories, products };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import SelectDropdown from "../../components/SelectDropdown.svelte";
  import ProductSection from "../../components/ProductSection.svelte";
  import Pagination from "../../components/products/Pagination.svelte";
  import Loading from "../../components/Loading.svelte";

  export let categories, products;

  let category = "Todos",
    fetching = true,
    limit = 10,
    page = 1,
    order = 1;

  $: categoriesHref = categories.map((_c) => ({
    text: _c,
    href: `/products/${page}/${_c}/${order}`,
  }));

  onMount(() => {
    fetching = false;
  });

  const orders = [
    { text: "Nome (A-Z)", href: `/products/${page}/${category}/1` },
    { text: "Nome (Z-A)", href: `/products/${page}/${category}/2` },
    { text: "Baratos", href: `/products/${page}/${category}/3` },
    { text: "Caros", href: `/products/${page}/${category}/4` },
  ];
</script>

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
    selected={orders[0].text}
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
  nextHref={`/products/${page + 1}/${category}/${order}`}
  prevHref={`/products/${page - 1}/${category}/${order}`} />
