<script>
  import { createEventDispatcher } from "svelte";
  import { goto, stores } from "@sapper/app";
  import { cart } from "./../stores/cart.js";

  export let dropDownMode = false;
  export let AvatarClassName = "";

  const { page, session } = stores();
  const display = dropDownMode ? "hidden lg:flex" : "flex";

  const dispatch = createEventDispatcher();

  const onLogout = async () => {
    await goto("/auth/logout", { replaceState: true });
    dispatch("close");
  };

  const onAvatarClick = async () => {
    $session.isAuth ? await goto("/consumer") : await goto("/login");
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
    {#if $session.isAuth}
      <img
        class="w-full h-full object-cover rounded-full"
        on:error={(e) => (e.target.src !== '/user.png' ? (e.target.src = '/user.png') : undefined)}
        src={$session.user.user.image_url}
        alt={$session.user.user.name} />
    {/if}
  </figure>
  {#if $session.isAuth && $page.path === '/consumer'}
    <h1 class="text-lg text-center mb-2">{$session.user.user.name || ''}</h1>
  {:else if $session.isAuth && !$page.path === '/consumer'}
    <h1 class="text-lg text-center mb-2 lg:hidden">
      {$session.user.user.name || ''}
    </h1>
  {/if}
  <div
    class="flex flex-col items-center bg-ocitanda-beige py-2"
    class:lg:hidden={$page.path !== '/consumer'}>
    {#if $session.isAuth}
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
