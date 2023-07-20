<template>
  <header-component />
  <main class="min-h-screen bg-white flex">
    <menu-component :view="view" />
    <section
      class="u-container"
      :class="
        view === 'eventos' ||
        view === 'clientes' ||
        view === 'promotores' ||
        view === 'tickets'
          ? ''
          : 'grid grid-cols-1 xl:grid-cols-3 items-start justify-between gap-10 xl:gap-40'
      "
    >
      <!-- tablas -->
      <evento-component v-if="view === 'eventos'" />
      <cliente-component v-if="view === 'clientes'" />
      <promotor-component v-if="view === 'promotores'" />
      <ticket-component v-if="view === 'tickets'" />
      <!-- formularios -->

      <create-event-component v-if="view === 'create-event'" />
      <create-promotor-component v-if="view === 'create-promotor'" />
    </section>
  </main>
</template>
<script>
import HeaderComponent from "../../components/Administrador/Header/HeaderComponent.vue";
import MenuComponent from "../../components/Administrador/Menu/MenuComponent.vue";
import EventoComponent from "../../components/Administrador/Evento/EventoComponent.vue";
import ClienteComponent from "../../components/Administrador/Cliente/ClienteComponent.vue";
import PromotorComponent from "../../components/Administrador/Promotor/PromotorComponent.vue";
import TicketComponent from "../../components/Administrador/Ticket/TicketComponent.vue";
import CreateEventComponent from "../../components/Administrador/Evento/CreateEventComponent.vue";
import CreatePromotorComponent from "../../components/Administrador/Promotor/CreatePromotorComponent.vue";
export default {
  components: {
    HeaderComponent,
    MenuComponent,
    EventoComponent,
    EventoComponent,
    ClienteComponent,
    PromotorComponent,
    TicketComponent,
    CreateEventComponent,
    CreatePromotorComponent,
  },
  data() {
    return {
      view: this.$route.params.viewAdmin,
    };
  },
  watch: {
    "$route.params.viewAdmin": function (val) {
      this.view = val;
    },
  },
};
</script>
