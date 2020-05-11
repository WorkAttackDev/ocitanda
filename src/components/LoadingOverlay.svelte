<script>

</script>

<style>
  @keyframes blink {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  div > * {
    animation: blink 1s ease-in-out alternate infinite both;
  }
</style>

<div
  class="fixed w-full h-full top-0 left-0 flex flex-col bg-white justify-center
  items-center text-primary-500">
  <h1 class="text-6xl">WAB</h1>
  <p class="text-3xl">carregando...</p>
</div>
