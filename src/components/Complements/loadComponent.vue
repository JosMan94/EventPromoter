<template>
  <section
    :class="statusLoad ? '' : 'opacity-0 pointer-events-none'"
    class="fixed inset-0 bg-white bg-opacity-80 z-50 grid items-center justify-center transition-opacity cursor-not-allowed"
  >
    <article>
      <img src="../../assets/images/loader.svg" alt="Loading" />
      <h3 class="text-2xl font-bold text-center animate-bounce">Cargando ...</h3>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    statusLoad() {
      return this.$store.state.load.status;
    },
  },
};
</script>
