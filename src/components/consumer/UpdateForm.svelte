<script>
  import { createEventDispatcher } from "svelte";
  import { goto } from "@sapper/app";
  import Button from "../Button.svelte";
  import InputText from "../InputText.svelte";
  import SelectDropdown from "../SelectDropdown.svelte";
  import Alert from "../Alert.svelte";
  import { vEmail, vAlpha, vNotEmpty } from "../../lib/validation";
  import { notification } from "../../stores/notification";
  export let consumer = {};

  const dispatch = createEventDispatcher();
  const isoDate = new Date(consumer.birth_date).toISOString();
  const parsedGender = ["Masculino", "Femenino", "Outro"].find((_g) =>
    _g.startsWith(consumer.gender)
  );

  let name = consumer.user.name.split(" ")[0] || "",
    surname = consumer.user.name.split(" ")[1] || "",
    birthDate = isoDate.substring(0, 10) || "",
    phone = consumer.user.phone || "",
    gender = parsedGender || "",
    readyToUpdate = false;

  const notEmpty = (...input) => input.every((_i) => _i.trim() !== "");
  $: valid = notEmpty(name, surname, phone, gender);

  const onSubmitForm = () => {
    if (valid) return (readyToUpdate = true);
    notification.show(
      "error",
      "preencha todos os campos para editar.",
      "Erro ao Atualizar"
    );
  };

  const onUpdateUser = () => {
    if (valid) {
      const user = {
        name: `${name} ${surname}`,
        birthDate,
        phone,
        gender: gender[0],
        id: consumer.id,
        imageUrl: consumer.user.image_url,
      };

      readyToUpdate = false;
      dispatch("update", user);
    }
  };
</script>

<form class="flex flex-col mb-8" on:submit|preventDefault={onSubmitForm}>
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
    selected={gender}
    items={['Masculino', 'Femenino', 'Outro']}
    on:selectitem={(e) => (gender = e.detail)} />
  <Button type="submit" className="my-4">Atualizar Conta</Button>
  <Button
    type="button"
    on:click={async () => await goto('/forgot-password')}
    className="my-4 bg-ocitanda-gold">
    Atualizar palavra-passe
  </Button>
</form>

{#if readyToUpdate}
  <Alert on:resolve={onUpdateUser} on:close={() => (readyToUpdate = false)}>
    Desejá Salvar as alterações?
  </Alert>
{/if}
