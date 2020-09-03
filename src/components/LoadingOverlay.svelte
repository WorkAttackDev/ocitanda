<script>
  import { scale, fade } from "svelte/transition";
</script>

<style>
  .lds-ring div {
    @apply absolute w-32 h-32 box-border block;
    margin: 8px;
    border: 8px solid theme("colors.ocitanda.green");
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: theme("colors.ocitanda.khaki") transparent transparent
      transparent;
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* video {
    max-width: 10rem;
    max-height: 10rem;
  } */

  img{
    width: 20%;
  }
</style>

<span
  transition:fade
  class="fixed z-50 top-0 left-0 flex items-center justify-center w-full h-full
  bg-black bg-opacity-75">
  <!-- <div transition:scale class="lds-ring relative inline-block w-40 h-40"> 
      <div />
      <div />
      <div />
      <div />
    </div> -->
    <img class="max-w-xs" src="/oc_spinner.gif" alt="Ocitanda Spinner">
</span>
