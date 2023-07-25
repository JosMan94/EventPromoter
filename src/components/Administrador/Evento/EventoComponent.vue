<template>
  <!-- Buscador -->
  <article class="mb-6">
    <h2 class="font-bold text-xl xl:text-3xl mb-5 xl:mb-10 text-text-blue">Eventos</h2>
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
      <div class="flex justify-between">
        <button
          class="invisible py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl border border-gray-300 shadow-sm"
        >
          <img src="../../../assets/images/filtros.png" alt="Filtros" />
          Filtrar por
        </button>
        <button
          @click.prevent="deleteMultipleSelect"
          class="invisible py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl bg-main-red text-white"
          v-if="deleteList.length !== 0"
        >
          <!-- <img src="../../../assets/images/plus.png" alt="Agregar" /> -->
          Eliminar
        </button>
        <router-link
          :to="{ name: 'Administrador', params: { viewAdmin: 'create-event' } }"
          class="py-4 px-8 flex items-center gap-3 text-base font-bold rounded-2xl bg-main-green text-white"
        >
          <img src="../../../assets/images/plus.png" alt="Agregar" />
          Crear Evento
        </router-link>
      </div>
    </form>
  </article>
  <!-- Tabla -->
  <article>
    <div class="rounded-xl overflow-hidden shadow-lg mb-10">
      <header class="hidden xl:grid grid-cols-10 gap-5 table-head">
        <!-- @click.prevent="changeTableOrder('id')" -->
        <div class="col-span-2 flex items-center gap-5">
          <!-- <input
            :checked="deleteList.length !== 0"
            type="checkbox"
            class="w-5 h-5 mr-4"
            @change="deleteGroup(clientes, 'all')"
          /> -->
          <p class="">NOMBRE</p>
          <!-- <img
            src="../../../assets/images/arrow-down.png"
            :class="table.order_type === 'id' ? 'transform rotate-180' : ''"
            alt="down"
          /> -->
        </div>
        <!-- @click.prevent="changeTableOrder('name')" -->
        <p class="col-span-2 flex items-center gap-4">
          FECHA DE EVENTO
          <!-- <img
            src="../../../assets/images/arrow-down.png"
            :class="table.order_type === 'name' ? 'transform rotate-180' : ''"
            alt=""
          /> -->
        </p>
        <!-- @click.prevent="changeTableOrder('date')" -->
        <p class="col-span-2 flex items-center gap-4">
          LUGAR
          <!-- <img
            src="../../../assets/images/arrow-down.png"
            :class="table.order_type === 'date' ? 'transform rotate-180' : ''"
            alt=""
          /> -->
        </p>
        <!-- @click.prevent="changeTableOrder('direction')" -->
        <p class="col-span-2 flex items-center gap-4">OCULTAR</p>
        <p class="col-span-2 flex items-center gap-4">
          EDITAR
          <!-- <img src="../../../assets/images/arrow-down.png" alt="" /> -->
        </p>
      </header>
      <span v-for="data in eventos" :key="data">
        <div class="grid grid-cols-2 xl:grid-cols-10 gap-5 table-row">
          <div class="xl:col-span-2 xl:flex items-center gap-5">
            <!-- checked -->
            <!-- <input
              :checked="data.check"
              type="checkbox"
              @change="deleteGroup(data, 'one')"
              class="hidden xl:block w-5 h-5 mr-4"
            /> -->
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

          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-2">Ocultar</span>

            <label class="switch">
              <input
                type="checkbox"
                :value="data.status"
                :checked="data.status"
                @change="updateStatusEvent(data.id, data.status)"
              />
              <span class="slider round"></span>
            </label>
          </p>

          <p class="xl:col-span-2 xl:flex items-center gap-4">
            <span class="block xl:hidden text-text-blue mb-4">Editar</span>
            <router-link
              :to="{ name: 'Administrador', params: { viewAdmin: 'edit-event' } }"
              @click.prevent="sendDataEvent(data)"
              class="rounded-md px-6 py-4 bg-blue-500 text-white ring-2 ring-blue-500 hover:bg-white hover:text-blue-500 transition-colors"
            >
              Editar Evento
            </router-link>
          </p>

          <!-- 
          <button
            type="button"
            class="hidden xl:block pl-4 xl:col-span-2 flex items-center gap-4"
          >
            <img src="../../../assets/images/more_actions.png" alt="" />
          </button> -->
        </div>
      </span>
    </div>
    <div
      v-if="pagination.state === false"
      class="bg-gray-100 hidden xl:flex gap-1 items-center justify-end w-max ml-auto px-2 rounded-2xl"
    >
      <button class="h-8 w-8 rounded-full flex items-center justify-center">
        <img src="../../../assets/images/arrow-left.png" alt="Prev" /></button
      ><span v-for="data in pagination.links" :key="data">
        <button
          @click.prevent="getEvents(true, data.label)"
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
import { deleteService } from "../../../service/Delete/delete.service";
import { eventoService } from "../../../service/Evento/evento.service";
export default {
  data() {
    return {
      eventos: [],
      pagination: {
        state: false,
        links: [],
      },
      clave: "",
      deleteList: [],
      table: {
        order_type: "id",
      },
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
  },
  methods: {
    sendDataEvent(data) {
      this.$emit("dataEvent", data);
    },
    async updateStatusEvent(id, status) {
      var dataStatus = false;
      if (status === 1) {
        dataStatus = 0;
      } else if (status === 0) {
        dataStatus = 1;
      }
      var result = await eventoService.updateStatusEvent(id, dataStatus);
      if (result.success) {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Evento actualizado";
        this.getEvents();
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Error al actualizar";
      }
    },
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
          this.eventos.forEach((element) => (element.check = true));
          this.eventos.forEach((element) => this.deleteList.push(element.id));
        } else {
          this.deleteList = [];
          this.eventos.forEach((element) => (element.check = false));
        }
      }
    },
    async deleteMultipleSelect() {
      var opcion = confirm("Desea eliminar");
      if (opcion == true) {
        var result = await deleteService.deletemultiple(this.deleteList, "Evento");
        if (result.success) {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "success";
          this.$store.state.alert.text = "Eliminación con éxito";
          window.location.reload();
        } else {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = "Error al eliminar";
        }
      }
    },
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
    changeTableOrder(data) {
      this.table.order_type = data;
      this.getEvents();
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
      var result = await clientService.getEventAdmin(objPage);
      if (result.success) {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Listado de eventos";

        this.pagination.state = false;
        this.eventos = result.data.data;
        this.eventos.forEach((element) => (element.check = false));
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
<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
