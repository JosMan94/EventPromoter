<template>
  <!-- Buscador -->
  <article class="mb-6">
    <h2 class="font-bold text-xl xl:text-3xl mb-5 xl:mb-10 text-text-blue">
      Lista de clientes
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
        <!-- <button
          class="py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl border border-gray-300 shadow-sm"
        >
          <img src="../../../assets/images/filtros.png" alt="Filtros" />
          Filtrar por
        </button> -->
        <button
          @click.prevent="deleteMultipleSelect"
          class="py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl bg-main-red text-white"
          v-if="deleteList.length !== 0"
        >
          <!-- <img src="../../../assets/images/plus.png" alt="Agregar" /> -->
          Eliminar
        </button>
      </div>
    </form>
  </article>
  <!-- Tabla -->
  <article>
    <div class="rounded-xl overflow-hidden shadow-lg mb-10">
      <header class="hidden xl:grid grid-cols-13 gap-5 table-head">
        <div class="col-span-3 flex items-center gap-5">
          <!-- <input
            :checked="deleteList.length !== 0"
            type="checkbox"
            class="w-5 h-5 mr-4"
            @change="deleteGroup(clientes, 'all')"
          /> -->
          <p class="">NOMBRE Y APELLIDOS</p>
          <!-- <img src="../../../assets/images/arrow-down.png" alt="down" /> -->
        </div>
        <p class="col-span-2 flex items-center gap-4">
          DOCUMENTO
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
        <p class="col-span-2 flex items-center gap-4">
          TELÉFONO
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
        <p
          class="col-span-2 flex items-center gap-4 cursor-pointer"
          @click.prevent="changeTableOrder('date_of_brith')"
        >
          F. NACIMIENTO
          <img
            src="../../../assets/images/arrow-down.png"
            :class="table.order_type === 'date_of_brith' ? 'transform rotate-180' : ''"
            alt=""
          />
        </p>
        <p class="col-span-2 flex items-center gap-4">
          E-MAIL
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
        <p class="col-span-2 flex items-center gap-4">
          ACCIONES
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
      </header>
      <span v-for="data in clientes" :key="data">
        <div class="grid grid-cols-2 xl:grid-cols-13 gap-5 table-row">
          <div class="xl:col-span-3 xl:flex items-center gap-5">
            <!-- <input
              :checked="data.check"
              type="checkbox"
              @change="deleteGroup(data, 'one')"
              class="hidden xl:block w-5 h-5 mr-4"
            /> -->

            <p class="">
              <span class="block xl:hidden text-text-blue mb-2">Nombre y Apellidos:</span>
              {{ data.name }}
            </p>
          </div>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">Documento</span>
            {{ data.document }}
          </p>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">Teléfono:</span>
            {{ data.cellphone }}
          </p>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">F. Nacimiento:</span>
            {{ data.date_of_brith }}
          </p>
          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">E-mail:</span>
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
import { clientService } from "../../../service/Cliente/cliente.service";
import { verifyService } from "../../../service/Verify/verify.service";
import { deleteService } from "../../../service/Delete/delete.service";
export default {
  data() {
    return {
      clientes: [],
      pagination: {
        state: false,
        links: [],
      },
      clave: "",
      deleteList: [],
      table: {
        order_type: "id",
      },
    };
  },
  mounted() {
    this.getClients();
  },
  methods: {
    deleteGroup(data, type) {
      if (type === "one") {
        if (this.deleteList.length === 0) {
          this.deleteList.push(data.id);
          data.check = true;
        } else {
          let found = this.deleteList.find((element) => element === data.id);
          if (found) {
            this.deleteList = this.deleteList.filter((id) => id !== data.id);
            data.check = false;
          } else {
            this.deleteList.push(data.id);
            data.check = true;
          }
        }
      }
      if (type === "all") {
        if (this.deleteList.length === 0) {
          this.clientes.forEach((element) => (element.check = true));
          this.clientes.forEach((element) => this.deleteList.push(element.id));
        } else {
          this.deleteList = [];
          this.clientes.forEach((element) => (element.check = false));
        }
      }
    },
    async deleteMultipleSelect() {
      var opcion = confirm("Desea eliminar");
      if (opcion == true) {
        var result = await deleteService.deletemultiple(this.deleteList, "Cliente");
        if (result.success) {
          window.location.reload();
        } else {
          alert("Error al eliminar");
        }
      }
    },
    async search() {
      var objPage = new Object();
      objPage.clave = this.clave;
      objPage.table = "adminClientes";
      var result = await verifyService.searchTable(objPage);
      if (result.success) {
        this.pagination.state = true;
        this.clientes = result.data;
      } else {
        alert("Error en la búsqueda");
      }
    },
    changeTableOrder(data) {
      this.table.order_type = data;
      this.getClients();
    },
    async getClients(option, data) {
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
      var result = await clientService.getClient(objPage);
      if (result.success) {
        this.pagination.state = false;
        this.clientes = result.data.data;
        this.clientes.forEach((element) => (element.check = false));

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
        alert("Error al mostrar los clientes");
      }
    },
  },
  watch: {
    clave: function (val) {
      if (val === "") {
        this.getClients();
      }
    },
  },
};
</script>
