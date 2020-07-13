<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button.svelte";
  import InputText from "../InputText.svelte";
  import SelectDropdown from "../SelectDropdown.svelte";
  import { goto } from "@sapper/app";
  import { notification } from "../../stores/notification";
  import { vEmail, vAlpha, vNotEmpty, vLength } from "../../lib/validation";
  import { api } from "../../api";
  // import { loading } from "../../stores/loading";

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

  const notEmpty = (...input) => input.every((_i) => _i.trim() !== "");
  $: valid = notEmpty(
    name,
    surname,
    email,
    phone,
    gender,
    password,
    verifPassword
  );

  const onCreateUser = () => {
    if (!valid)
      return notification.show(
        "error",
        "preencha todos os campos, porfavor",
        "Campos vazios"
      );

    const user = {
      name: `${name} ${surname}`,
      email,
      birthDate: birthDate,
      phone,
      gender: gender[0],
      password,
      imageUrl: "https://ocitanda.com/api/static/images/ocitanda.jpg",
    };

    dispatch("create", user);
  };
  
  const isEqualPassword = (otherValue) => ({
    errorMsg: "Palavra-Passes diferentes",
    validator: (value) => value === otherValue,
  });
</script>

<style>
  span :global(a) {
    height: 90%;
  }
</style>

{#if type === 'signup'}
  <form
    class="flex flex-col my-4"
    on:submit|preventDefault={() => onCreateUser()}>
    <InputText
      className="mb-4"
      placeholder="Nome"
      value={name}
      disabled
      validators={[vNotEmpty, vAlpha]}
      on:validated={(e) => (name = e.detail)} />
    <InputText
      className="mb-4"
      placeholder="Sobrenome"
      value={surname}
      disabled
      validators={[vNotEmpty, vAlpha]}
      on:validated={(e) => (surname = e.detail)} />
    <InputText
      className="mb-4"
      placeholder="Email"
      value={email}
      disabled
      validators={[vNotEmpty, vEmail]}
      on:validated={(e) => (email = e.detail)} />
    <InputText
      className="mb-4"
      placeholder="Data de Nascimento"
      type="date"
      value={birthDate}
      disabled
      validators={[vNotEmpty]}
      on:validated={(e) => (birthDate = e.detail)} />
    <InputText
      className="mb-4"
      placeholder="Número de Telefone"
      disabled
      type="phone"
      value={phone}
      validators={[vNotEmpty]}
      on:validated={(e) => (phone = e.detail)} />
    <SelectDropdown
      className="justify-between"
      label="Género"
      items={['Masculino', 'Femenino', 'Outro']}
      on:selectitem={(e) => (gender = e.detail)} />
    <InputText
      className="mb-4"
      type="password"
      placeholder="Palavra-Passe"
      value={password}
      disabled
      validators={[vNotEmpty, vLength(8)]}
      on:validated={(e) => (password = e.detail)} />
    <InputText
      className="mb-4"
      type="password"
      placeholder="Verificar Palavra-Passe"
      value={verifPassword}
      disabled
      validators={[vNotEmpty, vLength(8), isEqualPassword(password)]}
      on:validated={(e) => (verifPassword = e.detail)} />
    <Button type="submit">Criar Conta</Button>
  </form>
{:else}
  <form class="flex flex-col my-4" action="/auth/ocitanda" method="POST">
    <InputText
      value={email}
      className="mb-4"
      placeholder="Email"
      type="email"
      name="email"
      disabled
      validators={[vNotEmpty, vEmail]}
      on:validated={(e) => (email = e.detail)} />
    <InputText
      value={password}
      className="mb-4"
      name="password"
      type="password"
      placeholder="Palavra-Passe"
      disabled
      validators={[vNotEmpty, vLength(8)]}
      on:validated={(e) => (password = e.detail)} />
    <span class="flex flex-col lg:flex-row">
      <Button type="submit" className="mb-4 lg:mr-4">Iniciar Sessão</Button>
      <Button className="bg-red-600" href={`/auth/google`}>
        <img class="mr-2 w-4 h-4" src="/google.svg" alt="google logo" />
        Iniciar com Google
      </Button>
    </span>
  </form>
{/if}
