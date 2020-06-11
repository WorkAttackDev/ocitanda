<script>
  import { goto } from "@sapper/app";
  import { signup } from "./../api.js";
  import { user } from "./../stores/user.js";
  import { login } from "../util";
  import Button from "./../components/Button.svelte";
  import NotificationError from "../components/NotificationError.svelte";
  import AuthForm from "../components/auth/AuthForm.svelte";
  import LoadingOverlay from "./../components/LoadingOverlay.svelte";

  let errorMsg = "", loading = false;;

  const errors = {
    "user already exists": "Já existe um usuário com este email.",
    "validation error": "Erro de validação."
  };

  const onCreateUser = async ({ detail }) => {
     loading = true;
    const res = await signup(detail);
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

<section class="p-4 mx-auto xs:w-3/4 md:w-1/2 ">
  <h1 class="text-3xl text-center text-ocitanda-green">Ocitanda</h1>
  <p class="text-center text-ocitanda-green">
    Crie uma conta para poder realizar compras.
  </p>
  <AuthForm on:create={onCreateUser} />
  <span
    class="flex flex-col justify-between w-full text-ocitanda-gold text-center">
    <small class="text-ocitanda-green">Ou</small>
    <a class="uppercase text-xs" href="/login">Iniciar Sessão</a>
  </span>
</section>

<NotificationError
  on:close={() => (errorMsg = '')}
  {errorMsg}
  show={errorMsg}
  title="Erro ao criar conta" />

{#if loading}
<LoadingOverlay />
{/if}