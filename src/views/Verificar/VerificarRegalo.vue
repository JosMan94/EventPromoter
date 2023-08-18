<template>
  <header class="bg-black text-white">
    <div
      class="u-container py-5 flex items-center justify-center xl:justify-between relative"
    >
      <a href="#">
        <img
          src="../../assets/images/LOGO.png"
          alt="Logo"
          class="block h-6 w-auto xl:h-auto mx-auto"
        />
      </a>
    </div>
  </header>

  <main>
    <section class="flex justify-center min-h-screen bg-white py-20">
      <article
        class="pt-20 pb-10 px-10 xl:px-20 bg-white rounded-2xl relative"
        v-if="status"
      >
        <img
          v-if="verify === 1"
          src="../../assets/images/check-green.png"
          alt="Check"
          class="mb-8 mx-auto"
        />
        <img
          v-if="verify === 2"
          src="../../assets/images/bxs-error.png"
          alt="Check"
          class="mb-8 mx-auto"
        />
        <img
          v-if="verify === 3"
          src="../../assets/images/error.png"
          alt="Check"
          class="mb-8 mx-auto"
        />

        <h3
          class="text-text-blue text-2xl font-bold text-center mb-14"
          v-if="verify === 1 || verify === 2"
        >
          {{ typeVerify }}
          <span v-if="verify === 1">
            <br />
            {{ datosRegalo.description }} - {{ datosRegalo.amount }} <br />

            <ul>
              <li>{{ promotorData.dni }}</li>
              <li>{{ promotorData.name }}</li>
            </ul>
          </span>
          <br />
        </h3>
        <h3
          class="text-main-red text-2xl font-bold text-center mb-14"
          v-if="verify === 3"
        >
          {{ typeVerify }}
        </h3>

        <button
          type="button"
          @click.prevent="homeView"
          class="block mx-auto py-4 px-12 xl:px-16 rounded-xl bg-main-green text-white font-bold"
        >
          ESCANEAR OTRO QR
        </button>
      </article>
      <div class="w-full max-w-xs" v-else>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Ingresar el PIN
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              v-model="pin"
              placeholder="******************"
            />
          </div>
          <button
            @click.prevent="verifyPIN"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Verificar
          </button>
        </form>
      </div>
    </section>
  </main>
  <footer class="bg-main-blue-black text-white text-center">
    <div class="u-container py-16">
      <img
        class="mx-auto mb-4 xl:mb-6 h-6 w-auto xl:h-auto"
        src="../../assets/images/LOGO.png"
        alt="Logo"
        style="width: 300px"
      />
      <p class="text-sm xl:text-lg mb-8 xl:mb-16">
        Carretera Industrial Km 560 La Encalada del Golf
      </p>
      <div class="flex items-center justify-center gap-4 xl:gap-6">
        <!-- <a href="#">
          <img src="../../assets/images/fb-white.png" alt="Facebook" />
        </a> -->
        <a href="https://www.instagram.com/euphoriaclubpe/" target="_Blank">
          <img src="../../assets/images/ig-white.png" alt="Instagram" />
        </a>
      </div>
    </div>
  </footer>
</template>
<script>
import { regaloService } from "../../service/Regalo/regalo.service";
export default {
  data() {
    return {
      regalo: this.$route.params.codeRegalo,
      promotor: this.$route.params.codePromotor,
      verify: null,
      status: false,
      typeVerify: null,
      pin: "",
      datosRegalo: null,
      promotorData: {
        dni: null,
        name: null,
      },
    };
  },
  mounted() {},
  methods: {
    homeView() {
      window.close();
    },
    verifyPIN() {
      if (this.pin.length !== 0) {
        this.verifyRegalo();
      }
    },
    async verifyRegalo() {
      this.status = true;
      var obj = new Object();
      obj.id_regalo = this.regalo;
      obj.cod_user = this.promotor;
      obj.pin = this.pin;

      var result = await regaloService.verifyRegalo(obj);

      if (result.success) {
        if (result.message === 1) {
          this.typeVerify = "El promotor ya reclamó este regalo";
          this.verify = 2;
        } else if (result.message === 2) {
          this.typeVerify = "El promotor puede reclamar este regalo";
          this.verify = 1;
          this.promotorData.dni = result.promotor.document;
          this.promotorData.name = result.promotor.name;
        }
        this.datosRegalo = result.data;
      } else {
        this.verify = 3;
        this.typeVerify = "Error";
      }
    },
  },
};
</script>
