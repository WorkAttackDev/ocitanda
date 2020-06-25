<script context="module">
  import Notification from "./../../components/Notification.svelte";
  import { resetPassword } from "./../../api.js";
  import { goto } from "@sapper/app";
  import { verifyResetToken } from "../../api";
  export async function preload(page) {
    const { token } = page.params;

    const isValid = await verifyResetToken(token);

    if (isValid.error) await goto("/");

    return { token };
  }
</script>

<script>
  import { vNotEmpty, vEmail, vLength } from "./../../lib/validation.js";
  import InputText from "./../../components/InputText.svelte";
  import Button from "./../../components/Button.svelte";

  export let token;

  const sucessMsg = "A sua palavra-passe foi atualizada com sucesso!";
  let errorMsg = "",
    password = "",
    verifPassword = "",
    success = false;

  $: valid =
    vNotEmpty.validator(password.trim()) &&
    vNotEmpty.validator(verifPassword.trim()) &&
    password === verifPassword;

  const isEqualPassword = (otherValue) => ({
    errorMsg: "Palavra-Passes diferentes",
    validator: (value) => value === otherValue,
  });

  const onResetPassword = async () => {
    if (valid && password === verifPassword) {
      const res = await resetPassword(password, token);
      if (res.error) return (errorMsg = res.msg);
      success = true;
    }
  };
</script>

<section class="p-4 mx-auto xs:w-3/4 md:w-1/2">
  <h1 class="text-3xl text-center text-ocitanda-green">
    Atualizar Palavra-Passe
  </h1>
  <p class="text-center text-ocitanda-green">
    Digite a nova palavra-passe nos campos abaixo.
  </p>
  <form class="flex flex-col my-4" on:submit|preventDefault={onResetPassword}>
    <InputText
      className="mb-4"
      type="password"
      placeholder="Digite a Nova Palavra-Passe"
      value={password}
      disabled
      validators={[vNotEmpty, vLength(8)]}
      on:validated={(e) => (password = e.detail)} />
    <InputText
      className="mb-4"
      type="password"
      placeholder="Verificar Nova Palavra-Passe"
      value={verifPassword}
      disabled
      validators={[vNotEmpty, vLength(8), isEqualPassword(password)]}
      on:validated={(e) => (verifPassword = e.detail)} />
    <Button disabled={!valid}>Atualizar Palavra-Passe</Button>
  </form>
</section>

{#if success}
  <Notification
    title="Atualizado com Sucesso"
    msg={sucessMsg}
    type="success"
    on:close={async () => await goto('/login')} />
{/if}

{#if errorMsg}
  <Notification
    title="Erro ao Erro ao atualizar Palavra-Passe"
    msg={errorMsg}
    type="error"
    on:close={() => (errorMsg = '')} />
{/if}
