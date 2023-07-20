<template>
  <!-- Menu cerrado -->
  <nav
    class="hidden xl:flex flex-col justify-between py-14 bg-main-blue-black min-h-screen"
  >
    <div>
      <button type="button" class="block w-full mb-10" id="btn-abrir-menu">
        <img src="../../../assets/images/LOGO-MIN.png" alt="LOGO" class="mx-auto" />
      </button>
      <button
        type="button"
        @click.prevent="changeView('eventos')"
        :class="view === 'eventos' ? 'bg-main-green' : ''"
        class="py-5 px-8 flex items-center justify-center hover:bg-main-green transition-colors"
      >
        <img src="../../../assets/images/icon-eventos.png" alt="EVENTOS" />
      </button>
      <button
        type="button"
        @click.prevent="changeView('tickets')"
        :class="view === 'tickets' ? 'bg-main-green' : ''"
        class="py-5 px-8 flex items-center justify-center hover:bg-main-green transition-colors"
      >
        <img src="../../../assets/images/icon-tickets.png" alt="TICKETS" />
      </button>
    </div>
    <button
      @click.prevent="cerrarSesion"
      type="button"
      class="py-4 px-5 bg-text-blue block mx-auto rounded-2xl"
    >
      <img src="../../../assets/images/cerrar-sesion.png" />
    </button>
  </nav>
  <!-- Menu abierto -->
  <div
    :class="$store.state.nav.status ? '' : 'menu-cerrado'"
    class="bg-black bg-opacity-50 fixed top-0 bottom-0 left-0 right-0 transition-transform z-10"
  >
    <nav
      class="relative py-14 bg-main-blue-black min-h-screen xl:w-max flex flex-col justify-between"
    >
      <div>
        <button type="button" class="block w-full mb-10 pl-12 pr-40">
          <img src="../../../assets/images/LOGO.png" alt="LOGO" class="mx-auto" />
        </button>
        <button
          type="button"
          @click.prevent="changeView('eventos')"
          :class="view === 'eventos' ? 'bg-main-green' : ''"
          class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-green transition-colors"
        >
          <img src="../../../assets/images/icon-eventos.png" alt="EVENTOS" />
          Eventos
        </button>
        <button
          type="button"
          @click.prevent="changeView('tickets')"
          :class="view === 'tickets' ? 'bg-main-green' : ''"
          class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-green transition-colors"
        >
          <img src="../../../assets/images/icon-tickets.png" alt="Tickets" />
          Tickets
        </button>
      </div>
      <button
        type="button"
        @click.prevent="cerrarSesion"
        class="py-4 px-5 bg-text-blue block mx-auto rounded-2xl flex items-center gap-5 text-white"
      >
        <img src="../../../assets/images/cerrar-sesion.png" />
        Cerrar Sesión
      </button>
      <button
        @click.prevent="closeNav"
        type="button"
        class="absolute top-8 right-8 h-10 w-10"
      >
        <img src="../../../assets/images/Icon-x.png" alt="Cerrar menu" />
      </button>
    </nav>
  </div>
</template>
<script>
export default {
  props: ["view"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    closeNav() {
      this.$store.state.nav.status = false;
    },
    cerrarSesion() {
      this.$store.commit("signOff");
      this.$router.push({ name: "Home" });
      this.$cookies.remove("session");
      this.$cookies.remove("code");
    },
    changeView(value) {
      this.$emit("viewChange", value);
    },
  },
};
</script>
