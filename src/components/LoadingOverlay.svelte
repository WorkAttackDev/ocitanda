<script>
  import Logo from "./Logo.svelte";
</script>

<style>
  @keyframes flout {
    from {
      transform: translateY(-50%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes blink {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .overlay :global(svg #W) {
    animation: flout 1s ease-in-out alternate infinite both;
  }
  .overlay :global(svg #A) {
    animation: flout 1s 0.3s ease-in-out alternate infinite both;
  }
  .overlay :global(svg #B) {
    animation: flout 1s 0.6s ease-in-out alternate infinite both;
  }

  .overlay > p {
    animation: blink 1s ease-in-out alternate infinite both;
  }
</style>

<div
  class="overlay fixed w-full h-full top-0 left-0 flex flex-col bg-white
  justify-center items-center text-primary-500">
  <Logo className="h-32 w-56" original />
  <p class="text-3xl">carregando...</p>
</div>
