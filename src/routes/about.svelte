<script>
  import AboutInfo from "../components/about/AboutInfo.svelte";
  import PageHeader from "../components/PageHeader.svelte";
  import AboutCard from "../components/about/AboutCard.svelte";
  import ContactBox from "../components/ContactBox.svelte";

  const texts = [
    {
      title: "Nossos Valores",
      desc:
        "Foco na “necessidade” do consumidor, compromisso com a excelência, responsabilidade Social e ambiental, solidariedade, valorização e respeito às pessoas, criatividade e inovação na busca de soluções e credibilidade de mercado.",
      imgSrc: "/group.jpg",
    },
    {
      title: "Nossa Visão",
      desc:
        "Fornecer produtos nacionais com qualidade e excelência, com o fim último de aprimorar e contribuir para a qualidade de vida e bem estar dos seus clientes, parceiros, bem com de todos os stakeholders.",
      imgSrc: "/meeting.jpg",
    },
    {
      title: "Nossa Missão",
      desc:
        "Distribuir alimentos nacionais com qualidade e pontualidade, conquistando assim a total confiança e satisfação dos clientes, tornando-se numa marca de referência na distribuição de alimentos nacionais.",
      imgSrc: "/trust.jpg",
    },
  ];
</script>

<section class="flex flex-col overflow-x-hidden">
  <PageHeader />
  <AboutInfo />
  <article class="flex flex-col justify-center items-center md:flex-row">
    {#each texts as { title, desc, imgSrc }}
      <AboutCard
        className="w-11/12 md:w-2/6 mb-2"
        {imgSrc}
        {title}
        imgAlt={title}>
        {desc}
      </AboutCard>
    {/each}
  </article>
  <ContactBox />
</section>
