<script>
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
  import { updateConsumer } from "../api";
  import { user } from "../stores/user";

  let errorMsg =
      "Ocorreu um erro ao carregar os seus dados, verifique se iniciou sessão!",
    edit = false,
    loading = false;

  const onUpdateConsumer = async ({ detail }) => {
    loading = true;
    const res = await updateConsumer(detail);
    console.log(res);
    if (res.error) {
      loading = false;
      return (errorMsg = "Erro ao Atualizar os seus dados!");
    }

    const data = res.data;
    const remainMilliseconds = 60 * 60 * 4000;
    const expiryDate = new Date(new Date() + remainMilliseconds);
    const authInfo = {
      token: data.token,
      consumer: data.consumer,
      expiryDate,
      isAuth: true,
    };
    user.login(authInfo);
    localStorage.setItem("user", JSON.stringify(authInfo));
    loading = false;
    await goto("/", { replaceState: true });
  };
</script>

<section>
  <UserAvatar loggedIn />
  <ActionBox on:edit={() => (edit = true)} />
  <ProductSection title="Histórico de Compra" products={products.slice(1, 6)} />
</section>

<NotificationError
  on:close={async () => await goto('/', { replaceState: true })}
  title="Erro ao carregar dados"
  {errorMsg}
  show={!$user.isAuth} />

{#if edit}
  <Modal on:close={() => (edit = false)}>
    <UpdateForm on:update={onUpdateConsumer} consumer={$user.consumer} />
  </Modal>
{/if}

<LoadingOverlay {loading} />
