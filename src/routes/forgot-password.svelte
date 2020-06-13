<script>
	import NotificationSuccess from './../components/NotificationSuccess.svelte';
  import NotificationError from "./../components/NotificationError.svelte";
  import { vNotEmpty, vEmail } from "./../lib/validation.js";
  import InputText from "./../components/InputText.svelte";
  import { goto } from "@sapper/app";
  import Button from "./../components/Button.svelte";
  import { forgotPassword } from "../api";

  let errorMsg = "",
    email = "", success = false;

  const onSendEmail = async () => {
    if (vEmail.validator(email)) {
      const res = await forgotPassword(email);
      if(res.error) return errorMsg = res.msg;
      console.log(res.data.message);
      success = true;
    }
  };
</script>

<section class="p-4 mx-auto xs:w-3/4 md:w-1/2">
  <h1 class="text-3xl text-center text-ocitanda-green">Ocitanda</h1>
  <p class="text-center text-ocitanda-green">
    Para recuperar a sua conta, digite o seu email no campo abaixo. Receberá um
    email para redefinir a sua palavre-passe.
  </p>
  <form class="flex flex-col my-4" on:submit|preventDefault={onSendEmail}>
    <InputText
      value={email}
      className="mb-4"
      placeholder="Email"
      disabled
      validators={[vNotEmpty, vEmail]}
      on:validated={e => (email = e.detail)} />
    <Button>Enviar Email</Button>
  </form>
</section>

{#if errorMsg}
  <NotificationError
    title="Erro ao Recuperar Senha"
    {errorMsg}
    on:close={() => (errorMsg = '')} />
{/if}

{#if success}
  <NotificationSuccess
    title="Email enviado"
    msg="O seu email de atualização de palavra-passe, foi enviado com sucesso!"
    on:close={()=> success = false} />
{/if}