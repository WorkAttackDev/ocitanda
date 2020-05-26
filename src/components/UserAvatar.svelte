<script>
  export let dropDownMode = false;
  export let loggedIn = false;

  const display = dropDownMode ? "hidden lg:flex" : "flex";
</script>

<style>
  div {
    width: 120%;
  }
</style>

<article
  class={'relative ' + display + ' flex-col items-center p-4 overflow-x-hidden '}>
  <figure
    class="w-16 h-16 rounded-full bg-ocitanda-khaki mb-4 lg:mb-0 lg:w-8 lg:h-8" />
    {#if loggedIn}
      <h1 class="text-2xl text-center">Nome de Usuário</h1>
    {:else}
  <div class="flex flex-col items-center bg-ocitanda-beige py-2 lg:hidden">
    <a href="#" class="text-ocitanda-green">Iniciar Sessão</a>
    <small>ou</small>
    <a href="#" class="text-ocitanda-green">Criar Conta</a>
  </div>
    {/if}
</article>
