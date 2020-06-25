<script>
  import { createEventDispatcher } from "svelte";
  import { goto, stores } from "@sapper/app";
  import { user } from "./../stores/user.js";
  import { cart } from "./../stores/cart.js";
  import { logout } from "../util";

  export let dropDownMode = false;
  export let AvatarClassName = "";

  const { page } = stores();
  const display = dropDownMode ? "hidden lg:flex" : "flex";

  const dispatch = createEventDispatcher();

  const onLogout = async () => {
    await logout();
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
    class={'w-16 h-16 rounded-full cursor-pointer border-ocitanda-green border-2 bg-ocitanda-khaki mb-2 lg:mb-0 lg:w-8 lg:h-8 ' + AvatarClassName}>
    {#if $user.isAuth}
      <img
        class="w-full h-full object-cover rounded-full"
        src={$user.consumer.user.image_url}
        alt={$user.consumer.user.name} />
    {/if}
  </figure>
  {#if $user.isAuth && $page.path === '/consumer'}
    <h1 class="text-lg text-center mb-2">{$user.consumer.user.name || ''}</h1>
  {:else if $user.isAuth && !$page.path === '/consumer'}
    <h1 class="text-lg text-center mb-2 lg:hidden">
      {$user.consumer.user.name || ''}
    </h1>
  {/if}
  <div
    class="flex flex-col items-center bg-ocitanda-beige py-2"
    class:lg:hidden={$page.path !== '/consumer'}>
    {#if $user.isAuth}
      <p
        on:click={onLogout}
        class="text-ocitanda-brown cursor-pointer hover:text-ocitanda-khaki">
        Terminar Sessão
      </p>
    {:else}
      <a
        href="/login"
        on:click={() => dispatch('close')}
        class="text-ocitanda-green hover:text-ocitanda-khaki cursor-pointer">
        Iniciar Sessão
      </a>
      <small>ou</small>
      <a
        href="/signup"
        on:click={() => dispatch('close')}
        class="text-ocitanda-green hover:text-ocitanda-khaki cursor-pointer">
        Criar Conta
      </a>
    {/if}
  </div>
</article>
