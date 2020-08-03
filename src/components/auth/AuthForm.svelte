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
    email = "",
    birthDate = "",
    phone = "",
    gender = "M",
    password = "",
    verifPassword = "";

  const notEmpty = (...input) => input.every((_i) => _i.trim() !== "");
  $: valid = notEmpty(
    name,
    email,
    phone,
    gender,
    password,
    verifPassword
  );

  const onCreateUser = () => {
    if (!valid)
      return notification.show({
        type: "error",
        msg: "preencha todos os campos, porfavor",
        title: "Campos vazios",
      });

    const user = {
      name: `${name}`,
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
    class="flex flex-col my-8"
    on:submit|preventDefault={() => onCreateUser()}>
    <InputText
      className="mb-8"
      label="Nome completo"
      value={name}
      name="name"
      disabled
      validators={[vNotEmpty]}
      on:validated={(e) => (name = e.detail)} />
    <InputText
      className="mb-8"
      label="Email"
      name="email"
      value={email}
      disabled
      validators={[vNotEmpty, vEmail]}
      on:validated={(e) => (email = e.detail)} />
    <InputText
      className="mb-8"
      label="Data de Nascimento"
      type="date"
      name="date"
      value={birthDate}
      disabled
      validators={[vNotEmpty]}
      on:validated={(e) => (birthDate = e.detail)} />
    <InputText
      className="mb-8"
      label="Número de Telefone"
      disabled
      type="phone"
      name="phone"
      value={phone}
      validators={[vNotEmpty]}
      on:validated={(e) => (phone = e.detail)} />
    <SelectDropdown
      className="justify-between"
      label="Género"
      items={['Masculino', 'Femenino', 'Outro']}
      on:selectitem={(e) => (gender = e.detail)} />
    <InputText
      className="mb-8 mt-4"
      type="password"
      label="Palavra-Passe"
      value={password}
      name="password"
      disabled
      validators={[vNotEmpty, vLength(8)]}
      on:validated={(e) => (password = e.detail)} />
    <InputText
      className="mb-8"
      type="password"
      label="Verificar Palavra-Passe"
      value={verifPassword}
      name="verifpassword"
      disabled
      validators={[vNotEmpty, vLength(8), isEqualPassword(password)]}
      on:validated={(e) => (verifPassword = e.detail)} />
    <Button type="submit">Criar Conta</Button>
  </form>
{:else}
  <form class="flex flex-col my-8" action="/auth/ocitanda" method="POST">
    <div class="flex flex-col md:flex-row justify-between">
      <InputText
        value={email}
        className="mb-8 md:mr-4 md:w-1/2"
        label="Email"
        type="email"
        name="email"
        disabled
        validators={[vNotEmpty, vEmail]}
        on:validated={(e) => (email = e.detail)} />
      <InputText
        value={password}
        className="mb-8 md:ml-4 md:w-1/2"
        name="password"
        type="password"
        label="Palavra-Passe"
        disabled
        validators={[vNotEmpty, vLength(8)]}
        on:validated={(e) => (password = e.detail)} />
    </div>
    <span class="flex flex-col md:flex-row">
      <Button type="submit" className="mb-4 md:mr-4 md:w-1/2">Iniciar Sessão</Button>
      <Button className="bg-red-600 md:ml-4 md:w-1/2" href={`/auth/google`}>
        <img class="mr-2 w-4 h-4" src="/google.svg" alt="google logo" />
        Iniciar com Google
      </Button>
    </span>
  </form>
{/if}
