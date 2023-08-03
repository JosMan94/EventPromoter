<template>
  <span v-if="viewStatus === false">
    <section
      class="u-container xl:grid xl:grid-cols-3 items-start justify-between gap-40"
    >
      <article class="xl:col-span-2">
        <h2
          class="font-bold text-xl xl:text-3xl mb-5 text-text-blue"
          v-if="statusCodePromotor"
        >
          Promotor
        </h2>
        <div class="flex items-center gap-4 mb-10" v-if="statusCodePromotor">
          <img :src="promotor.avatar" alt="Usuario" class="w-20 h-20" />
          <div>
            <p class="text-sm font-medium">
              <span class="text-text-blue">{{ promotor.name }} </span>
              <span class="text-black">({{ promotor.alias }})</span>
            </p>
            <p class="text-sm">{{ promotor.email }}</p>
          </div>
        </div>

        <h2 class="font-bold text-xl xl:text-3xl mb-10 text-text-blue">
          Regístrate y gana tu entrada
        </h2>
        <form class="grid xl:grid-cols-2 gap-6">
          <div>
            <label for="document" class="block mb-2 text-text-blue font-bold text-sm"
              >Documento de identidad: <span class="text-red-600"> ( * )</span></label
            >
            <input
              class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
              id="document"
              placeholder="Ingresa documento"
              type="tel"
              v-model="form.documento"
            />
          </div>
          <div>
            <label for="tel" class="block mb-2 text-text-blue font-bold text-sm"
              >Celular: <span class="text-red-600"> ( * )</span></label
            >
            <input
              class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
              placeholder="Ingresa celular"
              type="number"
              v-model="form.celular"
            />
          </div>
          <div>
            <label for="nombres" class="block mb-2 text-text-blue font-bold text-sm"
              >Nombre y apellidos: <span class="text-red-600"> ( * )</span></label
            >
            <input
              class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
              id="nombres"
              placeholder="Ingresa nombres y apellidos"
              v-model="form.name"
            />
          </div>
          <div>
            <label for="nacimiento" class="block mb-2 text-text-blue font-bold text-sm"
              >Fecha de nacimiento: <span class="text-red-600"> ( * )</span></label
            >
            <input
              type="date"
              class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
              id="nacimiento"
              placeholder="dd/mm/aaaa"
              v-model="form.fecha"
            />
          </div>
          <div class="xl:col-span-2 mb-5">
            <label for="email" class="block mb-2 text-text-blue font-bold text-sm"
              >E-mail: <span class="text-red-600"> ( * )</span></label
            >
            <input
              class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
              id="email"
              placeholder="Ingresa correo electrónico"
              v-model="form.email"
              type="email"
            />
          </div>

          <button
            @click.prevent="registerEvent"
            type="submit"
            class="block mb-5 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
          >
            RECIBE TUS ENTRADAS
          </button>
        </form>
      </article>
      <aside class="hidden xl:block xl:col-span-1">
        <img :src="portada" alt="Foto de portada del evento" class="block w-full" />
      </aside>
    </section>
  </span>
  <span v-if="viewStatus">
    <section class="u-container">
      <h2 class="font-bold text-xl xl:text-3xl mb-5 xl:mb-10 text-text-blue">
        Ticket emitido
      </h2>
      <div class="xl:grid xl:grid-cols-2 items-start justify-between gap-40">
        <article>
          <div class="mb-10 mx-auto xl:mx-0">
            <qrcode-vue
              size="200"
              :value="
                'https://in.niiru.club/security/verify/entry/' +
                qrView.idClient +
                '/' +
                qrView.idEvent +
                '/' +
                qrView.idPromotor
              "
            ></qrcode-vue>
          </div>

          <h4 class="font-bold text-xl xl:text-3xl mb-10">
            <span class="text-text-blue">Tu código es: </span>
            <span class="text-black">{{ registro.ticket }}</span>
          </h4>
          <h4 class="font-bold text-xl xl:text-3xl mb-10">
            <span class="text-text-blue">Evento: </span>
            <span class="text-black">{{ registro.nameEvento }}</span>
          </h4>
          <h4 class="font-bold text-xl xl:text-3xl mb-10">
            <span class="text-text-blue">Fecha: </span>
            <span class="text-black">{{ registro.fecha }}</span>
          </h4>
          <h4 class="font-bold text-xl xl:text-3xl mb-10">
            <span class="text-text-blue">Dirección: </span>
            <span class="text-black">{{ registro.lugar }}</span>
          </h4>
          <h4 class="font-bold text-xl xl:text-3xl mb-10">
            <span class="text-text-blue">Dni: </span>
            <span class="text-black">{{ registro.dni }}</span>
          </h4>
          <h4 class="font-bold text-xl xl:text-3xl mb-10">
            <span class="text-text-blue">Email: </span>
            <span class="text-black">{{ registro.email }}</span>
          </h4>
        </article>
        <aside class="hidden xl:block">
          <img
            :src="registro.banner"
            alt="Event"
            class="block w-full object-contain"
            style="height: 480px"
          />
        </aside>
      </div>
    </section>
  </span>
