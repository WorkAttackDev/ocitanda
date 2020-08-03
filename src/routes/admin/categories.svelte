<script context="module">
  import { category } from "../../stores/category";
  import { notification } from "../../stores/notification";
  import { vNotEmpty } from "../../lib/validation";
  import Button from "../../components/Button.svelte";
  import InputText from "../../components/InputText.svelte";

  export async function preload(page, session) {
    const init = () =>
      !session.isAuth || !session.user.isAdmin
        ? this.redirect(302, "login")
        : null;
        init();

    let categories = await category.getCategories();
    return {
      categories: categories.error ? [] : categories,
    };
  }
</script>

<script>
  import AdminTable from "../../components/admin/AdminTable.svelte";
  import Alert from "../../components/Alert.svelte";

  export let categories = [];

  let deleteAlert = false,
    currId,
    currName,
    editAlert = false;

  const cleaner = () => {
    currId = null;
    currName = null;
  };

  const handleDelete = (id) => {
    deleteAlert = true;
    currId = id;
  };

  const handleEdit = (id, name) => {
    editAlert = true;
    currId = id;
    currName = name;
  };

  const create = async (name = "") => {
    editAlert = false;
    if (name.trim() === "") return;
    const cat = await category.createCategory(name);
    if (cat.error)
      return notification.show({
        type: "error",
        msg: "ocorreu um erro ao criar a categoria",
        title: "Erro ao criar",
      });
    categories = categories.concat(cat);
    cleaner();
  };

  const update = async (id, name = "") => {
    editAlert = false;
    if (name.trim() === "" && !id) return;
    const cat = await category.updateCategory(id, name);
    if (cat.error)
      return notification.show({
        type: "error",
        msg: "ocorreu um erro ao atualizar a categoria",
        title: "Erro ao atualizar",
      });
    categories = categories.map((_c) => (_c.id === id ? cat : _c));
    cleaner();
  };

  const deleteCategory = async (id) => {
    deleteAlert = false;
    if (!id) return;
    const cat = await category.deleteCategory(id);
    if (cat.error)
      return notification.show({
        type: "error",
        msg: "ocorreu um erro ao apagar a categoria",
        title: "Erro ao deletar",
      });
    categories = categories.filter((_c) => _c.id !== id);
    cleaner();
  };
</script>

<section class="container mx-auto my-4">
  <h1 class="text-center text-3xl font-bold text-ocitanda-green">Categorias</h1>
  <p class="text-center text-ocitanda-green">
    Aqui vôce poderar gerênciar as categorias disponíveis para organizar os seus
    produtos
  </p>
  <Button on:click={() => handleEdit(null, '')} className="mx-auto mt-4">
    Criar Categoria
  </Button>
  <AdminTable
    items={categories}
    on:edit={({ detail }) => handleEdit(detail.id, detail.name)}
    on:delete={({ detail }) => handleDelete(detail)} />
</section>

{#if deleteAlert}
  <Alert
    on:resolve={() => deleteCategory(currId)}
    on:close={() => (deleteAlert = false)}>
    <p class="mt-10">Vôce deseja apagar esta categoria?</p>
  </Alert>
{/if}

{#if editAlert}
  <Alert
    on:resolve={() => (currId ? update(currId, currName) : create(currName))}
    on:close={() => (editAlert = false)}>
    <InputText
      className="mt-10 mb-4"
      value={currName}
      label="Nome"
      name="name"
      disabled
      validators={[vNotEmpty]}
      on:validated={(e) => (currName = e.detail)} />
  </Alert>
{/if}
