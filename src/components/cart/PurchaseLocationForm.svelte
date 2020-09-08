<script>
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { vNotEmpty } from "../../lib/validation";
  import { stores } from "@sapper/app";

  import CreditCardMajorMonotone from "svelte-polaris-icons/lib/CreditCardMajorMonotone/CreditCardMajorMonotone.svelte";
  import Button from "../Button.svelte";
  import InputText from "../InputText.svelte";

  import ConsumerLocation from "../../models/ConsumerLocation";

  const dispatch = createEventDispatcher();

  const {session} = stores()

  let neighborhood = "Gamek",
    street = "villa do gamek",
    house = "Casa número 3334",
    phone = "997267270",
    extraInfo = "no payol, igreja i.e.i.a casa com o portão de madeira";

  $: valid = neighborhood.trim() && street.trim() && house.trim();

  const handleSubmit = () => {
    if (!valid) return;
    const newLocation = ConsumerLocation({
      neighborhood,
      details: extraInfo,
      house,
      extra_phone: phone,
      consumer_id: $session.user.id,
      street,
    });
    dispatch("create", newLocation);
  };
</script>

<form
  transition:slide
  class="flex flex-col min-w-56 w-full p-2 my-2 bg-gray-100 shadow-md"
  on:submit|preventDefault={handleSubmit}>
  <h1 class="text-lg font-bold text-gray-800 mb-8">Localização</h1>
  <InputText
    className="mb-8"
    label="Bairro"
    value={neighborhood}
    name="neighborhood"
    disabled
    validators={[vNotEmpty]}
    on:validated={(e) => (neighborhood = e.detail)} />
  <InputText
    className="mb-8"
    label="Rua"
    name="street"
    value={street}
    disabled
    validators={[vNotEmpty]}
    on:validated={(e) => (street = e.detail)} />
  <InputText
    className="mb-8"
    label="Residência"
    name="house"
    value={house}
    disabled
    validators={[vNotEmpty]}
    on:validated={(e) => (house = e.detail)} />
  <InputText
    className="mb-8"
    type="area"
    label="Mais Informações"
    name="more"
    value={extraInfo}
    disabled
    on:validated={(e) => (extraInfo = e.detail)} />
  <InputText
    className="mb-8"
    label="Telefone (opcional)"
    disabled
    type="phone"
    name="phone"
    value={phone}
    on:validated={(e) => (phone = e.detail)} />
  <Button
    on:click={() => dispatch('close')}
    type="button"
    className="bg-ocitanda-brown mb-4">
    Cancelar
  </Button>
  <Button disabled={!valid} type="submit">Adicionar</Button>
</form>