</template>

<script>
import { clientService } from "../../../service/Cliente/cliente.service";
import QrcodeVue from "qrcode.vue";
export default {
  components: { QrcodeVue },
  data() {
    return {
      viewStatus: false,
      codeEvent: this.$route.params.code ?? null,
      codePromotor: this.$route.params.promotor ?? null,
      form: {
        documento: "",
        celular: "",
        name: "",
        fecha: "",
        email: "",
        idEvento: null,
        idPromotor: null,
      },
      portada: "",
      promotor: {
        name: "",
        alias: "",
        avatar: "",
        email: "",
      },
      qrView: {
        idClient: null,
        idEvent: null,
        idPromotor: null,
      },
      registro: {
        ticket: null,
        nameEvento: null,
        fecha: null,
        lugar: null,
        dni: null,
        email: null,
        banner: null,
      },
    };
  },
  mounted() {
    this.getDataEvents();
  },
  methods: {
    async getDataEvents() {
      var result = await clientService.getDetailEnvet(this.codeEvent, this.codePromotor);
      if (result.success) {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Datos del evento";
        if (this.codePromotor) {
          this.portada = result.data.event.banner;
          this.form.idEvento = result.data.event.id;
          this.form.idPromotor = result.data.promoter.id;

          this.promotor.name = result.data.promoter.name;
          this.promotor.alias = result.data.promoter.alias;
          this.promotor.avatar = result.data.promoter.avatar;
          this.promotor.email = result.data.promoter.email;
        } else {
          this.portada = result.data.event.banner;
          this.form.idEvento = result.data.event.id;
        }
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Error al mostrar detalle del evento";
      }
    },

    async registerEvent() {
      if (
        this.form.documento.length !== 0 &&
        this.form.celular.length !== 0 &&
        this.form.name.length !== 0 &&
        this.form.fecha.length !== 0 &&
        this.form.email.length !== 0 &&
        this.form.idEvento !== null
      ) {
        var ojb = new Object();
        ojb.document = String(this.form.documento);
        ojb.cellphone = String(this.form.celular);
        ojb.name = this.form.name;
        ojb.date_of_brith = this.form.fecha;
        ojb.email = this.form.email;
        ojb.idEvent = this.form.idEvento;
        if (this.codePromotor !== null) {
          ojb.idPromotor = this.form.idPromotor;
        }

        var result = await clientService.registerEvent(ojb);

        if (result.success) {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "success";
          this.$store.state.alert.text = "Entrada enviada a su correo";
          this.form.documento = "";
          this.form.celular = "";
          this.form.name = "";
          this.form.fecha = "";
          this.form.email = "";
          //-------------------

          this.qrView.idClient = result.data.idClient;
          this.qrView.idEvent = result.data.idEvent;
          this.qrView.idPromotor = result.data.idPromotor;

          this.registro.ticket = result.data.idTicket;
          this.registro.nameEvento = result.data.nameEvent;
          this.registro.fecha = result.data.fechaEvent;
          this.registro.lugar = result.data.lugarEvent;
          this.registro.dni = result.data.dni;
          this.registro.email = result.data.email;
          this.registro.banner = result.data.banner;

          //-------------------
          this.viewStatus = true;
        } else {
          this.form.documento = "";
          this.form.celular = "";
          this.form.name = "";
          this.form.fecha = "";
          this.form.email = "";
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = JSON.stringify(result.data);
        }
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Rellenar todos los campos";
      }
    },
  },
  computed: {
    statusCodePromotor() {
      if (this.$route.params.promotor) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
