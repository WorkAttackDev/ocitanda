<script>
  import NotificationError from "./../components/NotificationError.svelte";
  import { onMount } from "svelte";
  import { user } from "./../stores/user.js";
  import { goto } from "@sapper/app";
  import Button from "./../components/Button.svelte";
  import AuthForm from "../components/auth/AuthForm.svelte";

  import { login } from "../api";

  let errorMsg = "";

  const errors = {
    "network problem": "Problema na conexão.",
    "validation error": "Erro de validação."
  };

  onMount(async () => {
    if ($user.isAuth) await goto("/");
  });

  const onLogin = async ({ detail }) => {
    const res = await login(detail);
    console.log(res);
    if (res.error) {
      return (errorMsg = errors[res.msg.toLowerCase()] || res.msg);
    }

    const data = res.data;
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    const remainMilliseconds = 60 * 60 * 4000;
    const expiryDate = new Date(new Date() + remainMilliseconds);
    localStorage.setItem("expiryDate", expiryDate.toISOString());
    user.login(true, data.token, data.userId);
    await goto("/");
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

{#if errorMsg}
  <NotificationError
    buttonText="Criar Conta"
    title="Erro ao iniciar sessão"
    {errorMsg}
    on:close={() => (errorMsg = '')}
    on:click={async () => await goto('/signup')} />
{/if}
