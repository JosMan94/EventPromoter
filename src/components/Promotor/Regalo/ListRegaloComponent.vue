<template>
  <label>REGALOS POR EVENTO</label>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div class="p-4" v-for="data in regalos" :key="data">
      <center>
        <qrcode-vue
          size="200"
          :value="
            'https://in.niiru.club/verify/security/regalo/promotor/' +
            data.id +
            '/' +
            codePromotor
          "
        ></qrcode-vue>
        <p class="">{{ data.title }}</p>
        <p class="">{{ data.description }}</p>
        <p class="">{{ data.amount }}</p>
      </center>
    </div>
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
  <div
    v-if="pagination.state === false"
    class="mt-12 flex xl:hidden justify-end items-center gap-12"
  >
    <p>
      Pág.
      <span class="mx-3 py-1 px-3 ring ring-blue-300">{{ dataTable.from }}</span> de
      {{ dataTable.page }}
    </p>
    <div class="flex items-center gap-4">
      <figure
        v-if="dataTable.pastStatus"
        @click.prevent="getRegalos(true, pagePast)"
        class="cursor-pointer p-3"
      >
        <img src="../../../assets/images/arrow-left.png" alt="Prev" />
      </figure>
      <figure
        v-if="dataTable.nextStatus"
        @click.prevent="getRegalos(true, pageNext)"
        class="cursor-pointer p-3"
      >
        <img src="../../../assets/images/arrow-right.png" alt="Next" />
      </figure>
    </div>
  </div>
  <label>REGALOS</label>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div class="p-4" v-for="data in regalosPromotor" :key="data">
      <center>
        <qrcode-vue
          size="200"
          :value="
            'https://in.niiru.club/verify/security/regalo/promotor/perzonalizado/' +
            data.id +
            '/' +
            codePromotor
          "
        ></qrcode-vue>
        <p class="">{{ data.title }}</p>
        <p class="">{{ data.description }}</p>
        <p class="">{{ data.amount }}</p>
      </center>
    </div>
  </div>
</template>
<script>
import { regaloService } from "../../../service/Regalo/regalo.service";
import QrcodeVue from "qrcode.vue";
export default {
  components: { QrcodeVue },
  data() {
    return {
      regalos: [],
      regalosPromotor: [],
      pagination: {
        state: false,
        links: [],
      },
      table: {
        order_type: "id",
      },
      codePromotor: null,
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
    this.getRegalos();
    var codeUser = this.$cookies.get("code");
    if (codeUser) {
      this.codePromotor = codeUser;
      this.getRegalosForPromotor();
    } else {
      this.$store.state.alert.status = true;
      this.$store.state.alert.type = "error";
      this.$store.state.alert.text = "Vuelva a iniciar sesión";
      window.location.reload();
    }
  },
  methods: {
    async getRegalosForPromotor() {
      if (this.codePromotor) {
        var objPage = new Object();
        objPage.code_user = this.codePromotor;
        var result = await regaloService.getRegaloForPromotor(objPage);

        if (result.success) {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "success";
          this.$store.state.alert.text = "Listado de regalos";
          this.regalosPromotor = result.data;
        } else {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = "Error al mostrar regalos";
        }
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Vuelva a iniciar sesión";
        window.location.reload();
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
      objPage.typeUser = "promotor";
      var result = await regaloService.getRegalo(objPage);
      if (result.success) {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Listado de regalos";

        this.pagination.state = true;
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
        this.$store.state.alert.text = "Error al mostrar regalos";
      }
    },
  },
};
</script>
