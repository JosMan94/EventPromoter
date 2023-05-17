<template>
  <section class="u-container xl:grid xl:grid-cols-3 items-start justify-between gap-40">
    <article class="xl:col-span-2">
      <h2
        class="font-bold text-xl xl:text-3xl mb-5 text-text-blue"
        v-if="statusCodePromotor"
      >
        Promotor
      </h2>
      <div class="flex items-center gap-4 mb-10" v-if="statusCodePromotor">
        <img :src="promotor.avatar" alt="Usuario" />
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
            v-model="form.documento"
          />
        </div>
        <div>
          <label for="tel" class="block mb-2 text-text-blue font-bold text-sm"
            >Celular: <span class="text-red-600"> ( * )</span></label
          >
          <input
            class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
            id="tel"
            placeholder="Ingresa celular"
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
</template>

<script>
import { clientService } from "../../../service/Cliente/cliente.service";
export default {
  data() {
    return {
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
    };
  },
  mounted() {
    this.getDataEvents();
  },
  methods: {
    async getDataEvents() {
      var result = await clientService.getDetailEnvet(this.codeEvent, this.codePromotor);
      if (result.success) {
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
        alert("Error al mostrar detalle de los enveto");
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
        ojb.document = this.form.documento;
        ojb.cellphone = this.form.celular;
        ojb.name = this.form.name;
        ojb.date_of_brith = this.form.fecha;
        ojb.email = this.form.email;
        ojb.idEvent = this.form.idEvento;
        if (this.codePromotor !== null) {
          ojb.idPromotor = this.form.idPromotor;
        }

        var result = await clientService.registerEvent(ojb);

        if (result.success) {
          this.form.documento = "";
          this.form.celular = "";
          this.form.name = "";
          this.form.fecha = "";
          this.form.email = "";
          alert("Entrada enviada a su correo");
        } else {
          this.form.documento = "";
          this.form.celular = "";
          this.form.name = "";
          this.form.fecha = "";
          this.form.email = "";
          alert(JSON.stringify(result.data));
        }
      } else {
        alert("Rellernar todos los campos");
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
