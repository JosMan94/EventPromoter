<template>
  <span v-if="typeForm === 1">
    <!-- Buscador -->
    <article class="mb-6">
      <h2 class="font-bold text-xl xl:text-3xl mb-5 xl:mb-10 text-text-blue">
        Tickets emitidos
      </h2>
      <form class="grid xl:grid-cols-2 gap-6">
        <div class="relative">
          <input
            class="w-full bg-gray-100 rounded-2xl py-4 px-6 text-base shadow-md"
            type="text"
            v-model="clave"
            placeholder="Busca..."
          />
          <br />
          <button
            type="submit"
            @click.prevent="search"
            class="absolute top-0 bottom-0 right-0 flex items-center gap-3 font-bold text-white bg-bg-black rounded-2xl py-4 px-8 xl:px-6 text-base"
          >
            <img src="../../../assets/images/buscar.png" alt="BUSCAR" />
            <span class="hidden xl:block">Buscar</span>
          </button>
        </div>
        <!-- <div class="hidden xl:flex justify-between">
        <button
          class="py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl border border-gray-300 shadow-sm"
        >
          <img src="../../../assets/images/filtros.png" alt="Filtros" />
          Filtrar por
        </button>
        <button
          class="py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl bg-main-green text-white"
        >
          <img src="../../../assets/images/plus.png" alt="Agregar" />
          Agregar Usuario
        </button>
      </div> -->
      </form>
    </article>
    <!-- Tabla -->
    <article>
      <div class="rounded-xl overflow-hidden shadow-lg mb-10">
        <header class="hidden xl:grid grid-cols-17 gap-2 table-head">
          <div class="col-span-3 flex items-center gap-5">
            <p class="xl:pl-8">NOMBRE Y APELLIDOS</p>
            <!-- <img src="../../../assets/images/arrow-down.png" alt="down" /> -->
          </div>
          <p class="col-span-2 flex items-center gap-4">
            DOCUMENTO
            <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
          </p>
          <p class="col-span-2 flex items-center gap-4">
            EVENTO
            <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
          </p>
          <p class="col-span-2 flex items-center gap-4">
            TELÉFONO
            <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
          </p>
          <p class="col-span-2 flex items-center gap-4">
            F. NACIMIENTO
            <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
          </p>
          <p class="col-span-2 flex items-center gap-4">
            E-MAIL
            <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
          </p>
          <p class="col-span-2 flex items-center gap-4">
            PROMOTOR
            <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
          </p>
          <p class="col-span-2 flex items-center gap-4">
            ACCIONES
            <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
          </p>
        </header>
        <span v-for="data in ticketsPromotor" :key="data">
          <div class="relative grid grid-cols-2 xl:grid-cols-17 gap-2 table-row">
            <span
              :class="data.assistance ? 'bg-main-green' : 'bg-main-yellow'"
              class="hidden xl:block absolute top-1 bottom-1 left-0 py-3 px-4 font-black text-2xl text-white rounded-tr-2xl rounded-br-2xl"
              >A</span
            >
            <div class="xl:col-span-3 xl:flex items-center gap-5">
              <p class="xl:pl-8">
                <span class="block xl:hidden text-text-blue mb-2"
                  >Nombre y Apellidos:</span
                >
                {{ data.name }}
              </p>
            </div>

            <p class="xl:col-span-2 xl:flex items-center gap-4">
              <span class="block xl:hidden text-text-blue mb-2">Documento</span>
              {{ data.document }}
            </p>
            <p class="xl:col-span-2 xl:flex items-center gap-4">
              <span class="block xl:hidden text-text-blue mb-2">Evento</span>
              {{ data.nameEvent }}
            </p>
            <p class="xl:col-span-2 xl:flex items-center gap-4">
              <span class="block xl:hidden text-text-blue mb-2">Teléfono:</span>
              {{ data.cellphone }}
            </p>
            <p class="xl:col-span-2 xl:flex items-center gap-4">
              <span class="block xl:hidden text-text-blue mb-2">F. Nacimiento:</span>
              {{ data.date_of_brith }}
            </p>
            <p class="xl:col-span-2 xl:flex items-center gap-4" style="word-break: break-all;">
              <span class="block xl:hidden text-text-blue mb-2">E-mail:</span>
              {{ data.email }}
            </p>
            <p class="xl:col-span-2 xl:flex items-center gap-4">
              <span class="block xl:hidden text-text-blue mb-2">Promotor:</span>
              {{ data.alias }}
            </p>
            <button
              @click.prevent="viewDetailTicket(data.idTicket)"
              class="hidden xl:block pl-4 xl:col-span-2 flex items-center gap-4"
              type="button"
            >
              <img src="../../../assets/images/more_actions.png" alt="" />
            </button>
          </div>
        </span>
      </div>
      <!-- Paginacion -->
      <div
        v-if="pagination.state === false"
        class="bg-gray-100 hidden xl:flex gap-1 items-center justify-end w-max ml-auto px-2 rounded-2xl"
      >
        <button class="h-8 w-8 rounded-full flex items-center justify-center">
          <img src="../../../assets/images/arrow-left.png" alt="Prev" />
        </button>
        <span v-for="data in pagination.links" :key="data">
          <button
            @click.prevent="getClients(true, data.label)"
            :class="data.status ? 'bg-bg-black text-white' : ''"
            class="h-8 w-8 rounded-full flex items-center justify-center hover:bg-bg-black hover:text-white transition-colors"
          >
            {{ data.label }}
          </button>
        </span>
        <button class="h-8 w-8 rounded-full flex items-center justify-center">
          <img src="../../../assets/images/arrow-right.png" alt="Next" />
        </button>
      </div>
    </article>
  </span>

  <span v-if="typeForm === 2">
    <detail-ticket-component :idTicket="idTicket" />
  </span>
