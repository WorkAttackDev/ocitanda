<script>
  import { vNotEmpty, vEmail } from "./../lib/validation.js";
  import { goto } from "@sapper/app";
  import { forgotPassword } from "../api";
  import Notification from "./../components/Notification.svelte";
  import InputText from "./../components/InputText.svelte";
  import Button from "./../components/Button.svelte";
  import LoadingOverlay from "./../components/LoadingOverlay.svelte";
  import { loading } from "../stores/loading";

  let errorMsg = "",
    email = "",
    success = false;

  const onSendEmail = async () => {
    loading.show();
    if (vEmail.validator(email)) {
      const res = await forgotPassword(email);
      if (res.error) {
        loading.close();

        return (errorMsg = res.msg);
      }
      success = true;
      loading.close();
    }
  };
</script>

<svelte:head>
  <title>Ocitanda - Esqueceu palavra-passe</title>
</svelte:head>

<section class="p-4 mx-auto xs:w-3/4 md:w-1/2">
  <img class="w-56 mx-auto mb-4" src="/logo_vertical.png" alt="vertical ocitanda logo">
  <p class="text-center text-ocitanda-green">
    Para recuperar a sua conta, digite o seu email no campo abaixo. Receberá um
    email para redefinir a sua palavre-passe.
  </p>
  <form class="flex flex-col my-8" on:submit|preventDefault={onSendEmail}>
    <InputText
      value={email}
      className="mb-8"
      label="Email"
      disabled
      type="email"
      name="email"
      validators={[vNotEmpty, vEmail]}
      on:validated={(e) => (email = e.detail)} />
    <Button type="submit">Enviar Email</Button>
  </form>
</section>

{#if errorMsg}
  <Notification
    title="Erro ao Recuperar Senha"
    msg={errorMsg}
    type="error"
    on:close={() => (errorMsg = '')} />
{/if}

{#if success}
  <Notification
    title="Email enviado"
    msg="O seu email de atualização de palavra-passe, foi enviado com sucesso!"
    type="success"
    on:close={() => (success = false)} />
{/if}