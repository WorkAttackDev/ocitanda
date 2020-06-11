<script>
  import { vNotEmpty, vEmail } from "./../lib/validation.js";
  import { goto } from "@sapper/app";
  import { forgotPassword } from "../api";
	import NotificationSuccess from './../components/NotificationSuccess.svelte';
  import NotificationError from "./../components/NotificationError.svelte";
  import InputText from "./../components/InputText.svelte";
  import Button from "./../components/Button.svelte";
import LoadingOverlay from "./../components/LoadingOverlay.svelte";

  let errorMsg = "",
    email = "", success = false, loading = false;

  const onSendEmail = async () => {
    loading = true;
    if (vEmail.validator(email)) {
      const res = await forgotPassword(email);
      if(res.error){
    loading = false;

        return errorMsg = res.msg;
      } 
      console.log(res.data.message);
      success = true;
    loading = false;
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

  <NotificationError show={errorMsg}
    title="Erro ao Recuperar Senha"
    {errorMsg}
    on:close={() => (errorMsg = '')} />

{#if success}
  <NotificationSuccess
    title="Email enviado"
    msg="O seu email de atualização de palavra-passe, foi enviado com sucesso!"
    on:close={()=> success = false} />
{/if}

{#if loading}
<LoadingOverlay />
{/if}
