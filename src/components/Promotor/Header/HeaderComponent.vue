<template>
  <header class="xl:hidden bg-black text-white">
    <div
      class="u-container py-5 flex items-center justify-center xl:justify-between relative"
    >
      <button @click.prevent="changeStatusMenu" class="absolute left-0 top-6 xl:hidden">
        <img src="../../../assets/images/menu.png" alt="" />
      </button>
      <a href="#">
        <img
          src="../../../assets/images/LOGO.png"
          alt="Logo"
          class="block h-6 w-auto xl:h-auto xl:h-auto mx-auto"
        />
      </a>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeStatusMenu() {
      this.$store.state.nav.status = !this.$store.state.nav.status;
    },
  },
};
</script>
