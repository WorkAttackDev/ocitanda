<script>
  export let title, info;
</script>

<style>

</style>

<div
  class="flex justify-evenly text-ocitanda-green py-2 px-4 rounded-sm shadow-md
  mb-4">
  <slot />
  <span>
    <p class="text-gray-600 capitalize">{title}</p>
    <strong class="">{info}</strong>
  </span>
</div>
