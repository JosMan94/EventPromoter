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
        @click.prevent="changeView('clientes')"
        :class="view === 'clientes' || view === 'edit-client' ? 'bg-main-green' : ''"
        type="button"
        class="py-5 pl-3 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-green transition-colors"
      >
        <img src="../../../assets/images/icon-clientes.png" alt="CLIENTES" width="25" />
        Clientes
      </button>

      <button
        @click.prevent="changeView('eventos')"
        :class="
          view === 'eventos' || view === 'create-event' || view === 'edit-event'
            ? 'bg-main-green'
            : ''
        "
        type="button"
        class="py-5 pl-3 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-green transition-colors"
      >
        <img src="../../../assets/images/icon-eventos.png" alt="EVENTOS" width="25" />
        Eventos
      </button>

      <button
        @click.prevent="openSelectUser"
        :class="
          view === 'promotores' ||
          view === 'create-promotor' ||
          view === 'edit-promotor' ||
          view === 'regalo-promotor' ||
          view === 'invitados' ||
          view === 'create-invitado' ||
          view === 'edit-invitado' ||
          view === 'regalo-invitado' ||
          view === 'cajeros' ||
          view === 'create-cajero' ||
          view === 'meseros' ||
          view === 'create-mesero' ||
          view === 'auxiliar' ||
          view === 'create-auxiliar' ||
          view === 'edit-auxiliar' ||
          view === 'admin' ||
          view === 'create-admin' ||
          view === 'edit-admin' ||
          view === 'edit-cajero' ||
          view === 'edit-mesero'
            ? 'bg-main-green'
            : ''
        "
        type="button"
        class="py-5 pl-3 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-green transition-colors"
      >
        <img
          src="../../../assets/images/icon-promotores.png"
          alt="PROMOTORES"
          width="25"
        />
        Usuarios
      </button>

      <span :class="selectUsers ? '' : 'hidden'">
        <button
          @click.prevent="changeView('promotores')"
          :class="
            view === 'promotores' ||
            view === 'create-promotor' ||
            view === 'edit-promotor' ||
            view === 'regalo-promotor'
              ? 'bg-main-yellow'
              : ''
          "
          type="button"
          class="py-5 pl-8 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-yellow transition-colors"
        >
          <img
            src="../../../assets/images/icon-invitado.png"
            alt="PROMOTORES"
            width="20"
          />
          Promotores
        </button>

        <button
          @click.prevent="changeView('invitados')"
          :class="
            view === 'invitados' ||
            view === 'create-invitado' ||
            view === 'edit-invitado' ||
            view === 'regalo-invitado'
              ? 'bg-main-yellow'
              : ''
          "
          type="button"
          class="py-5 pl-8 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-yellow transition-colors"
        >
          <img src="../../../assets/images/icon-invitado.png" alt="ENVITADO" width="20" />
          Invitados
        </button>
        <button
          @click.prevent="changeView('cajeros')"
          :class="
            view === 'cajeros' || view === 'create-cajero' || view === 'edit-cajero'
              ? 'bg-main-yellow'
              : ''
          "
          type="button"
          class="py-5 pl-8 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-yellow transition-colors"
        >
          <img src="../../../assets/images/icon-invitado.png" width="20" alt="CAJEROS" />
          Cajeros
        </button>
        <button
          @click.prevent="changeView('meseros')"
          :class="
            view === 'meseros' || view === 'create-mesero' || view === 'edit-mesero'
              ? 'bg-main-yellow'
              : ''
          "
          type="button"
          class="py-5 pl-8 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-yellow transition-colors"
        >
          <img src="../../../assets/images/icon-invitado.png" width="20" alt="MESEROS" />
          Meseros
        </button>
        <button
          @click.prevent="changeView('auxiliar')"
          :class="
            view === 'auxiliar' || view === 'create-auxiliar' || view === 'edit-auxiliar'
              ? 'bg-main-yellow'
              : ''
          "
          type="button"
          class="py-5 pl-8 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-yellow transition-colors"
        >
          <img src="../../../assets/images/icon-invitado.png" width="20" alt="MESEROS" />
          Auxiliar
        </button>
        <button
          @click.prevent="changeView('admin')"
          :class="
            view === 'admin' || view === 'create-admin' || view === 'edit-admin'
              ? 'bg-main-yellow'
              : ''
          "
          type="button"
          class="py-5 pl-8 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-yellow transition-colors"
        >
          <img src="../../../assets/images/icon-invitado.png" width="20" alt="MESEROS" />
          Admin
        </button>
      </span>
      <button
        @click.prevent="changeView('tickets')"
        :class="view === 'tickets' ? 'bg-main-green' : ''"
        type="button"
        class="py-5 pl-3 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-green transition-colors"
      >
        <img src="../../../assets/images/icon-tickets.png" alt="TICKETS" width="25" />
        Tickets
      </button>
      <button
        @click.prevent="changeView('regalos')"
        :class="view === 'regalos' || view === 'create-regalo' ? 'bg-main-green' : ''"
        type="button"
        class="py-5 pl-3 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-green transition-colors"
      >
        <img src="../../../assets/images/icon-regalo.png" alt="regalos" width="25" />
        Regalos
      </button>
      <button
        @click.prevent="changeView('funcionality')"
        :class="view === 'funcionality' ? 'bg-main-green' : ''"
        type="button"
        class="py-5 pl-3 pr-8 flex gap-2 w-full text-white items-center hover:bg-main-green transition-colors"
      >
        <img src="../../../assets/images/icon-tuerca.png" alt="regalos" width="25" />
        Funciones
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
    :class="$store.state.nav.status ? '' : 'hidden'"
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
          @click.prevent="changeView('clientes')"
          :class="view === 'clientes' || view === 'edit-client' ? 'bg-main-green' : ''"
          type="button"
          class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-green transition-colors"
        >
          <img src="../../../assets/images/icon-clientes.png" alt="CLIENTES" />
          Clientes
        </button>
        <button
          @click.prevent="changeView('eventos')"
          :class="
            view === 'eventos' || view === 'create-event' || view === 'edit-event'
              ? 'bg-main-green'
              : ''
          "
          type="button"
          class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-green transition-colors"
        >
          <img src="../../../assets/images/icon-eventos.png" alt="EVENTOS" />
          Eventos
        </button>
        <button
          @click.prevent="openSelectUser"
          :class="
            view === 'promotores' ||
            view === 'create-promotor' ||
            view === 'edit-promotor' ||
            view === 'regalo-promotor' ||
            view === 'invitados' ||
            view === 'create-invitado' ||
            view === 'edit-invitado' ||
            view === 'regalo-invitado' ||
            view === 'cajeros' ||
            view === 'create-cajero' ||
            view === 'meseros' ||
            view === 'create-mesero' ||
            view === 'auxiliar' ||
            view === 'create-auxiliar' ||
            view === 'edit-auxiliar' ||
            view === 'admin' ||
            view === 'create-admin' ||
            view === 'edit-admin' ||
            view === 'edit-cajero' ||
            view === 'edit-mesero'
              ? 'bg-main-green'
              : ''
          "
          type="button"
          class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-green transition-colors"
        >
          <img
            src="../../../assets/images/icon-promotores.png"
            alt="PROMOTORES"
            width="30"
          />
          Usuarios
        </button>
        <span :class="selectUsers ? '' : 'hidden'">
          <button
            @click.prevent="changeView('promotores')"
            :class="
              view === 'promotores' ||
              view === 'create-promotor' ||
              view === 'edit-promotor' ||
              view === 'regalo-promotor'
                ? 'bg-main-yellow'
                : ''
            "
            type="button"
            class="py-5 pl-16 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-yellow transition-colors"
          >
            <img
              src="../../../assets/images/icon-invitado.png"
              alt="PROMOTORES"
              width="20"
            />
            Promotores
          </button>
          <button
            @click.prevent="changeView('invitados')"
            :class="
              view === 'invitados' ||
              view === 'create-invitado' ||
              view === 'edit-invitado' ||
              view === 'regalo-invitado'
                ? 'bg-main-yellow'
                : ''
            "
            type="button"
            class="py-5 pl-16 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-yellow transition-colors"
          >
            <img
              src="../../../assets/images/icon-invitado.png"
              width="20"
              alt="INVITADOS"
            />
            Invitados
          </button>
          <button
            @click.prevent="changeView('cajeros')"
            :class="
              view === 'cajeros' || view === 'create-cajero' || view === 'edit-cajero'
                ? 'bg-main-yellow'
                : ''
            "
            type="button"
            class="py-5 pl-16 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-yellow transition-colors"
          >
            <img
              src="../../../assets/images/icon-invitado.png"
              width="20"
              alt="PROMOTORES"
            />
            Cajeros
          </button>
          <button
            @click.prevent="changeView('meseros')"
            :class="
              view === 'meseros' || view === 'create-mesero' || view === 'edit-mesero'
                ? 'bg-main-yellow'
                : ''
            "
            type="button"
            class="py-5 pl-16 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-yellow transition-colors"
          >
            <img
              src="../../../assets/images/icon-invitado.png"
              width="20"
              alt="PROMOTORES"
            />
            Meseros
          </button>
          <button
            @click.prevent="changeView('auxiliar')"
            :class="
              view === 'auxiliar' ||
              view === 'create-auxiliar' ||
              view === 'edit-auxiliar'
                ? 'bg-main-yellow'
                : ''
            "
            type="button"
            class="py-5 pl-16 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-yellow transition-colors"
          >
            <img
              src="../../../assets/images/icon-invitado.png"
              width="20"
              alt="PROMOTORES"
            />
            Auxiliar
          </button>
          <button
            @click.prevent="changeView('admin')"
            :class="
              view === 'admin' || view === 'create-admin' || view === 'edit-admin'
                ? 'bg-main-yellow'
                : ''
            "
            type="button"
            class="py-5 pl-16 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-yellow transition-colors"
          >
            <img src="../../../assets/images/icon-invitado.png" width="20" alt="ADMIN" />
            Admin
          </button>
        </span>

        <button
          @click.prevent="changeView('tickets')"
          :class="view === 'tickets' ? 'bg-main-green' : ''"
          type="button"
          class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-green transition-colors"
        >
          <img src="../../../assets/images/icon-tickets.png" alt="Tickets" />
          Tickets
        </button>
        <button
          @click.prevent="changeView('regalos')"
          :class="view === 'regalos' || view === 'create-regalo' ? 'bg-main-green' : ''"
          type="button"
          class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-green transition-colors"
        >
          <img src="../../../assets/images/icon-regalo.png" alt="Tickets" width="30" />
          Regalos
        </button>
        <button
          @click.prevent="changeView('funcionality')"
          :class="view === 'funcionality' ? 'bg-main-green' : ''"
          type="button"
          class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-green transition-colors"
        >
          <img src="../../../assets/images/icon-tuerca.png" alt="Tickets" width="30" />
          Funcionalidades
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
        id="btn-cerrar-menu"
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
    return {
      selectUsers: false,
    };
  },
  mounted() {},
  methods: {
    openSelectUser() {
      this.selectUsers = !this.selectUsers;
    },
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
      this.$router.push({ name: "Administrador", params: { viewAdmin: value } });
    },
  },
};
</script>
