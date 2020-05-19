<script>
  import InputText from "./InputText.svelte";
  import FacebookIcon from "./FacebookIcon.svelte";
  import InstagramIcon from "./InstagramIcon.svelte";
  import Button from "./Button.svelte";
</script>

<style>
  footer {
    background-color: #f6f6f6;
  }
</style>

<footer class="p-4">
  <section
    class="container mx-auto mb-8 mt-4 md:flex md:items-center md:justify-around">
    <div class="flex justify-center mb-8 md:mb-0">
      <FacebookIcon className="w-5 md:w-6 mr-4" />
      <InstagramIcon className="w-5 md:w-6 mr-4" />
      <p class="font-bold">@Ocintanda</p>
    </div>
    <InputText placeholder="Subscrever Email" />
  </section>
  <section class="container mx-auto">
    <p class="text-sm text-center">
      Copyright &copy;2020 Ocintanda. Todos direitos reservados.
    </p>
  </section>
</footer>
