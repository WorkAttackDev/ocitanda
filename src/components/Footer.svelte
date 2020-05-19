<script>
  import InputText from "./InputText.svelte";
  import FacebookIcon from "./FacebookIcon.svelte";
  import Button from "./Button.svelte";
</script>

<style>
  footer {
    background-color: #f6f6f6;
  }
</style>

<footer class="p-4">
  <section class="container mx-auto my-8">
    <div>
      <FacebookIcon className="w-5 md:w-6" />
    </div>
    <InputText placeholder="Subscrever Email" />
  </section>
  <section class="container mx-auto">
    <p class="text-sm">
      Copyright &copy;2020 Ocintanda. Todos direitos reservados.
    </p>
  </section>
</footer>
