<script context="module">
  export async function preload(page, session) {
    const init = () =>
      !session.isAuth || !session.user.isAdmin
        ? this.redirect(302, "login")
        : null;
    init();
  }
</script>

<script>

</script>

<style>

</style>

<h1 class="text-center text-2xl font-bold text-ocitanda-green mt-10">
  Brevemente Estará disponível
</h1>
