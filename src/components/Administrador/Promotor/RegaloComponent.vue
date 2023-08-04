<template>
  <article class="xl:col-span-2 order-2 xl:order-1">
    <h2 class="font-bold text-xl xl:text-3xl mb-4 text-text-blue xl:block">
      Regalo para "{{ name }}"
    </h2>
    <form class="grid xl:grid-cols-2 gap-6">
      <div>
        <label for="document" class="block mb-2 text-text-blue font-bold text-sm"
          >Título: <span class="text-red-600"> ( * ) </span></label
        >
        <input
          type="text"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="document"
          placeholder="Ingresar el título"
          v-model="form.title"
        />
      </div>
      <div>
        <label for="tel" class="block mb-2 text-text-blue font-bold text-sm"
          >Descripción: <span class="text-red-600"> ( * )</span></label
        >
        <input
          type="text"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="tel"
          placeholder="Ingresar una descipción"
          v-model="form.description"
        />
      </div>
      <div>
        <label for="nombres" class="block mb-2 text-text-blue font-bold text-sm"
          >Cantidad: <span class="text-red-600"> ( * ) </span></label
        >
        <input
          type="number"
          class="cursor-not-allowed w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="nombres"
          placeholder="Ingresar la cantidad"
          v-model="form.amount"
          disabled
        />
      </div>
      <div>
        <button
          type="submit"
          @click.prevent="createRegaloForUser"
          class="block mt-5 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
        >
          CREAR REGALO
        </button>
      </div>
    </form>

   
    <article class="mt-8">
      <h2 class="font-bold text-xl xl:text-3xl mb-5 xl:mb-10 text-text-blue">
        Regalos realizados
      </h2>
    </article>
   
    <article>
      <div class="rounded-xl overflow-hidden shadow-lg mb-10">
        <header class="hidden xl:grid grid-cols-9 gap-5 table-head">
          <div class="col-span-3 flex items-center gap-5">
            <p class="">TÍTULO</p>
          </div>
          <p class="col-span-2 flex items-center gap-4">DESCRIPCIÓN</p>
          <p class="col-span-2 flex items-center gap-4">CANTIDAD</p>
          <p class="col-span-2 flex items-center gap-4">STATUS</p>
        </header>

        <span v-for="data in regalos" :key="data">
          <div class="grid grid-cols-2 xl:grid-cols-9 gap-5 table-row">
            <div class="xl:col-span-3 xl:flex items-center gap-5">
              <p class="">
                <span class="block xl:hidden text-text-blue mb-2">TÍTULO:</span>
                {{ data.title }}
              </p>
            </div>
            <p class="xl:col-span-2 xl:flex items-center gap-4">
              <span class="block xl:hidden text-text-blue mb-2">DESCRIPCIÓN:</span>
              {{ data.description }}
            </p>
            <p class="xl:col-span-2 xl:flex items-center gap-4">
              <span class="block xl:hidden text-text-blue mb-2">CANTIDAD:</span>
              {{ data.amount }}
            </p>
            <p class="xl:col-span-2 xl:flex items-center gap-4">
              <span class="block xl:hidden text-text-blue mb-2">STATUS:</span>
              {{ data.status === 0 ? "SIN RECLAMAR" : "RECLAMADO" }}
            </p>
          </div>
        </span>
      </div>
    </article>

  </article>
</template>
<script>
import { regaloService } from "../../../service/Regalo/regalo.service";
export default {
  props: ["promotor"],
  data() {
    return {
      name: "",
      regalos: [],
      form: {
        user_id: null,
        title: "",
        description: "",
        amount: 1,
        type: "promotor",
      },
    };
  },
  mounted() {
    if (this.promotor === null) {
      this.$router.push({
        name: "Administrador",
        params: {
          viewAdmin: "promotores",
        },
      });
    } else {
      this.name = this.promotor.name;
      this.form.user_id = this.promotor.id;
      this.regalos = this.promotor.regalos_user;
    }
  },
  methods: {
    async createRegaloForUser() {
      if (
        this.form.title.length !== 0 &&
        this.form.description.length !== 0 &&
        this.form.amount.length !== 0 &&
        this.form.user_id !== null
      ) {
        var ojb = new Object();
        ojb.user_id = this.form.user_id;
        ojb.title = this.form.title;
        ojb.description = this.form.description;
        ojb.amount = this.form.amount;
        ojb.type = this.form.type;

        var result = await regaloService.createRegaloForUser(ojb);
        if (result.success) {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "success";
          this.$store.state.alert.text = "Regalo creado";

          this.form.user_id = null;
          this.form.title = "";
          this.form.description = "";
          this.form.amount = 1;
          this.form.type = "promotor";
          this.$router.push({
            name: "Administrador",
            params: { viewAdmin: "promotores" },
          });
        } else {
          this.form.user_id = null;
          this.form.title = "";
          this.form.description = "";
          this.form.amount = 1;
          this.form.type = "promotor";

          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = "Error al crear el regalo";
        }
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Ingresar todos los datos";
      }
    },
  },
};
</script>
