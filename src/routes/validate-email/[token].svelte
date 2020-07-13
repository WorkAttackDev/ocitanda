<script context="module">
  import Notification from "../../components/Notification.svelte";
  import { verifyEmail } from "../../api";
  import { goto } from "@sapper/app";
  export async function preload(page) {
    const { token } = page.params;
    let err = true;
    const isValid = await verifyEmail(token);

    if (!isValid.error) err = false;

    return { err };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { notification } from "../../stores/notification";

  export let err;

  const verifyEmail = async () => {
    loading.show();
    const res = await sendVerifyEmail(detail);
    if (res.error) {
      loading.close();
      return (errorMsg = errors[res.msg.toLowerCase()] || res.msg);
    }
    notification.show(
      "success",
      "agora abre o seu email",
      "Email enviado com sucesso"
    );
  };

  onMount(() => {
    if (err) {
      notification.show(
        "error",
        "Erro ao valida email, feche a notificação para tentar novamente",
        "Ocorreu um erro",
        verifyEmail
      );
    } else {
      notification.show(
        "success",
        "Email verificado com sucesso",
        "Sucesso ao verificar",
        async () => await goto("/login")
      );
    }
  });
</script>

<svelte:head>
  <title>Ocitanda - Validar Email</title>
</svelte:head>
