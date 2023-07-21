<template>
  <!-- Buscador -->
  <article class="mb-6">
    <h2 class="font-bold text-xl xl:text-3xl mb-5 xl:mb-10 text-text-blue">
      Lista de Regalos
    </h2>
    <form class="grid xl:grid-cols-2 gap-6">
      <div class="relative">
        <input
          class="w-full bg-gray-100 rounded-2xl py-4 px-6 text-base shadow-md"
          type="text"
          placeholder="Ingresar palabra clave"
          v-model="clave"
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
      <div class="hidden xl:flex justify-between">
        <button
          class="invisible py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl border border-gray-300 shadow-sm"
        >
          <img src="../../../assets/images/filtros.png" alt="Filtros" />
          Filtrar por
        </button>
        <button
          class="invisible py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl bg-main-red text-white"
        >
          <!-- <img src="../../../assets/images/plus.png" alt="Agregar" /> -->
          Eliminar
        </button>
        <router-link
          :to="{ name: 'Administrador', params: { viewAdmin: 'create-regalo' } }"
          class="py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl bg-main-green text-white"
        >
          <img src="../../../assets/images/plus.png" alt="Agregar" />
          Crear Regalo
        </router-link>
      </div>
    </form>
  </article>
  <!-- Tabla -->
  <article>
    <div class="rounded-xl overflow-hidden shadow-lg mb-10">
      <header class="hidden xl:grid grid-cols-11 gap-5 table-head">
        <div class="col-span-3 flex items-center gap-5">
          <!-- <input
            :checked="deleteList.length !== 0"
            type="checkbox"
            class="w-5 h-5 mr-4"
            @change="deleteGroup(clientes, 'all')"
          /> -->
          <p class="">ID</p>
          <!-- <img src="../../../assets/images/arrow-down.png" alt="down" /> -->
        </div>
        <p class="col-span-2 flex items-center gap-4">
          TÍTULO
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
        <p class="col-span-2 flex items-center gap-4">
          DESCRIPCIÓN
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
        <!-- @click.prevent="changeTableOrder('date_of_brith')" -->
        <p class="col-span-2 flex items-center gap-4">
          CANTIDAD
          <!-- <img
            src="../../../assets/images/arrow-down.png"
            :class="table.order_type === 'date_of_brith' ? 'transform rotate-180' : ''"
            alt=""
          /> -->
        </p>
        <p class="col-span-2 flex items-center gap-4">
          EVENTO
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
      </header>
      <span v-for="data in regalos" :key="data">
        <div class="grid grid-cols-2 xl:grid-cols-11 gap-5 table-row">
          <div class="xl:col-span-3 xl:flex items-center gap-5">
            <p class="">
              <span class="block xl:hidden text-text-blue mb-2">ID:</span>
              {{ data.id }}
            </p>
          </div>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">TÍTULO:</span>
            {{ data.title }}
          </p>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">DESCRIPCIÓN:</span>
            {{ data.description }}
          </p>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">CANTIDAD:</span>
            {{ data.amount }}
          </p>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">EVENTO:</span>
            {{ data.name }}
          </p>
        </div>
      </span>
    </div>
    <div
      v-if="pagination.state === false"
      class="bg-gray-100 flex gap-1 items-center justify-end w-max ml-auto px-2 rounded-2xl"
    >
      <button class="h-8 w-8 rounded-full flex items-center justify-center">
        <img src="../../../assets/images/arrow-left.png" alt="Prev" />
      </button>
      <span v-for="data in pagination.links" :key="data">
        <button
          @click.prevent="getRegalos(true, data.label)"
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
</template>
<script>
import { regaloService } from "../../../service/Regalo/regalo.service";

export default {
  data() {
    return {
      regalos: [],
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
    this.getRegalos();
  },
  methods: {
    async search() {
      var objPage = new Object();
      objPage.clave = this.clave;
      objPage.table = "adminRegalos";
      var result = await verifyService.searchTable(objPage);
      if (result.success) {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Resultado de la búsqueda";
        this.pagination.state = true;
        this.clientes = result.data;
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Error en la búsqueda";
        alert("Error en la búsqueda");
      }
    },
    async getRegalos(option, data) {
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
      var result = await regaloService.getRegalo(objPage);
      if (result.success) {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Listado de regalos";

        this.pagination.state = false;
        this.regalos = result.data.data;

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
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Error al mostrar regalos";
      }
    },
  },
  watch: {
    clave: function (val) {
      if (val === "") {
        this.getRegalos();
      }
    },
  },
};
</script>
