<script>
  import { goto } from "@sapper/app";
  import { user } from "./../stores/user.js";
  import { createEventDispatcher } from "svelte";

  export let dropDownMode = false;

  const display = dropDownMode ? "hidden lg:flex" : "flex";

  const dispatch = createEventDispatcher();

  let showImage = !!$user.consumer.user;


  const onLogout = async () => {
    localStorage.setItem("user", JSON.stringify({}));
    user.logout();
    await goto("/login", { replaceState: true });
    dispatch("close");
  };

  const onAvatarClick = async () => {
    $user.isAuth ? await goto("/consumer") : await goto("/login");
    dispatch("close");
  };
</script>

<style>
  div {
    width: 120%;
  }
</style>

<article
  class={'relative ' + display + ' flex-col items-center p-4 overflow-x-hidden '}>
  <figure
    on:click={onAvatarClick}
    class="w-16 h-16 rounded-full bg-ocitanda-khaki mb-2 lg:mb-0 lg:w-8 lg:h-8">
    {#if showImage}
      <img
        class="w-full h-full object-cover"
        src={$user.consumer.user.image_url}
        alt={$user.consumer.user.name} />
    {/if}
  </figure>
  {#if $user.isAuth}
    <h1 class="text-lg text-center mb-2">{$user.consumer.user.name || ''}</h1>
  {/if}
  <div class="flex flex-col items-center bg-ocitanda-beige py-2 lg:hidden">
    {#if $user.isAuth}
      <p on:click={onLogout} class="text-red-700">Terminar Sessão</p>
    {:else}
      <a
        href="/login"
        on:click={() => dispatch('close')}
        class="text-ocitanda-green">
        Iniciar Sessão
      </a>
      <small>ou</small>
      <a
        href="/signup"
        on:click={() => dispatch('close')}
        class="text-ocitanda-green">
        Criar Conta
      </a>
    {/if}
  </div>
</article>
