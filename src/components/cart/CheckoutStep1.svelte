<script>
  import LocationList from "./LocationList.svelte";

  import LocationCard from "./LocationCard.svelte";

  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";

  import CheckoutMethodSection from "./CheckoutMethodSection.svelte";
  import Button from "../Button.svelte";
  import PurchaseLocationForm from "./PurchaseLocationForm.svelte";
  import { consumer } from "../../stores/consumer";
  import { notification } from "../../stores/notification";
  import { loading } from "../../stores/loading";
  import ConsumerLocation from "../../models/ConsumerLocation";

  export let consumerId;

  const dispatch = createEventDispatcher();

  let methodKey,
    consumerLocations = [ConsumerLocation({})],
    purchaseLocation = consumerLocations[consumerLocations.length - 1],
    showLocationForm = false,
    showLocationList = false;

  $: valid = methodKey && purchaseLocation.id;

  const handleSelectMethod = (e) => (methodKey = e.detail);
  const toggleShowLocationForm = () => (showLocationForm = !showLocationForm);
  const toggleShowLocationList = () => (showLocationList = !showLocationList);

  onMount(async () => {
    loading.show();
    const locations = await consumer.getConsumerLocations(consumerId);
    loading.close();

    if (locations && locations.error)
      return notification.show({
        type: "error",
        minimal: true,
        msg: "Ocorreu um erro ao carregar as suas localizações.",
      });

    consumerLocations = locations.filter((_l) => !_l.deleted);
    purchaseLocation = consumerLocations[consumerLocations.length - 1];
  });

  const handleFinishPurchase = () => {
    if (!valid)
      return notification.show({
        type: "error",
        minimal: true,
        msg: "Por favor, selecione um método de pagamento e a sua localização.",
      });

    dispatch("next", { methodKey, purchaseLocation });
  };

  const handleCreateLocation = async (e) => {
    const purLocation = e.detail;
    loading.show();
    const location = await consumer.createLocation(purLocation);
    loading.close();

    if (location && location.error)
      return notification.show({
        type: "error",
        minimal: true,
        msg: "Ocorreu um erro ao guardar a sua localização.",
      });
    consumerLocations.push(location);
    purchaseLocation = location;
    toggleShowLocationForm();
  };

  const handleSelectLocation = (e) => {
    purchaseLocation = e.detail;
    toggleShowLocationList();
  };

  const handleDeleteLocation = async (e) => {
    const locationId = e.detail;
    loading.show();
    const location = await consumer.deleteLocation(locationId);
    loading.close();

    if (location && location.error)
      return notification.show({
        type: "error",
        minimal: true,
        msg: "Ocorreu um erro ao apagar esta localização.",
      });

    consumerLocations = consumerLocations.filter(
      (_cl) => _cl.id !== locationId
    );
    if (purchaseLocation.id === locationId) purchaseLocation = {};
  };
</script>

<figure>
  <img
    class="w-56 mb-2 mx-auto"
    src="/svg/payment.svg"
    alt="ocitanda payment illustration" />
  <figcaption class="text-center">
    Selecione a opção para efectuar o pagamento.
  </figcaption>
</figure>
<section class="w-full flex flex-col">
  <CheckoutMethodSection {methodKey} on:select={handleSelectMethod} />
  {#if showLocationForm}
    <PurchaseLocationForm
      on:create={handleCreateLocation}
      on:close={toggleShowLocationForm} />
  {:else if showLocationList}
    <LocationList
      locations={consumerLocations}
      on:delete={handleDeleteLocation}
      on:close={toggleShowLocationList}
      on:select={handleSelectLocation} />
  {:else}
    <LocationCard location={purchaseLocation} noDelete>
      <Button className="my-2" on:click={toggleShowLocationForm}>
        Nova Localização
      </Button>
      <Button className="my-2" on:click={toggleShowLocationList}>
        Minhas localizações
      </Button>
    </LocationCard>
  {/if}
  <div class="divide-y-2 divide-gray-500" />
  <Button
    className="mt-8 mb-2"
    disabled={!valid}
    on:click={handleFinishPurchase}>
    Finalizar Compra
  </Button>
</section>
