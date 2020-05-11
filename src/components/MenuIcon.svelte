<script>
  export let className = "";

  let isOpen = false;
  // $: console.log(isOpen);

  function toggleIsOpen() {
    isOpen = !isOpen;
  }
</script>

<style>
  .dual::after {
    content: "";
    position: absolute;
    left: 128%;
    top: 0;
    background-color: #ffdfc6;
    width: 0.6rem;
    height: 100%;
  }
</style>

<div
  on:click={toggleIsOpen}
  class={'flex flex-col items-center -my-2 cursor-pointer' + ' ' + className}>
  <span
    class:-rotate-45={isOpen}
    class:translate-y-2={isOpen}
    class="w-10 h-px3 bg-white transform transition duration-500 ease-out" />
  <span
    class="dual w-6 self-start h-px3 bg-white relative transition duration-600
    ease-out"
    class:opacity-0={isOpen}
    style="margin: .35rem 0;" />
  <span
    class:rotate-45={isOpen}
    class:-translate-y-2={isOpen}
    class="w-10 h-px3 bg-white transform transition duration-500 ease-out" />
</div>
