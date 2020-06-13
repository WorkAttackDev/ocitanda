<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button.svelte";
  import InputText from "../InputText.svelte";
  import SelectDropdown from "../SelectDropdown.svelte";
  import { vEmail, vAlpha, vNotEmpty, vLength } from "../../lib/validation";

  export let type = "signup" || "login";

  const dispatch = createEventDispatcher();

  let name = "",
    surname = "",
    email = "",
    birthDate = "",
    phone = "",
    gender = "M",
    password = "",
    verifPassword = "";

  const onCreateUser = () => {
    const user = {
      name: `${name} ${surname}`,
      email,
      birthDate,
      phone,
      gender: gender[0],
      password,
      imageUrl: "/ocitanda.jpg"
    };
    if (
      Object.values(user).every(_field => vNotEmpty.validator(_field) === true)
    )
      dispatch("create", user);
  };

  const onLogin = () => {
    const user = {
      email,
      password
    };
    if (
      Object.values(user).every(_field => vNotEmpty.validator(_field) === true)
    )
      dispatch("login", user);
  };

  const isEqualPassword = otherValue => ({
    errorMsg: "Palavra-Passes diferentes",
    validator: value => value === otherValue
  });
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
      on:selectitem={e => (gender = e.detail)} />
    <InputText
      className="mb-4"
      type="password"
      placeholder="Palavra-Passe"
      value={password}
      disabled
      validators={[vNotEmpty, vLength(8)]}
      on:validated={e => (password = e.detail)} />
    <InputText
      className="mb-4"
      type="password"
      placeholder="Verificar Palavra-Passe"
      value={verifPassword}
      disabled
      validators={[vNotEmpty, vLength(8), isEqualPassword(password)]}
      on:validated={e => (verifPassword = e.detail)} />
    <Button>Criar Conta</Button>
  </form>
{:else}
  <form class="flex flex-col my-4" on:submit|preventDefault={onLogin}>
    <InputText
      value={email}
      className="mb-4"
      placeholder="Email"
      disabled
      validators={[vNotEmpty, vEmail]}
      on:validated={e => (email = e.detail)} />
    <InputText
      value={password}
      className="mb-4"
      type="password"
      placeholder="Palavra-Passe"
      disabled
      validators={[vNotEmpty, vLength(8)]}
      on:validated={e => (password = e.detail)} />
    <Button>Iniciar Sessão</Button>
  </form>
{/if}
