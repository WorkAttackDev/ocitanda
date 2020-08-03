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
  import PageHeader from "../../components/PageHeader.svelte";
</script>

<style>

</style>

<PageHeader
  imgAlt="admin"
  imgSrc="/admin.jpg"
  title="OCITANDA Admin"
  subTitle="Bemvindo a pagina de administrador da OCITANDA"
  contrast>
  {''}
</PageHeader>
