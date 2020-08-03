<script context="module">
  export async function preload(page, session) {
    const init = () => (session.isAuth ? this.redirect(302, "/") : null);
    init();
  }
</script>

<script>
  import { notification } from "../stores/notification.js";
  import { onMount } from "svelte";
  import { goto, stores } from "@sapper/app";
  import { signup, sendVerifyEmail } from "./../api.js";
  import { loading } from "./../stores/loading";
  import Button from "./../components/Button.svelte";
  import Notification from "../components/Notification.svelte";
  import AuthForm from "../components/auth/AuthForm.svelte";
  import LoadingOverlay from "./../components/LoadingOverlay.svelte";

  const { session } = stores();

  let errorMsg = "";

  const errors = {
    "user already exists": "Já existe um usuário com este email.",
    "validation error": "Erro de validação.",
  };

  onMount(async () => {
    if ($session.isAuth) await goto("/");
  });

  const verifyEmail = async (detail) => {
    loading.show();
    const res = await sendVerifyEmail(detail);
    if (res.error) {
      loading.close();
      return (errorMsg = errors[res.msg.toLowerCase()] || res.msg);
    }
    notification.show({
      type: "success",
      msg: "foi enviado um email de verificação para sua conta de email, abra o seu email e click no link de validação.",
      title: "Email de validação enviado com sucesso",
      callback: async ()=> {
        loading.close();
        await goto("/");
      }
    });
  };

  const onCreateUser = async ({ detail }) => {
    loading.show();
    const res = await signup(detail);
    if (res.error) {
      loading.close();
      return (errorMsg = errors[res.msg.toLowerCase()] || res.msg);
    }
    loading.close();
    notification.show({
      type: "success",
      msg: "agora você precisa valida o seu email",
      title: "Conta criada com sucesso",
      callback: async () => await verifyEmail(detail.email)
    });
  };
</script>

<!-- src/routes/blog/[slug].svelte -->
<svelte:head>
  <title>Ocitanda - Criar Conta</title>
</svelte:head>

<section class="p-4 mx-auto xs:w-3/4 md:w-1/2 ">
  <h1 class="text-3xl text-center text-ocitanda-green">Ocitanda</h1>
  <p class="text-center text-ocitanda-green">
    Crie uma conta para poder realizar compras.
  </p>
  <AuthForm on:create={onCreateUser} />
  <span
    class="flex flex-col justify-between w-full text-ocitanda-brown text-center">
    <small class="text-ocitanda-green">Ou</small>
    <a class="uppercase text-xs" href="/login">Iniciar Sessão</a>
  </span>
</section>

{#if errorMsg}
  <Notification
    on:close={() => (errorMsg = '')}
    msg={errorMsg}
    type="error"
    title="Erro ao criar conta" />
{/if}
