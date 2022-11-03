<template>
  <section class="relative">
    <div class="u-container xl:py-60">
      <article class="xl:w-2/5 text-white mb-10 xl:mb-0">
        <h2 class="font-bold text-2xl xl:text-4xl mb-5 text-main-yellow">
          Experiencias <span class="text-main-green">únicas</span>
          <span class="block mt-2"
            >que encontrarás en <span class="text-main-green">Trujillo</span></span
          >
        </h2>
        <p class="xl:leading-8 text-sm xl:text-lg mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper nec, urna
          sed suscipit ultrices. Scelerisque pellentesque consequat tincidunt magna. Nunc
          commodo tristique id egestas convallis.
        </p>
        <button class="py-4 xl:py-5 px-16 bg-main-green rounded-2xl text-white text-lg">
          Ver video
        </button>
      </article>
      <img
        src="../../../../assets/images/aside-prueba.png"
        class="block w-full xl:w-auto xl:absolute xl:top-32 xl:right-0"
      />
    </div>
  </section>
  <section class="bg-public">
    <div class="u-container">
      <img
        class="block mx-auto py-4 xl:py-8 px-16 xl:px-40 bg-black"
        src="../../../../assets/images/LOGO-WHITE.png"
        alt="LOGO"
      />
    </div>
  </section>

  <section class="u-container">
    <article class="text-white text-center xl:w-8/12 mx-auto">
      <p class="leading-8 mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper nec, urna sed
        suscipit ultrices. Scelerisque pellentesque consequat tincidunt magna. Nunc
        commodo tristique id egestas convallis.
      </p>
      <p class="leading-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper nec, urna sed
        suscipit ultrices. Scelerisque pellentesque consequat tincidunt magna. Nunc
        commodo tristique id egestas convallis.
      </p>
    </article>
  </section>

  <section class="u-container">
    <h2 class="text-main-green text-center text-2xl xl:text-4xl font-bold mb-10">
      Tú tambien puedes parte de <br />
      <span class="text-main-yellow">nuestra experiencia</span> aquí
    </h2>
    <Splide
      id="carousel-experiencia"
      :options="optionsExperience"
      aria-label="Experiencias"
      class="splide"
      :extensions="extensions"
    >
      <SplideSlide>
        <div class="grid grid-cols-5 gap-1 xl:gap-3">
          <img
            src="../../../../assets/images/grid-1.png"
            class="block h-full w-full opacity-40 object-cover col-span-2"
          />
          <img
            src="../../../../assets/images/grid-2.png"
            class="block h-full w-full opacity-40 object-cover col-span-2"
          />
          <img
            src="../../../../assets/images/grid-3.png"
            class="block h-full w-full opacity-40 object-cover"
          />
          <img
            src="../../../../assets/images/grid-4.png"
            class="block h-full w-full opacity-40 object-cover"
          />
          <img
            src="../../../../assets/images/grid-5.png"
            class="block h-full w-full opacity-40 object-cover col-span-2"
          />
          <img
            src="../../../../assets/images/grid-6.png"
            class="block h-full w-full opacity-40 object-cover col-span-2"
          />
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="grid grid-cols-5 gap-1 xl:gap-3">
          <img
            src="../../../../assets/images/grid-1.png"
            class="block h-full w-full opacity-40 object-cover col-span-2"
          />
          <img
            src="../../../../assets/images/grid-2.png"
            class="block h-full w-full opacity-40 object-cover col-span-2"
          />
          <img
            src="../../../../assets/images/grid-3.png"
            class="block h-full w-full opacity-40 object-cover"
          />
          <img
            src="../../../../assets/images/grid-4.png"
            class="block h-full w-full opacity-40 object-cover"
          />
          <img
            src="../../../../assets/images/grid-5.png"
            class="block h-full w-full opacity-40 object-cover col-span-2"
          />
          <img
            src="../../../../assets/images/grid-6.png"
            class="block h-full w-full opacity-40 object-cover col-span-2"
          />
        </div>
      </SplideSlide>
    </Splide>
  </section>
  <section class="bg-black py-12">
    <h2 style="letter-spacing: 1rem" class="text-white text-center xl:text-2xl">
      ESPACIO PUBLICITARIO
    </h2>
  </section>
  <section id="reserva" class="u-container grid xl:grid-cols-2 xl:w-10/12 gap-8 xl:gap-32">
    <article>
      <h2
        class="text-center xl:text-left font-bold text-2xl xl:text-4xl mb-5 text-main-yellow"
      >
        Reserva <span class="text-main-green">tu mesa</span>
      </h2>
      <p class="text-justify xl:text-left leading-8 text-lg mb-5 text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper nec, urna sed
        suscipit ultrices. Scelerisque pellentesque consequat tincidunt magna. Nunc
        commodo tristique id egestas convallis.
      </p>
    </article>
    <article class="grid gap-8 items-center">
      <button
        onclick="Calendly.initPopupWidget({url: 'https://calendly.com/reservastrujillo/casablanca'});return false;"
        class="mx-auto xl:mr-auto py-5 px-16 bg-main-green rounded-2xl text-white text-lg"
      >
        Reservar
      </button>
    </article>
  </section>
</template>
<script>
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
export default {
  data() {
    return {
      optionsExperience: {
        classes: {
          arrows: "splide__arrows main-green",
          arrow: "splide__arrow main-green",
        },
        type: "loop",

        perPage: 1,
        autoScroll: {
          speed: 1,
        },
      },
      extensions: {
        AutoScroll,
      },
    };
  },
};
</script>
