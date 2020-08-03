<script>
  import { createEventDispatcher } from "svelte";
  import { notification } from "../stores/notification";
  import Button from "./Button.svelte";

  export let value;
  let preview = value;

  const dispatch = createEventDispatcher();
  const ext = [".jpg", ".jpeg", ".png"];

  const onChange = (e) => {
    const files = e.target.files;
    if (!files && files.length !== 1) return;
    if (!ext.some((_e) => files[0].name.toLowerCase().endsWith(_e)))
      return notification.show({
        type: "error",
        msg: "Só é permitido fotos no formato jpg, png ou jpeg!",
        title: "Formato Invalido"
      });
    if (files[0].size && files[0].size > 4000000)
      return notification.show({
        type: "error",
        msg: "o tamanho maximo permitido é 4MB!",
        title: "Tamanho Invalido"
      });
    const fr = new FileReader();

    fr.onload = () => {
      preview = fr.result;
      dispatch("upload", files[0]);
    };

    fr.readAsDataURL(files[0]);
  };
</script>

<style>

</style>

<figure class="w-40 mb-8 mx-auto">
  <img
    class="w-full h-40 object-cover mb-4"
    src={preview ? preview : '/img_upload.jpg'}
    alt="upload here" />
  <Button className="relative w-full">
    Carregar imagem
    <input
      class="absolute w-full h-full left-0 top-0 opacity-0 cursor-pointer"
      type="file"
      name="image"
      accept=".jpg,.png,.jpeg"
      on:change={onChange} />
  </Button>
</figure>
