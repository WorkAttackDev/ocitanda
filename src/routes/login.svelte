<script>
  import LoadingOverlay from "./../components/LoadingOverlay.svelte";
  import Notification from "./../components/Notification.svelte";
  import { onMount } from "svelte";
  import { user } from "./../stores/user.js";
  import { goto } from "@sapper/app";
  import Button from "./../components/Button.svelte";
  import AuthForm from "../components/auth/AuthForm.svelte";
  import { login } from "../util";

  import { signin } from "../api";

  let errorMsg = "",
    loading = false,
    keepSession = false;

  $: isLogin($user.isAuth);

  const errors = {
    "network problem": "Problema na conexão.",
    "validation error": "Erro de validação.",
  };

  onMount(async () => {
    if ($user.isAuth) await goto("/");
  });

  const isLogin = async (isAuth) => {
    if (isAuth) await goto("/");
  };

  const onLogin = async ({ detail }) => {
    loading = true;
    const res = await signin(detail);
    if (res.error) {
      loading = false;
      return (errorMsg = errors[res.msg.toLowerCase()] || res.msg);
    }

    await login(res.data);
    loading = false;
    await goto("/", { replaceState: true });
  };
</script>

<svelte:head>
  <title>Ocitanda - Iniciar Sessão</title>
</svelte:head>

<section class="p-4 mx-auto xs:w-3/4 md:w-1/2">
  <h1 class="text-3xl text-center text-ocitanda-green">Ocitanda</h1>
  <p class="text-center text-ocitanda-green">
    inicie sessão para poder realizar compras
  </p>
  <AuthForm type="login" on:login={onLogin} />
  <label class="text-gray-700">
  <input class="mr-4" type="checkbox" bind:value={keepSession} />
  Manter sessão
  </label>
  <span
    class="flex flex-col justify-between w-full uppercase text-ocitanda-brown
    text-center text-xs">
    <a class="my-4" href="/forgot-password">Esqueceu a Palavra-passe?</a>
    <a href="/signup">Criar Conta</a>
  </span>
</section>

{#if errorMsg}
  <Notification
    buttonText="Criar Conta"
    title="Erro ao iniciar sessão"
    msg={errorMsg}
    type="error"
    on:close={() => (errorMsg = '')}
    href="/signup" />
{/if}

{#if loading}
  <LoadingOverlay />
{/if}
