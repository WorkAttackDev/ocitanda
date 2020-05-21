<script>
  import InputText from "./InputText.svelte";
  import FacebookIcon from "./FacebookIcon.svelte";
  import InstagramIcon from "./InstagramIcon.svelte";
  import Button from "./Button.svelte";
  import { ArrowUpMinor } from "svelte-polaris-icons";

</script>

<style>
  footer {
    background-color: #f6f6f6;
  }
</style>

<footer class="relative p-4">
<Button  scrollTop on:click={()=> window.scrollTo(0,0)}><ArrowUpMinor class="w-5 fill-current" /></Button>
  <section
    class="container mx-auto mb-8 mt-4 md:flex md:items-center md:justify-around">
    <div class="flex justify-center mb-8 md:mb-0">
      <FacebookIcon className="w-5 md:w-6 mr-4" />
      <InstagramIcon className="w-5 md:w-6 mr-4" />
      <p class="font-bold text-ocitanda-green text-sm uppercase">@Ocitanda</p>
    </div>
    <InputText placeholder="Subscrever Email" />
  </section>
  <section class="container mx-auto text-ocitanda-green">
    <p class="text-sm text-center">
      Copyright &copy;2020
      <span class="uppercase">Ocitanda</span>
      . Todos direitos reservados.
    </p>
  </section>
</footer>
