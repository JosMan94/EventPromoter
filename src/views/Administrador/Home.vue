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
        view === 'tickets' ||
        view === 'regalos' ||
        view === 'meseros' ||
        view === 'cajeros' ||
        view === 'invitados'
          ? ''
          : 'grid grid-cols-1 xl:grid-cols-3 items-start justify-between gap-10 xl:gap-40'
      "
    >
      <!-- tablas -->

      <evento-component v-if="view === 'eventos'" @dataEvent="evento = $event" />
      <cliente-component v-if="view === 'clientes'" @dataClient="cliente = $event" />
      <promotor-component
        v-if="view === 'promotores'"
        @dataPromotor="promotor = $event"
      />
      <invitado-component v-if="view === 'invitados'" @dataInvitado="invitado = $event" />
      <ticket-component v-if="view === 'tickets'" />
      <regalo-component v-if="view === 'regalos'" />
      <cajero-component v-if="view === 'cajeros'" />
      <mesero-component v-if="view === 'meseros'" />
      <funcionality-component v-if="view === 'funcionality'" />
      <!-- formularios -->

      <create-event-component v-if="view === 'create-event'" />
      <create-promotor-component v-if="view === 'create-promotor'" />
      <create-regalo-component v-if="view === 'create-regalo'" />
      <create-cajero-component v-if="view === 'create-cajero'" />
      <create-mesero-component v-if="view === 'create-mesero'" />
      <create-invitado-component v-if="view === 'create-invitado'" />

      <edit-evento-component v-if="view === 'edit-event'" :evento="evento" />
      <edit-promotor-component v-if="view === 'edit-promotor'" :promotor="promotor" />
      <edit-client-component v-if="view === 'edit-client'" :cliente="cliente" />
      <edit-invitado-component v-if="view === 'edit-invitado'" :invitado="invitado" />
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
import RegaloComponent from "../../components/Administrador/Regalo/RegaloComponent.vue";
import CreateRegaloComponent from "../../components/Administrador/Regalo/CreateRegaloComponent.vue";
import CajeroComponent from "../../components/Administrador/Cajero/CajeroComponent.vue";
import CreateCajeroComponent from "../../components/Administrador/Cajero/CreateCajeroComponent.vue";
import MeseroComponent from "../../components/Administrador/Mesero/MeseroComponent.vue";
import CreateMeseroComponent from "../../components/Administrador/Mesero/CreateMeseroComponent.vue";
import EditEventoComponent from "../../components/Administrador/Evento/EditEventComponent.vue";
import EditPromotorComponent from "../../components/Administrador/Promotor/EditPromotorComponent.vue";
import EditClientComponent from "../../components/Administrador/Cliente/EditClienteComponent.vue";
import FuncionalityComponent from "../../components/Administrador/Funcionality/FuncionalityComponent.vue";
import InvitadoComponent from "../../components/Administrador/Invitado/InvitadoComponent.vue";
import CreateInvitadoComponent from "../../components/Administrador/Invitado/CreateInvitadoComponent.vue";
import EditInvitadoComponent from "../../components/Administrador/Invitado/EditInvitadoComponent.vue";
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
    RegaloComponent,
    CreateRegaloComponent,
    CajeroComponent,
    CreateCajeroComponent,
    MeseroComponent,
    CreateMeseroComponent,
    EditEventoComponent,
    EditPromotorComponent,
    EditClientComponent,
    FuncionalityComponent,
    InvitadoComponent,
    CreateInvitadoComponent,
    EditInvitadoComponent,
  },
  data() {
    return {
      view: this.$route.params.viewAdmin,
      evento: null,
      promotor: null,
      cliente: null,
      invitado: null,
    };
  },
  watch: {
    "$route.params.viewAdmin": function (val) {
      this.view = val;
    },
  },
};
</script>
