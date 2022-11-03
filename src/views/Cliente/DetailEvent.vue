<template>
  <header-component />
  <main class="bg-white">
    <register-component />
  </main>
  <footer-component />
</template>
<script>
import HeaderComponent from "../../components/Cliente/Home/Header/HeaderComponent.vue";
import FooterComponent from "../../components/Cliente/Home/Footer/FooterComponent.vue";
import RegisterComponent from "../../components/Cliente/Evento/RegisterComponent.vue";
export default {
  components: { HeaderComponent, FooterComponent, RegisterComponent },
  data() {
    return {};
  },
};
</script>
