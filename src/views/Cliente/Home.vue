<template>
  <header-component />
  <main>
    <event-component />
    <!-- <experience-component /> -->
  </main>
  <footer-component />
</template>
<script>
import HeaderComponent from "../../components/Cliente/Home/Header/HeaderComponent.vue";
import FooterComponent from "../../components/Cliente/Home/Footer/FooterComponent.vue";
import EventComponent from "../../components/Cliente/Home/Event/EventComponent.vue";
import ExperienceComponent from "../../components/Cliente/Home/Experience/ExperienceComponent.vue";
export default {
  components: { HeaderComponent, FooterComponent, EventComponent, ExperienceComponent },
  data() {
    return {};
  },
};
</script>
