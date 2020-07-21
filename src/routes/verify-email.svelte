<script>
  import { vNotEmpty, vEmail } from "./../lib/validation.js";
  import { goto } from "@sapper/app";
  import { sendVerifyEmail } from "../api";
  import Notification from "./../components/Notification.svelte";
  import InputText from "./../components/InputText.svelte";
  import Button from "./../components/Button.svelte";
  import LoadingOverlay from "./../components/LoadingOverlay.svelte";
  import { loading } from "../stores/loading";
  import { notification } from "../stores/notification";

  let errorMsg = "",
    email = "",
    success = false;

  const onSendEmail = async () => {
    loading.show();
    if (vEmail.validator(email)) {
      const res = await sendVerifyEmail(email);
      if (res.error) {
        loading.close();
        return notification.show(
          "error",
          "erro ao enviar o email, tente novamente",
          "Email não enviado"
        );
      }
      notification.show(
        "success",
        "O seu email de verificação, foi enviado com sucesso!",
        "Email enviado"
      );
      loading.close();
    }
  };
</script>

<svelte:head>
  <title>Ocitanda - Verificar Email</title>
</svelte:head>

<section class="p-4 mx-auto xs:w-3/4 md:w-1/2">
  <h1 class="text-3xl text-center text-ocitanda-green">Ocitanda</h1>
  <p class="text-center text-ocitanda-green">
    Verifique o seu email para poder iniciar sessão na OCITANDA, este é um
    mecanismo de segurança para evitar o uso de emails alheios.
  </p>
  <form class="flex flex-col my-8" on:submit|preventDefault={onSendEmail}>
    <InputText
      value={email}
      className="mb-8"
      label="Email"
      disabled
      validators={[vNotEmpty, vEmail]}
      on:validated={(e) => (email = e.detail)} />
    <Button type="submit">Enviar Email</Button>
  </form>
</section>
