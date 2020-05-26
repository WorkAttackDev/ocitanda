<script>
  import AuthForm from "../components/auth/AuthForm.svelte";
</script>

<section class="p-4 mx-auto xs:w-3/4 md:w-1/2">
  <h1 class="text-3xl text-center text-ocitanda-green">Ocitanda</h1>
  <p class="text-center text-ocitanda-green">inicie sessão para poder realizar compras</p>
  <AuthForm type="login" />
  <span
    class="flex flex-col justify-between w-full uppercase text-ocitanda-gold text-center text-xs">
    <a href="#">Esqueceu a Palavra-passe?</a>
    <a href="#">Criar conta</a>
  </span>
</section>
