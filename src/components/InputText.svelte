<script>
  export let value;
  export let placeholder = "Digite aqui";
</script>

<input
  class="px-4 py-2 hover:shadow-xs outline-none"
  type="text"
  {placeholder}
  bind:value />
