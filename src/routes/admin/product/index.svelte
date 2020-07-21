<script context="module">
  import { category } from "../../../stores/category";
  import { producer } from "../../../stores/producer";
  export async function preload(page) {
    let categories = await category.getCategories();
    if (categories.error) categories = [];
    let producers = await producer.getProducers();
    if (producers.error) producers = [];

    return {
      categories: categories.map((_c) => ({ ..._c, text: _c.name })),
      producers: producers.map((_p) => ({ ..._p, text: _p.user.name })),
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { notification } from "../../../stores/notification";
  import { products } from "../../../stores/products";
  import { vNotEmpty, vIsNumeric } from "../../../lib/validation";

  import Button from "../../../components/Button.svelte";
  import InputText from "../../../components/InputText.svelte";
  import SelectDropdown from "../../../components/SelectDropdown.svelte";
  import ImageUpload from "../../../components/ImageUpload.svelte";

  export let categories, producers;

  let name = "Uvas",
    price = 20000,
    qty = 200,
    desc = "Novo produto",
    img = new File([], ""),
    producerId = 1,
    categoryId = 2;

  $: isValid = () =>
    [name, price, qty, desc, img, producerId, categoryId].every(
      (_field) =>
        (typeof _field === "number" && _field > 0) ||
        (typeof _field === "string" && _field.trim() !== "") ||
        !!_field.size
    );

  $: console.table({ name, price, qty, desc, img, producerId, categoryId });

  onMount(() => {
    if (!categories[0])
      notification.show(
        "error",
        "Ocorreu um erro ao carregar as categorias!",
        "Erro de conexão",
        async () => await goto("/admin")
      );
  });

  const handleCreateProduct = async () => {
    if (!isValid()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", qty);
    formData.append("description", desc);
    formData.append("image", img);
    formData.append("producerId", producerId);
    formData.append("categoryId", categoryId);

    const res = await products.createProduct(formData);
    if (res.error)
      return notification.show(
        "error",
        "Ocorreu um erro ao Criar este produto",
        "Erro ao criar Produto"
      );

    notification.show(
      "success",
      name + " foi criado com sucesso",
      "Produto criado"
    );
  };
</script>

<section>
  <form
    class="w-11/12 md:w-3/5 shadow-md p-4 mx-auto my-8"
    on:submit|preventDefault={handleCreateProduct}>
    <ImageUpload on:upload={({ detail }) => (img = detail)} />
    <InputText
      label="Nome"
      className="mb-8"
      name="name"
      validators={[vNotEmpty]}
      on:validated={({ detail }) => (name = detail)}
      value={name}
      disabled />
    <InputText
      label="Preço"
      className="mb-8"
      type="number"
      name="price"
      validators={[vIsNumeric]}
      on:validated={({ detail }) => (price = detail)}
      value={price}
      disabled />
    <InputText
      label="Quantidade"
      className="mb-8"
      type="number"
      name="quantity"
      validators={[vIsNumeric]}
      on:validated={({ detail }) => (qty = detail)}
      value={qty}
      disabled />
    <InputText
      label="Descrição"
      className="mb-8"
      type="area"
      value={desc}
      validators={[vNotEmpty]}
      on:validated={({ detail }) => (desc = detail)} />
    <SelectDropdown
      className="mb-6"
      label="Categoria"
      items={categories}
      empty
      on:selectitem={({ detail }) => (categoryId = detail.id)} />
    <SelectDropdown
      className="mb-6"
      label="Produtor"
      items={producers}
      empty
      on:selectitem={({ detail }) => (producerId = detail.id)} />
    <Button type="submit" disabled={!isValid()}>Criar Produto</Button>
  </form>
</section>
