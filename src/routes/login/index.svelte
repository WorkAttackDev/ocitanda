<script context="module">
  export async function preload(page, session) {
    const init = () => (session.isAuth ? this.redirect(302, "/") : null);
    init();
  }
</script>

<script>
  import LoadingOverlay from "../../components/LoadingOverlay.svelte";
  import Notification from "../../components/Notification.svelte";
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import Button from "../../components/Button.svelte";
  import AuthForm from "../../components/auth/AuthForm.svelte";
  import { notification } from "../../stores/notification";
  import { loading } from "../../stores/loading";
  import { googleSignin } from "../../api";

  let errorMsg = "",
    keepSession = false;

  const errors = {
    "network problem": "Problema na conexão.",
    "validation error": "Erro de validação.",
  };
</script>

<svelte:head>
  <title>Ocitanda - Iniciar Sessão</title>
</svelte:head>

<section class="px-4 py-8 mx-auto shadow-lg xs:w-3/4 md:w-8/12">
  <h1 class="text-3xl text-center text-ocitanda-green">Ocitanda</h1>
  <p class="text-center text-ocitanda-green">
    inicie sessão para poder realizar compras
  </p>
  <AuthForm type="login" />
  <span
    class="flex flex-col justify-around w-full capitalize text-ocitanda-brown
    text-center text-xs md:flex-row">
    <Button
      link
      class="my-4 font-semibold md:my-0 md:w-1/2"
      href="/forgot-password">
      Esqueceu a Palavra-passe?
    </Button>
    <Button
      link
      class="text-ocitanda-brown font-bold my-4 md:my-0 md:w-1/2"
      href="/verify-email">
      Verificar Email
    </Button>
    <Button link class=" font-bold md:w-1/2" href="/signup">Criar Conta</Button>
  </span>
</section>
