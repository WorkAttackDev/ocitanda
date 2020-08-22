<script>
  import {
    EmailMajorMonotone,
    PhoneMajorMonotone,
    LocationMajorMonotone,
  } from "svelte-polaris-icons";
  import ContactBoxInfo from "./ContactBoxInfo.svelte";
</script>

<style>
  div :global(svg) {
    @apply min-w-8 w-8 mr-4 fill-current;
  }
</style>

<article class="flex flex-col text-ocitanda-green m-0 p-8 shadow-xl sm:m-8">
  <img class="w-56 mx-auto mb-4" src="/logo_vertical.png" alt="vertical ocitanda logo">
  <div class="flex flex-col items-center mb-8">
    <h1 class="text-4xl font-bold">Contactos</h1>
    <p class="text-gray-600">Para mais informações entre em contacto.</p>
  </div>
  <div class="flex flex-col justify-evenly flex-wrap xs:flex-row ">
    <ContactBoxInfo title="Escreva um email" info="ateaocliente@ocitanda.com">
      <EmailMajorMonotone class="h-2" />
    </ContactBoxInfo>
    <ContactBoxInfo title="Ligue-nos | Whatsapp" info="937341134">
      <PhoneMajorMonotone class="h-2" />
    </ContactBoxInfo>
    <ContactBoxInfo
      title="Localização"
      info="Bairro Cassenda, Rua 3, Casa nº 33, Distrito Urbano da Maianga,
      Município e província de Luanda.">
      <LocationMajorMonotone class="h-2" />
    </ContactBoxInfo>
  </div>
</article>