</template>
<script>
import { promotorService } from "../../../service/Promotor/promotor.service";
import { verifyService } from "../../../service/Verify/verify.service";
import DetailTicketComponent from "../../Administrador/Ticket/DetailTicketComponent.vue";

export default {
  components: { DetailTicketComponent },
  data() {
    return {
      ticketsPromotor: [],
      typeForm: 1,
      idTicket: null,
      pagination: {
        state: false,
        links: [],
      },
      clave: "",
      table: {
        order_type: "id",
      },
    };
  },
  mounted() {
    this.getTicketPromotor();
  },
  methods: {
    viewDetailTicket(value) {
      this.idTicket = value;
      this.typeForm = 2;
    },
    async search() {
      var objPage = new Object();
      objPage.clave = this.clave;
      objPage.table = "promotorTicket";
      objPage.codePromotor = this.$store.state.codeUser;
      var result = await verifyService.searchTable(objPage);
      if (result.success) {
        this.pagination.state = true;
        this.ticketsPromotor = result.data;
      } else {
        alert("Error en la búsqueda");
      }
    },
    async getTicketPromotor(option, data) {
      if (this.$store.state.codeUser !== null) {
        var page = 0;
        var length = 10;
        if (option) {
          page = data;
        } else {
          page = 1;
        }
        var objPage = new Object();
        objPage.page = page;
        objPage.length = length;
        objPage.codePromotor = this.$store.state.codeUser;
        objPage.order_type = this.table.order_type;
        var result = await promotorService.ticketPromotor(objPage);
        if (result.success) {
          this.pagination.state = false;
          this.ticketsPromotor = result.data.data;
          this.pagination.links = [];
          result.data.links.forEach((element) => {
            var paginateNumber = parseInt(element.label);

            if (paginateNumber) {
              var paginate = new Object();
              paginate.label = paginateNumber;
              if (element.active) {
                paginate.status = true;
              } else {
                paginate.status = false;
              }
              this.pagination.links.push(paginate);
            }
          });
        } else {
          alert("Error al mostrar sus tickets");
        }
      } else {
        this.$store.commit("signOff");
        this.$router.push({ name: "Home" });
        this.$cookies.remove("session");
        this.$cookies.remove("code");
      }
    },
  },
  watch: {
    clave: function (val) {
      if (val === "") {
        this.getTicketPromotor();
      }
    },
  },
};
</script>
