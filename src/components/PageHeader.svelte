<script>
  import { fly, fade } from "svelte/transition";
  export let title = "O mercado à sua porta", subTitle= "Este é o conceito da OCITANDA", imgAlt = "home delivery", imgSrc = "/ocitanda/8.jpg", contrast = false;
</script>

<style>
  	header{
      min-height: 30rem;
    }
</style>

<header in:fade class="relative flex flex-col justify-center overflow-x-hidden">
  <span
    in:fly={{ x: 500, duration: 1000 }}
    class:bg-opacity-75={contrast}
    class:bg-ocitanda-brown={contrast}
    class="relative z-10 flex flex-col p-8 bg-ocitanda-green bg-opacity-50
    text-white">
    <h1 class="text-4xl font-bold">{title}</h1>
    <h3 class="text-2xl font-bold mb-4">{subTitle}</h3>
    <p class="text-lg text-ocitanda-beige">
      <slot>
      Somos especializados na distribuição de alimentos orgânicos e frescos,
      contando para isso, com uma equipa qualificada na busca de soluções
      adequadas para o bem-estar dos nossos clientes e colaboradores. Prezamos
      por padrões de qualidade focados na conquista e fidelização dos nossos
      clientes.
      </slot>
    </p>
  </span>
  <figure class="absolute top-0 left-0 w-full h-full flex">
    <img
      class="w-full h-full object-cover"
      src={imgSrc}
      alt={imgAlt} />
  </figure>
</header>
