<template>
  <h2 class="font-bold text-xl xl:text-3xl mb-5 xl:mb-10 text-text-blue">
    Tickets emitidos
  </h2>
  <div class="xl:grid xl:grid-cols-2 items-start justify-between gap-40">
    <article>
      <div  class="mb-10 mx-auto xl:mx-0">
        <qrcode-vue
          size="200"
          :value="
            'http://promotores.s3-website.us-east-2.amazonaws.com/security/verify/entry/' +
            qrView.idClient +
            '/' +
            qrView.idEvent +
            '/' +
            qrView.idPromotor
          "
        ></qrcode-vue>
      </div>

      <h3 class="font-bold text-xl xl:text-3xl mb-10">
        <span class="text-text-blue">Tu código es: </span>
        <span class="text-black">{{ ticket }}</span>
      </h3>
      <form @submit.prevent="petitionEmail" class="grid">
        <label for="email" class="block mb-2 text-text-blue font-bold text-sm"
          >E-mail:</label
        >
        <div class="relative mb-10">
          <input
            class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
            type="email"
            id="email"
            placeholder="Ingresa correo electrónico"
            v-model="email"
            required
          />
          <label for="email" class="absolute top-4 right-5 cursor-pointer">
            <img src="../../../assets/images/icon-lapiz.svg" alt="Editar" />
          </label>
        </div>
        <button
          type="submit"
          class="block mb-5 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
        >
          ENVIAR A TU CORREO
        </button>
        <button
        onclick="window.print()"
          type="button"
          class="flex items-center justify-center gap-3 bg-main-blue-black text-base font-bold text-white rounded-2xl p-5 text-center"
        >
          <img src="../../../assets/images/icon-descargar.svg" alt="Descargar" />
          <span class="mt-1">DESCARGAR</span>
        </button>
      </form>
    </article>
    <aside class="hidden xl:block">
      <img :src="banner" alt="Event" />
    </aside>
  </div>
</template>
<script>
import { ticketService } from "../../../service/Ticket/ticket.service";
import QrcodeVue from "qrcode.vue";

export default {
  components: { QrcodeVue },
  props: ["idTicket"],
  data() {
    return {
      email: null,
      ticket: null,
      banner: null,
      qrView: {
        idClient: null,
        idEvent: null,
        idPromotor: null,
      },
    };
  },
  mounted() {
    this.getDetailTicket();
  },
  methods: {
   
    async petitionEmail() {
      var objPage = new Object();
      objPage.idTicket = this.idTicket;
      objPage.email = this.email;
      var result = await ticketService.reenviarTicket(objPage);
      if (result.success) {
        alert("Email Reenviado");
      } else {
        alert("Error al reenviar el correo");
      }
    },
    async getDetailTicket() {
      var objPage = new Object();
      objPage.idTicket = this.idTicket;
      objPage.typeUser = length;
      var result = await ticketService.detailTIcket(objPage);
      if (result.success) {
        console.log(result);
        this.email = result.data.email;
        this.ticket = result.data.idTicket;
        this.banner = result.data.banner;

        this.qrView.idClient = result.data.idClient;
        this.qrView.idEvent = result.data.idEvent;
        this.qrView.idPromotor = result.data.idPromotor;
      }
    },
  },
};
</script>
