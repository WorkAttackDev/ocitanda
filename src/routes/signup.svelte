<script>
  import AuthForm from "../components/auth/AuthForm.svelte";
</script>

<section class="p-4 mx-auto xs:w-3/4 md:w-1/2 ">
  <h1 class="text-3xl text-center text-ocitanda-green">Ocitanda</h1>
  <p class="text-center text-ocitanda-green">Crie uma conta para poder realizar compras.</p>
  <AuthForm />
  <span
    class="flex flex-col justify-between w-full text-ocitanda-gold text-center">
        <small class="text-ocitanda-green">Ou</small>
    <a class="uppercase text-xs" href="#">Iniciar Sessão</a>
  </span>
</section>
