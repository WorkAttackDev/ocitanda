<script context="module">
  export async function preload(page) {}
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { notification } from "../../stores/notification";

  const verifyEmail = async () => {};

  onMount(() => {
    notification.show(
      "error",
      "Ocorreu um erro ao fazer o login, digite o seu email e palavra-passe corretamente, ou envie um email de verificação para garantir que ele existe.",
      "Erro ao Iniciar Sessão",
      async () => await goto("/login"),
      {
        text: "Enviar Email",
        onClick: async () => {
          await goto("/verify-email");
          notification.closeWithoutCallback();
        },
      }
    );
  });
</script>
