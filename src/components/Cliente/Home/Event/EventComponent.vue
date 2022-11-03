<template>
  <div id="eventos" class="bg-ladrillos">
    <div class="u-container">
      <Splide
        id="carousel-hero"
        :options="optionsEvent"
        :extensions="extensions"
        aria-label="Eventos"
        class="splide"
      >
        <SplideSlide
          class="items-center splide__slide"
          v-for="data in eventos"
          :key="data"
        >
          <img :src="data.banner" alt="Event" />
          <router-link
            :to="{
              name: 'RegisterEvent',
              params: { code: data.code_event },
            }"
            class="py-3 px-6 text-sm font-bold text-white bg-gray-400 rounded-lg block w-max mx-auto mt-6"
            >Entrada gratis</router-link
          >
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>
<script>
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { clientService } from "../../../../service/Cliente/cliente.service";
export default {
  data() {
    return {
      optionsEvent: {
        classes: {
          arrows: "splide__arrows main-green",
          arrow: "splide__arrow main-green",
        },
        pagination: false,
        focus: "center",
        type: "loop",
        perMove: "1",
        perPage: 5,
        breakpoints: {
          640: {
            perPage: 2,
          },
        },
        autoScroll: {
          speed: 1.5,
        },
      },
      extensions: {
        AutoScroll,
      },

      eventos: [],
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      var result = await clientService.getEvent();
      if (result.success) {
        this.eventos = result.data.data;
      } else {
        alert("Error al mostrar los Eventos");
      }
    },
  },
};
</script>
<style>
.main-green {
  background-color: #77d330;
}
</style>
