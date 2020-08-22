<script context="module">
  import { fetchProducts } from "../../api";
  import { category } from "../../stores/category";

  export async function preload(page) {
    const [pageNum, currCategory, order] = page.params.data;

    if (isNaN(pageNum) || typeof currCategory !== "string")
      throw new Error("Invalid params");

    const limit = 10;

    let categories = [{ name: "Todos" }, ...(await category.getCategories())];
    if (categories.error) categories = [{ name: "Todos" }];

    let products = await fetchProducts(limit, pageNum, currCategory, order);
    if (products.error) products = [];

    return {
      page: +pageNum,
      currCategory,
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
  import SelectDropdown from "../../components/SelectDropdown.svelte";
  import ProductSection from "../../components/ProductSection.svelte";
  import Pagination from "../../components/products/Pagination.svelte";
  import Loading from "../../components/Loading.svelte";

  export let categories,
    products,
    currCategory = "Todos",
    fetching = true,
    limit = 10,
    page = 1,
    order = 1;

  $: categoriesHref = categories.map(({ name }) => ({
    text: name,
    href: `/products/1/${name}/${order}`,
  }));

  onMount(() => {
    fetching = false;
  });

  const orders = [
    { text: "Nome (A-Z)", href: `/products/${page}/${currCategory}/1` },
    { text: "Nome (Z-A)", href: `/products/${page}/${currCategory}/2` },
    { text: "Baratos", href: `/products/${page}/${currCategory}/3` },
    { text: "Caros", href: `/products/${page}/${currCategory}/4` },
  ];
</script>

<svelte:head>
  <title>Ocitanda - Produtos pagina {page}</title>
</svelte:head>

<section class="relative flex items-center flex-wrap mb-4 px-1 bg-white border-b-2 border-ocitanda-beige">
  <SelectDropdown
    labelClassName="text-ocitanda-green"
    items={categoriesHref}
    label="Categoria"
    anchor={true}
    selected={currCategory} />
  <SelectDropdown
    anchor={true}
    labelClassName="text-ocitanda-green"
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
  nextHref={`/products/${page + 1}/${currCategory}/${order}`}
  prevHref={`/products/${page - 1}/${currCategory}/${order}`} />
