<template>
  <alert-component/>
  <load-component />
  <router-view />
</template>
<script>
import loadComponent from "./components/Complements/loadComponent.vue";
import alertComponent from "./components/Complements/alertComponent.vue";
export default {
  components: { loadComponent ,alertComponent},
};
</script>
