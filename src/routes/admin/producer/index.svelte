<script context="module">
  import { producer } from "../../../stores/producer";
  export async function preload(page, session) {
    const init = () =>
      !session.isAuth || !session.user.isAdmin
        ? this.redirect(302, "login")
        : null;
    init();
  }
</script>

<script>
  import { onDestroy } from "svelte";
  import { vNotEmpty } from "../../../lib/validation";
  import { loading } from "../../../stores/loading";
  import { notification } from "../../../stores/notification";
  import Modal from "../../../components/Modal.svelte";
  import Button from "../../../components/Button.svelte";
  import InputText from "../../../components/InputText.svelte";
  import isEmpty from "validator/lib/isEmpty";
  import Alert from "../../../components/Alert.svelte";

  // let producers = [];

  let name = "",
    currId,
    showModal = false,
    isDeleting = false;

  $: isValid = !isEmpty(name);

  $: console.log($producer);

  const handleAddProducer = async () => {
    if (!isValid) return;
    loading.show();

    const res = await producer.createProducer(name);
    if (res.error)
      notification.show({
        type: "error",
        msg: "Ocorreu um erro ao adicionar o fornecedor",
        title: "Erro ao adicionar",
      });
    loading.close();
    name = "";
    showModal = false;
  };

  const handleIsDeliting = (id) => {
    isDeleting = true;
    currId = id;
  };

  const handleDeleteProduct = async () => {
    if (!currId) return;
    loading.show();

    const res = await producer.deleteProducer(currId);
    if (res.error)
      notification.show({
        type: "error",
        msg: "Ocorreu um erro ao apagar este fornecedor",
        title: "Erro ao apagar",
      });
    loading.close();
    currId = null;
    isDeleting = false;
  };
</script>

<style>

</style>

<section>
  <header class="bg-ocitanda-green p-4">
    <Button link on:click={() => (showModal = true)}>
      adicionar fornecedor
    </Button>
  </header>
  <ul class="m-4 flex justify-evenly flex-wrap">
    {#each $producer as _p}
      <li class="shadow m-4 self-start">
        <div class=" py-4 px-8">
          <h1 class="text-xl text-ocitanda-green font-semibold">{_p.name}</h1>
          <p>
            {`${_p.plantings.length} plantaç${_p.plantings.length < 1 ? 'ão' : 'ões'}`}
          </p>
        </div>
        <div class="flex justify-between">
          <Button className="w-1/2" href={'/admin/producer/' + _p.id} small>
            Ver
          </Button>
          <Button
            className="w-1/2 bg-ocitanda-brown"
            on:click={handleIsDeliting(_p.id)}
            small>
            Apagar
          </Button>
        </div>
      </li>
    {:else}
      <p>Comece a adicionar os seu produtores/fornecedores</p>
    {/each}
  </ul>
</section>

{#if showModal}
  <Modal on:close={() => (showModal = false)}>
    <form on:submit|preventDefault={handleAddProducer}>
      <InputText
        className="mb-4"
        label="Nome"
        name="name"
        on:validated={({ detail }) => (name = detail)}
        value={name}
        validators={[vNotEmpty]} />
      <Button type="submit" disabled={!isValid}>Adicionar</Button>
    </form>
  </Modal>
{/if}

{#if isDeleting}
  <Alert
    on:resolve={() => handleDeleteProduct()}
    on:close={() => (isDeleting = false)}>
    <p class="mt-10">Vôce deseja apagar este Fornecedor?</p>
  </Alert>
{/if}
