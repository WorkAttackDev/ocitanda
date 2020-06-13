<script>
  import { goto } from "@sapper/app";
  import Button from "./../components/Button.svelte";
  import { signup } from "./../api.js";
  import Notification from "../components/Notification.svelte";
  import AuthForm from "../components/auth/AuthForm.svelte";

  let errorMsg = "";

  const errors = {
    "user already exists": "Já existe um usuário com este email.",
    "validation error": "Erro de validação.",
  };

  const onCreateUser = async ({ detail }) => {
    const res = await signup(detail);
    console.log(res);
    if (res.error) {
      return (errorMsg = errors[res.msg.toLowerCase()] || res.msg);
    }
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

{#if errorMsg}
  <Notification on:close={() => (errorMsg = '')}>
    <h1 class="font-bold text-red-700 w">Erro ao criar conta</h1>
    <p class="text-red-500 w">{errorMsg}</p>
    {#if errorMsg === 'Já existe um usuário com este email.'}
      <Button className="my-2" on:click={async () => await goto('/login')}>
        Iniciar Sessão
      </Button>
    {/if}
  </Notification>
{/if}
