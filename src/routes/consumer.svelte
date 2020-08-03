<script>
  import Alert from "../components/Alert.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import { onMount } from "svelte";
  import { goto, stores } from "@sapper/app";
  import UserAvatar from "../components/UserAvatar.svelte";
  import ActionBox from "../components/user/ActionBox.svelte";
  import ProductSection from "../components/ProductSection.svelte";
  import Notification from "../components/Notification.svelte";
  import Modal from "../components/Modal.svelte";
  import UpdateForm from "../components/consumer/UpdateForm.svelte";
  import { updateConsumer, deleteConsumer } from "../api";
  import { loading } from "../stores/loading";

  const { session } = stores();

  let errorMsg = "",
    edit = false,
    wantDelete = false;

  onMount(async () => {
    if (!$session.isAuth) await goto("/login");
  });

  const onUpdateConsumer = async ({ detail }) => {
    loading.show();
    const res = await updateConsumer(detail);
    if (res.error) {
      loading.close();
      return (errorMsg = "Erro ao Atualizar os seus dados!");
    }
    loading.close();
    // await goto("/", { replaceState: true });
    window.location.href = "/";
  };

  const onDeleteConsumer = async () => {
    wantDelete = false;
    loading.show();

    const res = await deleteConsumer($session.user.id);
    if (res.error) {
      loading.close();
      return (errorMsg = "Erro ao Eliminar a sua conta!");
    }
    await goto("/auth/logout", { replaceState: true });
    loading.close();
  };
</script>

<svelte:head>
  <title>Ocitanda - {'consumidor'}</title>
</svelte:head>

<section>
  <UserAvatar AvatarClassName="md:w-20 md:h-20 lg:w-32 lg:h-32 " />
  <ActionBox
    on:edit={() => (edit = true)}
    on:delete={() => (wantDelete = true)} />
  <ProductSection title="Histórico de Compra" products={[]} />
</section>

{#if errorMsg}
  <Notification
    on:close={() => (errorMsg = '')}
    title="Erro ao carregar dados"
    type="error"
    msg={errorMsg} />
{/if}

{#if edit}
  <Modal on:close={() => (edit = false)}>
    <UpdateForm on:update={onUpdateConsumer} consumer={$session.user} />
  </Modal>
{/if}

{#if wantDelete}
  <Alert
    on:resolve={onDeleteConsumer}
    on:close={() => (wantDelete = false)}
    waitToResolve={5000}>
    <p class="w-11/12">Desejá Eliminar a sua conta?</p>
  </Alert>
{/if}
