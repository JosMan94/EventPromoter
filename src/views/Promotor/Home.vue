<template>
  <header-component />
  <main class="min-h-screen bg-white flex">
    <menu-component :view="view" @viewChange="view = $event" />
    <section class="u-container">
      <evento-component v-if="view === 'eventos'" />
      <ticket-component v-if="view === 'tickets'" />
    </section>
  </main>
</template>
<script>
import HeaderComponent from "../../components/Promotor/Header/HeaderComponent.vue";
import MenuComponent from "../../components/Promotor/Menu/MenuComponent.vue";
import EventoComponent from "../../components/Promotor/Evento/EventoComponent.vue";
import TicketComponent from "../../components/Promotor/Ticket/TicketComponent.vue";
export default {
  components: { HeaderComponent, MenuComponent, EventoComponent, TicketComponent },
  data() {
    return {
      view: this.$route.params.viewPromotor,
    };
  },
};
</script>
