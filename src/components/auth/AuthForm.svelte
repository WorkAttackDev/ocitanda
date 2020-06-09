<script>
  import Button from "../Button.svelte";
  import InputText from "../InputText.svelte";
  import SelectDropdown from "../SelectDropdown.svelte";
  import { vEmail, vAlpha, vNotEmpty } from "../../lib/validation";

  export let type = "signup" || "login";

  let name = "",
    surname = "",
    email = "",
    birthDate = "",
    phone = "",
    gender = "",
    password = "",
    verifPassword = "";

  $: console.log(name);

  const onCreateUser = () => {
    console.log(
      name,
      surname,
      email,
      birthDate,
      phone,
      gender,
      password,
      verifPassword
    );
  };
</script>

{#if type === 'signup'}
  <form
    class="flex flex-col my-4"
    on:submit|preventDefault={() => onCreateUser()}>
    <InputText
      className="mb-4"
      placeholder="Nome"
      value={name}
      disabled
      validators={[vNotEmpty]}
      on:validated={e => (name = e.detail)} />
    <InputText
      className="mb-4"
      placeholder="Sobrenome"
      value={surname}
      disabled
      validators={[vNotEmpty]}
      on:validated={e => (surname = e.detail)} />
    <InputText
      className="mb-4"
      placeholder="Email"
      value={email}
      disabled
      validators={[vNotEmpty, vEmail]}
      on:validated={e => (email = e.detail)} />
    <InputText
      className="mb-4"
      placeholder="Data de Nascimento"
      type="date"
      value={birthDate}
      disabled
      validators={[vNotEmpty]}
      on:validated={e => (birthDate = e.detail)} />
    <InputText
      className="mb-4"
      placeholder="Número de Telefone"
      disabled
      type="phone"
      value={phone}
      validators={[vNotEmpty]}
      on:validated={e => (phone = e.detail)} />
    <SelectDropdown
      className="justify-between"
      label="Género"
      items={['Masculino', 'Femenino', 'Outro']}
      on:select={e => (gender = e.detail)} />
    <InputText
      className="mb-4"
      type="password"
      placeholder="Palavra-Passe"
      value={password}
      disabled
      validators={[vNotEmpty]}
      on:validated={e => (password = e.detail)} />
    <InputText
      className="mb-4"
      type="password"
      placeholder="Verificar Palavra-Passe"
      value={verifPassword}
      disabled
      validators={[vNotEmpty]}
      on:validated={e => (verifPassword = e.detail)} />
    <Button>Criar Conta</Button>
  </form>
{:else}
  <form class="flex flex-col my-4">
    <InputText className="mb-4" placeholder="Nome de Usuário ou Email" />
    <InputText className="mb-4" type="password" placeholder="Palavra-Passe" />
    <Button>Iniciar Sessão</Button>
  </form>
{/if}
