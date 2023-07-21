<template>
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
      </center>
    </div>
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
</template>

<script>
import { regaloService } from "../../../service/Regalo/regalo.service";
import QrcodeVue from "qrcode.vue";
export default {
  components: { QrcodeVue },
  data() {
    return {
      regalos: [],
      pagination: {
        state: false,
        links: [],
      },
      table: {
        order_type: "id",
      },
      codePromotor: null,
    };
  },
  mounted() {
    this.getRegalos();
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
};
</script>
