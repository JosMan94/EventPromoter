<template>
  <!-- Buscador -->
  <article class="mb-6">
    <h2 class="font-bold text-xl xl:text-3xl mb-5 xl:mb-10 text-text-blue">Promotores</h2>
    <form class="grid xl:grid-cols-2 gap-6">
      <div class="relative">
        <input
          class="w-full bg-gray-100 rounded-2xl py-4 px-6 text-base shadow-md"
          type="text"
          placeholder="Buscar por documento"
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
        <router-link
          :to="{ name: 'Administrador', params: { viewAdmin: 'create-promotor' } }"
          class="py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl bg-main-green text-white"
        >
          <img src="../../../assets/images/plus.png" alt="Agregar" />
          Crear Promotor
        </router-link>
      </div>
    </form>
  </article>
  <!-- Tabla -->
  <article>
    <div class="rounded-xl overflow-hidden shadow-lg mb-10">
      <header class="hidden xl:grid grid-cols-10 gap-5 table-head">
        <div class="col-span-2 flex items-center gap-5">
          <input type="checkbox" class="w-5 h-5 mr-4" />
          <p class="">NOMBRE Y APELLIDOS</p>
          <img src="../../../assets/images/arrow-down.png" alt="down" />
        </div>
        <p class="col-span-2 flex items-center gap-4">
          Cód. promotor
          <img src="../../../assets/images/arrow-down.png" alt="" />
        </p>
        <p class="col-span-2 flex items-center gap-4">
          ALIAS
          <img src="../../../assets/images/arrow-down.png" alt="" />
        </p>
        <p class="col-span-2 flex items-center gap-4">
          E-MAIL
          <img src="../../../assets/images/arrow-down.png" alt="" />
        </p>
        <p class="col-span-2 flex items-center gap-4">
          ACCIONES
          <img src="../../../assets/images/arrow-down.png" alt="" />
        </p>
      </header>
      <span v-for="data in promotores" :key="data">
        <div class="grid grid-cols-2 xl:grid-cols-10 gap-5 table-row">
          <div class="xl:col-span-2 xl:flex items-center gap-5">
            <input type="checkbox" class="hidden xl:block w-5 h-5 mr-4" checked />
            <p class="">
              <span class="block xl:hidden text-text-blue mb-2">Nombre y Apellidos:</span>
              {{ data.name }}
            </p>
          </div>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">Cód. de promotor:</span>
            {{ data.code_user }}
          </p>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">Alias:</span>
            {{ data.alias }}
          </p>
          <p class="col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">Correo electrónico:</span>
            {{ data.email }}
          </p>
          <button
            type="button"
            class="hidden xl:block pl-4 xl:col-span-2 flex items-center gap-4"
          >
            <img src="../../../assets/images/more_actions.png" alt="" />
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
  </article>
</template>
<script>
import { promotorService } from "../../../service/Promotor/promotor.service";
import { verifyService } from "../../../service/Verify/verify.service";
export default {
  data() {
    return {
      promotores: [],
      pagination: {
        state: false,
        links: [],
      },
      clave: "",
    };
  },
  mounted() {
    this.getPromotor();
  },
  methods: {
    async search() {
      var objPage = new Object();
      objPage.clave = this.clave;
      objPage.table = "adminPromotores";
      var result = await verifyService.searchTable(objPage);
      if (result.success) {
        this.pagination.state = true;
        this.promotores = result.data;
      } else {
        alert("Error en la búsqueda");
      }
    },
    async getPromotor(option, data) {
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
      var result = await promotorService.getPromotor(objPage);
      if (result.success) {
          this.pagination.state = false;
        this.promotores = result.data.data;
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
        alert("Error al mostrar  los promotores");
      }
    },
  },
  watch: {
    clave: function (val) {
      if (val === "") {
        this.getPromotor();
      }
    },
  },
};
</script>
