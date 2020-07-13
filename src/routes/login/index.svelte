<script>
  import LoadingOverlay from "../../components/LoadingOverlay.svelte";
  import Notification from "../../components/Notification.svelte";
  import { onMount } from "svelte";
  import { goto, stores } from "@sapper/app";
  import Button from "../../components/Button.svelte";
  import AuthForm from "../../components/auth/AuthForm.svelte";
  import { notification } from "../../stores/notification";
  import { loading } from "../../stores/loading";
  import { googleSignin } from "../../api";

  const {session} = stores();
  let errorMsg = "",
    keepSession = false;

  $: isLogin($session.isAuth);

  const errors = {
    "network problem": "Problema na conexão.",
    "validation error": "Erro de validação.",
  };

  onMount(async () => {
    if ($session.isAuth) await goto("/");
  });

  const isLogin = async (isAuth) => {
    if (isAuth) await goto("/");
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
  <AuthForm type="login" />
  <!-- <label class="text-gray-700">
    <input class="mr-4" type="checkbox" bind:value={keepSession} />
    Manter sessão
  </label> -->
  <span
    class="flex flex-col justify-between w-full uppercase text-ocitanda-brown
    text-center text-xs">
    <a class="my-4" href="/forgot-password">Esqueceu a Palavra-passe?</a>
    <a href="/signup">Criar Conta</a>
  </span>
</section>
