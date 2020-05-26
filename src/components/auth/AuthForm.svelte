<script>
  import Button from "../Button.svelte";
  import InputText from "../InputText.svelte";
  import SelectDropdown from "../SelectDropdown.svelte";

  export let type = "signup" || "login";
</script>

{#if type === "signup"}
<form class="flex flex-col my-4">
  <InputText className="mb-4" placeholder="Nome de Usuário" />
  <InputText className="mb-4" placeholder="Email" />
  <InputText className="mb-4" placeholder="Data de Nascimento" />
  <SelectDropdown
    className="justify-between"
    label="Género"
    items={['Masculino', 'Femenino', 'Outro']} />
  <InputText className="mb-4" placeholder="Género" />
  <InputText className="mb-4" type="password" placeholder="Palavra-Passe" />
  <InputText className="mb-4" type="password" placeholder="Verificar Palavra-Passe" />
  <Button>Criar Conta</Button>
</form>
{:else}
<form class="flex flex-col my-4">
  <InputText className="mb-4" placeholder="Nome de Usuário ou Email" />
  <InputText className="mb-4" type="password" placeholder="Palavra-Passe" />
  <Button>Iniciar Sessão</Button>
</form>
{/if}
