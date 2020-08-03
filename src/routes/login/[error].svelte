<script context="module">
  export async function preload(page) {}
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { notification } from "../../stores/notification";

  const verifyEmail = async () => {};

  onMount(() => {
    notification.show({
      type: "error",
      msg:
        "Ocorreu um erro ao fazer o login, digite o seu email e palavra-passe corretamente, ou envie um email de verificação para garantir que ele existe.",
      title: "Erro ao Iniciar Sessão",
      callback: async () => await goto("/login"),
      button: {
        text: "Enviar Email",
        onClick: async () => {
          await goto("/verify-email");
          notification.closeWithoutCallback();
        },
      },
    });
  });
</script>
