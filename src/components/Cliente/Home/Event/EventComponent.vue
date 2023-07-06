<template>
  <div id="eventos" class="bg-ladrillos" v-if="getStatusLoaderEvent">
    <div class="u-container">
      <Splide
        id="carousel-hero"
        :options="optionsEvent"
        :extensions="extensions"
        aria-label="Eventos"
        class="splide"
      >
        <SplideSlide class="items-center splide__slide" v-for="n in 10" :key="n">
          <div
            class="mx-auto rounded-xl bg-light-gray flex items-center justify-center"
            style="height: 85%; min-height: 375px"
          >
            <img src="../../../../assets/images/loader-white.svg" style="width: 70%" />
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>
  <div id="eventos" class="bg-ladrillos" v-else>
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
          <img :src="data.banner" alt="Event" style="height: 85%" />
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
      var result = await clientService.getEvent({ order_type: "id" }, "home");
      if (result.success) {
        this.eventos = result.data.data;
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Error al mostrar los eventos";
      }
    },
  },
  computed: {
    getStatusLoaderEvent() {
      return this.$store.state.loadEvent.status;
    },
  },
};
</script>
<style>
.main-green {
  background-color: #77d330;
}
</style>
