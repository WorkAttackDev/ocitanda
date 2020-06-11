<script>
  import LoadingOverlay from "./../components/LoadingOverlay.svelte";
  import NotificationError from "./../components/NotificationError.svelte";
  import { onMount } from "svelte";
  import { user } from "./../stores/user.js";
  import { goto } from "@sapper/app";
  import Button from "./../components/Button.svelte";
  import AuthForm from "../components/auth/AuthForm.svelte";
  import { login } from "../util";

  import { signin } from "../api";

  let errorMsg = "";
  let loading = false;

  const errors = {
    "network problem": "Problema na conexão.",
    "validation error": "Erro de validação.",
  };

  onMount(async () => {
    if ($user.isAuth) await goto("/");
  });

  const onLogin = async ({ detail }) => {
    loading = true;
    const res = await signin(detail);
    console.log(res);
    if (res.error) {
      loading = false;
      return (errorMsg = errors[res.msg.toLowerCase()] || res.msg);
    }

    login(res.data, user);
    loading = false;
    await goto("/", { replaceState: true });
  };
</script>

<section class="p-4 mx-auto xs:w-3/4 md:w-1/2">
  <h1 class="text-3xl text-center text-ocitanda-green">Ocitanda</h1>
  <p class="text-center text-ocitanda-green">
    inicie sessão para poder realizar compras
  </p>
  <AuthForm type="login" on:login={onLogin} />
  <span
    class="flex flex-col justify-between w-full uppercase text-ocitanda-gold
    text-center text-xs">
    <a class="my-4" href="/forgot-password">Esqueceu a Palavra-passe?</a>
    <a href="/signup">Criar Conta</a>
  </span>
</section>

<NotificationError
  show={errorMsg}
  buttonText="Criar Conta"
  title="Erro ao iniciar sessão"
  {errorMsg}
  on:close={() => (errorMsg = '')}
  on:click={async () => await goto('/signup')} />

{#if loading}
  <LoadingOverlay />
{/if}
