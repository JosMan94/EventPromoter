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
          v-if="verify === 2"
          src="../../assets/images/error.png"
          alt="Check"
          class="mb-8 mx-auto"
        />
        <img
          v-if="verify === 1"
          src="../../assets/images/check-green.png"
          alt="Check"
          class="mb-8 mx-auto"
        />
        <h3
          class="text-main-red text-2xl font-bold text-center mb-14"
          v-if="verify === 2"
        >
          Cliente no registrado
        </h3>

        <h3
          class="text-text-blue text-2xl font-bold text-center mb-14"
          v-if="verify === 1"
        >
          Cliente registrado
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
import { verifyService } from "../../service/Verify/verify.service";
export default {
  data() {
    return {
      cliente: this.$route.params.codeClient,
      evento: this.$route.params.codeEvent,
      promotor: this.$route.params.codePromotor,
      verify: 0,
      status: false,
      pin: null,
    };
  },
  mounted() {},
  methods: {
    homeView() {
      // this.$router.push({ name: "Home" });
      window.close();
    },
    verifyPIN() {
      if (this.pin === "271237") {
        this.verifyTicket();
        this.pin = null;
      } else {
        alert("PIN incorrecto");
        this.pin = null;
      }
    },
    closeWindow() {
      window.close();
    },
    async verifyTicket() {
      this.status = true;
      var obj = new Object();
      obj.cliente = this.cliente;
      obj.evento = this.evento;
      if (this.statusPromotor) {
        obj.promotor = this.promotor;
      } else {
        obj.promotor = null;
      }
      var result = await verifyService.verifyTicket(obj);
      if (result.success) {
        this.verify = 1;
      } else {
        this.verify = 2;
      }
    },
  },
  computed: {
    statusPromotor() {
      return this.$route.params.codePromotor ? true : false;
    },
  },
};
</script>
