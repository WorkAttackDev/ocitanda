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
        return notification.show({
          type: "success",
          msg: "Subscrito com sucesso, verifique o seu email.",
          title: "Subscrito com sucesso",
        });
      }
    }

    notification.show({
      type: "error",
      msg: "Ocorreu um erro ao subscrever o seu email, tente novamente.",
      title: "Error ao subscrever"
    });
  };
</script>

<style>
  footer {
    background-color: #f6f6f6;
  }

  .center {
    @apply flex justify-center items-center;
  }
</style>

<footer class="relative p-4 mt-auto">
  <Button scrollTop on:click={() => window.scrollTo(0, 0)}>
    <ArrowUpMinor class="w-5 fill-current" />
  </Button>
  <section
    class="container mx-auto mb-4 mt-4 justify-between sm:flex md:items-center
    lg:justify-evenly">
    <div class="flex justify-center items-center">
      <FacebookIcon className="w-5 md:w-6 mr-4" />
      <InstagramIcon className="w-5 md:w-6 mr-4" />
      <p class="font-bold text-ocitanda-green text-sm uppercase">@Ocitanda</p>
    </div>
    <form
      class="my-8 sm:my-0"
      on:submit|preventDefault={async () => await sendEmail()}>
      <InputText
        on:send={async () => await sendEmail()}
        label="Subscrever Email"
        validators={[vEmail]}
        value={email}
        on:validated={(e) => (e.detail ? (email = e.detail) : null)} />
    </form>
    <ul class="center font-semibold uppercase text-xs text-gray-600">
      <li class="center">
        <a class="hover:text-ocitanda-gold" href="/cookies">
          política de cookies
        </a>
      </li>
    </ul>
  </section>
  <section class="container mx-auto text-ocitanda-green">
    <p class="text-sm text-center">
      Copyright &copy;2020
      <span class="uppercase">Ocitanda</span>
      . Todos direitos reservados.
    </p>
  </section>
</footer>
