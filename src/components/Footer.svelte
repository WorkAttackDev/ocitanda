<script>
  import InputText from "./InputText.svelte";
  import FacebookIcon from "./FacebookIcon.svelte";
  import InstagramIcon from "./InstagramIcon.svelte";
  import Button from "./Button.svelte";
  import isEmail from "validator/lib/isEmail";
  import { vEmail } from "../lib/validation";
  import { subscribeEmail } from "../api";
  import { ArrowUpMinor } from "svelte-polaris-icons";
  import { notification } from "../stores/notification";
  import { loading } from "../stores/loading";

  let email = "";

  const sendEmail = async () => {
    if (isEmail(email)) {
      loading.show();
      const res = await subscribeEmail(email);
      loading.close();
      if (!res.error) {
        email = "";
        return notification.show(
          "success",
          "Subscrito com sucesso, verifique o seu email.",
          "Subscrito com sucesso"
        );
      }
    }

    notification.show(
      "error",
      "Ocorreu um erro ao subscrever o seu email, tente novamente.",
      "Error ao subscrever"
    );
  };
</script>

<style>
  footer {
    background-color: #f6f6f6;
  }
</style>

<footer class="relative p-4 mt-auto">
  <Button scrollTop on:click={() => window.scrollTo(0, 0)}>
    <ArrowUpMinor class="w-5 fill-current" />
  </Button>
  <section
    class="container mx-auto mb-8 mt-4 md:flex md:items-center md:justify-around">
    <div class="flex justify-center mb-8 md:mb-0">
      <FacebookIcon className="w-5 md:w-6 mr-4" />
      <InstagramIcon className="w-5 md:w-6 mr-4" />
      <p class="font-bold text-ocitanda-green text-sm uppercase">@Ocitanda</p>
    </div>
    <form on:submit|preventDefault={async () => await sendEmail()}>
      <InputText
        on:send={async () => await sendEmail()}
        placeholder="Subscrever Email"
        validators={[vEmail]}
        value={email}
        on:validated={(e) => (e.detail ? (email = e.detail) : null)} />
    </form>
  </section>
  <ul class="flex justify-center mb-4 font-semibold uppercase text-xs text-gray-600">
    <li>
      <a class="hover:text-ocitanda-gold" href="/cookies">política de cookies</a>
    </li>
  </ul>
  <section class="container mx-auto text-ocitanda-green">
    <p class="text-sm text-center">
      Copyright &copy;2020
      <span class="uppercase">Ocitanda</span>
      . Todos direitos reservados.
    </p>
  </section>
</footer>
