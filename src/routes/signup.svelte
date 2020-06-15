<script>
  import { goto } from "@sapper/app";
  import Button from "./../components/Button.svelte";
  import { signup } from "./../api.js";
  import NotificationError from "../components/NotificationError.svelte";
  import AuthForm from "../components/auth/AuthForm.svelte";
  import { user } from "./../stores/user.js";

  let errorMsg = "";

  const errors = {
    "user already exists": "Já existe um usuário com este email.",
    "validation error": "Erro de validação."
  };

  const onCreateUser = async ({ detail }) => {
    const res = await signup(detail);
    console.log(res);
    if (res.error) {
      return (errorMsg = errors[res.msg.toLowerCase()] || res.msg);
    }

    const data = res.data;
    const remainMilliseconds = 60 * 60 * 4000;
    const expiryDate = new Date(new Date() + remainMilliseconds);
    const authInfo = {
      token: data.token,
      consumer: data.consumer,
      expiryDate,
      isAuth: true
    };
    user.login(authInfo);
    localStorage.setItem("user", JSON.stringify(authInfo));
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
