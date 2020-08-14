<script context="module">
  import { producer as ProducerStore } from "../../../stores/producer";
  export async function preload(page, session) {
    const { id } = page.params;
    const init = () =>
      !session.isAuth || !session.user.isAdmin
        ? this.redirect(302, "login")
        : null;
    init();

    const producer = await ProducerStore.getProducer(id);
    if (producer.error) producer = {};

    return { producer };
  }
</script>

<script>
  import { vNotEmpty } from "../../../lib/validation";
  import { loading } from "../../../stores/loading";
  import { notification } from "../../../stores/notification";
  import { date } from "../../../lib/format";
  import Modal from "../../../components/Modal.svelte";
  import Button from "../../../components/Button.svelte";
  import InputText from "../../../components/InputText.svelte";
  import Alert from "../../../components/Alert.svelte";
  import isEmpty from "validator/lib/isEmpty";

  export let producer = {};

  let name = "Maracujá",
    startDate = "2019-11-01",
    endDate = "2020-08-17",
    currId,
    showModal = false,
    isEditing = false,
    isDeleting = false;

  $: isValid = !isEmpty(name) || startDate || endDate;

  const compareDate = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (d1.getFullYear() > d2.getFullYear()) return -1;
    if (d1.getFullYear() < d2.getFullYear()) return 1;
    if (d1.getMonth() > d2.getMonth()) return -1;
    if (d1.getMonth() < d2.getMonth()) return 1;
    if (d1.getDate() > d2.getDate()) return -1;
    if (d1.getDate() < d2.getDate()) return 1;
    return 0;
  };

  const cleanFields = () => {
    currId = null;
    name = "";
    startDate = null;
    endDate = null;
    isEditing = false;
  };

  const handleAddPlanting = async () => {
    if (!isValid) return;
    if (compareDate(startDate, endDate) <= 0)
      return notification.show({
        type: "error",
        title: "Erro nas datas",
        msg:
          "A data de plantação não pode ser maior ou igual a data de colheita.",
        minimal: true,
      });

    loading.show();

    const res = await ProducerStore.createPlanting({
      name,
      startDate,
      endDate,
      producerId: producer.id,
    });

    if (res.error) {
      notification.show({
        type: "error",
        msg: "Ocorreu um erro ao adicionar o fornecedor",
        title: "Erro ao adicionar",
      });
      loading.close();
      showModal = false;
      return;
    }

    producer = {
      ...producer,
      plantings: [...producer.plantings, res.planting],
    };

    loading.close();
    cleanFields();
    showModal = false;
  };

  const handleIsEditing = (planting) => {
    isEditing = true;
    currId = planting.id;
    name = planting.name;
    startDate = date(planting.start, false);
    endDate = date(planting.end, false);
    showModal = true;
  };

  const handleEditPlanting = async () => {
    if (!isValid) return;
    if (compareDate(startDate, endDate) <= 0)
      return notification.show({
        type: "error",
        title: "Erro nas datas",
        msg:
          "A data de plantação não pode ser maior ou igual a data de colheita.",
        minimal: true,
      });

    loading.show();

    console.log(startDate, endDate);

    const res = await ProducerStore.updatePlanting({
      name,
      startDate,
      endDate,
      id: currId,
    });

    if (res.error) {
      notification.show({
        type: "error",
        msg: "Ocorreu um erro ao editar a plantação",
        title: "Erro ao editar",
      });

      loading.close();
      cleanFields();
      showModal = false;
      return;
    }

    producer = {
      ...producer,
      plantings: producer.plantings.map((_p) =>
        _p.id === currId ? res.planting : _p
      ),
    };

    loading.close();
    cleanFields();
    showModal = false;
  };

  const handleIsDeliting = (id) => {
    isDeleting = true;
    currId = id;
  };

  const handleDeleteProduct = async () => {
    if (!currId) return;
    loading.show();

    const res = await ProducerStore.deletePlanting(currId);
    if (res.error) {
      notification.show({
        type: "error",
        msg: "Ocorreu um erro ao apagar esta plantação",
        title: "Erro ao Apagar",
      });
      loading.close();
      currId = null;
      isDeleting = false;
      return;
    }
    producer = {
      ...producer,
      plantings: producer.plantings.filter((_p) => _p.id !== currId),
    };
    loading.close();
    currId = null;
    isDeleting = false;
  };

  const closeModal = () => {
    showModal = false;
    cleanFields();
  };
</script>

<style>

</style>

<section>
  <article class="my-8 mx-auto w-11/12 md:w-3/4 p-4 shadow-lg">
    <span class="flex justify-between mb-4 flex-wrap">
      <h1 class="text-2xl font-semibold text-ocitanda-green">
        {producer.name}
      </h1>
      <Button small on:click={() => (showModal = true)}>
        Adicionar plantação
      </Button>
    </span>
    <ul class="flex flex-col">
      {#if producer.plantings}
        {#each producer.plantings as planting}
          <div class="pb-4 border-gray-500 border-b-2">
            <h1 class="text-lg mb-2 font-semibold text-ocitanda-green">
              {planting.name}
            </h1>
            <span>
              <p>Data de plantação: {date(planting.start)}</p>
              <p class="mb-4">Data de plantação: {date(planting.end)}</p>
            </span>
            <span class="flex">
              <Button
                on:click={() => handleIsEditing(planting)}
                small
                className="mr-4">
                Editar
              </Button>
              <Button
                small
                className="bg-ocitanda-brown"
                on:click={() => handleIsDeliting(planting.id)}>
                Apagar
              </Button>
            </span>
          </div>
        {:else}
          <p>Nenhuma plantação disponível</p>
        {/each}
      {:else}
        <p>Nenhuma plantação disponível</p>
      {/if}
    </ul>
  </article>
</section>

{#if showModal}
  <Modal on:close={closeModal}>
    <form
      on:submit|preventDefault={() => (!isEditing ? handleAddPlanting() : handleEditPlanting())}>
      <InputText
        className="mb-8"
        label="Nome"
        name="name"
        on:validated={({ detail }) => (name = detail)}
        value={name}
        validators={[vNotEmpty]} />
      <InputText
        className="mb-8"
        type="date"
        label="Data de plantação"
        name="startdate"
        on:validated={({ detail }) => (startDate = detail)}
        value={startDate} />
      <InputText
        className="mb-8"
        type="date"
        label="Data de colheita"
        name="enddate"
        on:validated={({ detail }) => (endDate = detail)}
        value={endDate} />
      <Button type="submit" disabled={!isValid}>
        {isEditing ? 'Editar' : 'Adicionar'}
      </Button>
    </form>
  </Modal>
{/if}

{#if isDeleting}
  <Alert
    on:resolve={() => handleDeleteProduct()}
    on:close={() => (isDeleting = false)}>
    <p class="mt-10">Vôce deseja apagar esta plantação?</p>
  </Alert>
{/if}
