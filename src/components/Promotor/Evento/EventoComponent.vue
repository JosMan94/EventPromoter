<template>
  <!-- Buscador -->
  <article class="mb-6">
    <h2 class="font-bold text-xl xl:text-3xl mb-5 xl:mb-10 text-text-blue">Eventos</h2>
    <form class="grid xl:grid-cols-2 gap-6">
      <div class="relative">
        <input
          class="w-full bg-gray-100 rounded-2xl py-4 px-6 text-base shadow-md"
          type="text"
          placeholder="Busca..."
          v-model="clave"
        />
        <br />
        <button
          @click.prevent="search"
          type="submit"
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
      <header class="hidden xl:grid grid-cols-8 gap-5 table-head">
        <div class="col-span-2 flex items-center gap-5">
          <!-- <input type="checkbox" class="w-5 h-5 mr-4" /> -->
          <p class="">NOMBRE DE EVENTO</p>
          <!-- <img src="../../../assets/images/arrow-down.png" alt="down" /> -->
        </div>
        <p class="col-span-2 flex items-center gap-4">
          FECHA DE EVENTO
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
        <p class="col-span-2 flex items-center gap-4">
          LUGAR
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
        <p class="col-span-2 flex items-center gap-4">
          ACCIONES
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
      </header>
      <span v-for="data in eventos" :key="data">
        <div class="grid grid-cols-2 xl:grid-cols-8 gap-5 table-row">
          <div class="xl:col-span-2 xl:flex items-center gap-5">
            <!-- <input type="checkbox" class="hidden xl:block w-5 h-5 mr-4" checked /> -->
            <p class="">
              <span class="block xl:hidden text-text-blue mb-2">Nombre de evento</span>
              {{ data.name }}
            </p>
          </div>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">Fecha de evento</span>
            {{ data.date }}
          </p>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">Lugar</span>
            {{ data.direction }}
          </p>
          <p class="xl:col-span-2 block xl:hidden items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">N° Generales:</span>
            {{ data.number_tickets }}
          </p>
          <!-- <button
            type="button"
            @click.prevent="charedEvent(data.code_event)"
            class="xl:block pl-4 xl:col-span-2 flex items-center gap-4"
          >
            <img src="../../../assets/images/more_actions.png" alt="" />
          </button> -->

          <button
            @click.prevent="charedEvent(data.code_event)"
            class="rounded-md px-6 py-4 bg-purple-500 text-white ring-2 ring-purple-500 hover:bg-white hover:text-purple-500 transition-colors"
          >
            Copiar enlace
          </button>
        </div>
      </span>
    </div>
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
    <div class="mt-12 flex xl:hidden justify-end items-center gap-12">
      <p>
        Pág.
        <span class="mx-3 py-1 px-3 ring ring-blue-300">{{ dataTable.from }}</span> de
        {{ dataTable.page }}
      </p>
      <div class="flex items-center gap-4">
        <figure
          v-if="dataTable.pastStatus"
          @click.prevent="getEvents(true, pagePast)"
          class="cursor-pointer p-3"
        >
          <img src="../../../assets/images/arrow-left.png" alt="Prev" />
        </figure>
        <figure
          v-if="dataTable.nextStatus"
          @click.prevent="getEvents(true, pageNext)"
          class="cursor-pointer p-3"
        >
          <img src="../../../assets/images/arrow-right.png" alt="Next" />
        </figure>
      </div>
    </div>
  </article>
</template>

<script>
import { clientService } from "../../../service/Cliente/cliente.service";
import { verifyService } from "../../../service/Verify/verify.service";
import { copyText } from "vue3-clipboard";
export default {
  data() {
    return {
      eventos: [],
      codePromotor: null,
      pagination: {
        state: false,
        links: [],
      },
      table: {
        order_type: "id",
      },
      clave: "",
      dataTable: {
        page: 0,
        from: 0,

        next: "",
        past: "",

        nextStatus: false,
        pastStatus: false,
      },
      pageNext: 1,
      pagePast: 1,
    };
  },
  mounted() {
    this.getEvents();
    var codeUser = this.$cookies.get("code");
    if (codeUser) {
      this.codePromotor = codeUser;
    } else {
      this.$store.state.alert.status = true;
      this.$store.state.alert.type = "error";
      this.$store.state.alert.text = "Vuelva a iniciar sesión";
      window.location.reload();
    }
  },
  methods: {
    async search() {
      var objPage = new Object();
      objPage.clave = this.clave;
      objPage.table = "adminEventos";
      var result = await verifyService.searchTable(objPage);
      if (result.success) {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Resultados de la búsqueda";
        this.pagination.state = true;
        this.eventos = result.data;
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Error en la búsqueda";
      }
    },
    charedEvent(codeEvento) {
      copyText(
        "https://in.niiru.club/register/event/" + codeEvento + "/" + this.codePromotor,
        undefined,
        (error, event) => {
          if (error) {
            this.$store.state.alert.status = true;
            this.$store.state.alert.type = "error";
            this.$store.state.alert.text = "Error al copiar el enlace";
          } else {
            this.$store.state.alert.status = true;
            this.$store.state.alert.type = "success";
            this.$store.state.alert.text = "Enlace copiado";
          }
        }
      );
    },
    async getEvents(option, data) {
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
      objPage.order_type = this.table.order_type;
      objPage.typeUser = "promotor";
      var result = await clientService.getEvent(objPage);
      if (result.success) {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Listado de eventos";
        this.pagination.state = false;
        this.eventos = result.data.data;

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

        this.dataTable.page = result.data.last_page;
        this.dataTable.from = result.data.current_page;
        this.dataTable.next = result.data.next_page_url;
        this.dataTable.past = result.data.prev_page_url;

        if (this.dataTable.next !== null) {
          let separator = this.dataTable.next.split("&page=");

          this.pageNext = separator[1];
          this.dataTable.nextStatus = true;
        } else {
          this.dataTable.nextStatus = false;
        }
        if (this.dataTable.past !== null) {
          let separator = this.dataTable.past.split("&page=");

          this.pagePast = separator[1];
          this.dataTable.pastStatus = true;
        } else {
          this.dataTable.pastStatus = false;
        }
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Error al mostrar los eventos";
      }
    },
  },
  watch: {
    clave: function (val) {
      if (val === "") {
        this.getEvents();
      }
    },
  },
};
</script>
