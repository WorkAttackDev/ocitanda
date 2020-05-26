<script>
  export let src;
  export let alt;
  export let className = "";
</script>

<style>
  img {
    max-height: 20rem;
  }
</style>

<figure class={`cursor-pointer flex items-center ${className}`}>
  <img class="w-full h-full object-cover" {src} {alt} />
</figure>
