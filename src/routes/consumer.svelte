<script>
  import Alert from "../components/Alert.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import UserAvatar from "../components/UserAvatar.svelte";
  import ActionBox from "../components/user/ActionBox.svelte";
  import ProductSection from "../components/ProductSection.svelte";
  import NotificationError from "../components/NotificationError.svelte";
  import Modal from "../components/Modal.svelte";
  import UpdateForm from "../components/consumer/UpdateForm.svelte";
  import { products } from "../data/products";
  import { updateConsumer, deleteConsumer } from "../api";
  import { user } from "../stores/user";
  import { login } from "../util";

  let errorMsg = "",
    edit = false,
    loading = false,
    wantDelete = false;

  const onUpdateConsumer = async ({ detail }) => {
    loading = true;
    const res = await updateConsumer(detail);
    if (res.error) {
      loading = false;
      return (errorMsg = "Erro ao Atualizar os seus dados!");
    }
    login(res.data, user);
    loading = false;
    await goto("/", { replaceState: true });
  };

  const onDeleteConsumer = async () => {
    wantDelete = false;
    loading = true;
    const res = await deleteConsumer($user.consumer.id, $user.token);
    console.log(res);
    if (res.error) {
      loading = false;
      return (errorMsg = "Erro ao Eliminar a sua conta!");
    }
    user.logout();
    loading = false;
    await goto("/", { replaceState: true });
  };
</script>

<section>
  <UserAvatar loggedIn />
  <ActionBox
    on:edit={() => (edit = true)}
    on:delete={() => (wantDelete = true)} />
  <ProductSection title="Histórico de Compra" products={products.slice(1, 6)} />
</section>

<NotificationError
  on:close={() => (errorMsg = '')}
  title="Erro ao carregar dados"
  {errorMsg}
  show={errorMsg} />

{#if edit}
  <Modal on:close={() => (edit = false)}>
    <UpdateForm on:update={onUpdateConsumer} consumer={$user.consumer} />
  </Modal>
{/if}

{#if wantDelete}
  <Alert
    on:resolve={onDeleteConsumer}
    on:close={() => (wantDelete = false)}
    waitToResolve={5000}>
    Desejá Eliminar a sua conta?
  </Alert>
{/if}

{#if loading}
  <LoadingOverlay />
{/if}
