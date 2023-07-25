<template>
  <article class="xl:col-span-2 order-2 xl:order-1">
    <h2 class="font-bold text-xl xl:text-3xl mb-10 text-text-blue block">
      Editar Cliente
    </h2>
    <form class="grid xl:grid-cols-2 gap-6">
      <div>
        <label for="name_event" class="block mb-2 text-text-blue font-bold text-sm"
          >Documento: <span class="text-red-600">(único)</span>
        </label>
        <input
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="name_event"
          placeholder="Ingrese el documento"
          v-model="form.document"
        />
      </div>

      <div>
        <label for="fecha_event" class="block mb-2 text-text-blue font-bold text-sm"
          >Fecha de cumpleaños: <span class="text-red-600"></span
        ></label>
        <input
          type="date"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="fecha_event"
          placeholder="dd/mm/aaaa"
          v-model="form.date_of_brith"
        />
      </div>

      <div>
        <label for="entradas" class="block mb-2 text-text-blue font-bold text-sm"
          >Celular: <span class="text-red-600"></span
        ></label>
        <input
          type="tel"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="entradas"
          placeholder="Ingrese el celular"
          v-model="form.cellphone"
        />
      </div>

      <div>
        <label for="aforo" class="block mb-2 text-text-blue font-bold text-sm"
          >Nombre: <span class="text-red-600"></span
        ></label>
        <input
          type="tel"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="aforo"
          placeholder="Ingrese el nombre"
          v-model="form.name"
        />
      </div>
      <div class="xl:col-span-2 mb-5">
        <label for="direccion" class="block mb-2 text-text-blue font-bold text-sm"
          >Email: <span class="text-red-600"></span
        ></label>
        <input
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="direccion"
          placeholder="Ingresa el email"
          v-model="form.email"
        />
      </div>

      <button
        @click.prevent="updateClient"
        type="submit"
        class="block mb-5 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
      >
        EDITAR CLIENTE
      </button>
    </form>
  </article>
</template>
<script>
import { clientService } from "../../../service/Cliente/cliente.service";
export default {
  props: ["cliente"],
  data() {
    return {
      form: {
        document: "",
        cellphone: "",
        name: "",
        date_of_brith: "",
        email: "",
      },
    };
  },
  mounted() {
    if (this.cliente === null) {
      this.$router.push({
        name: "Administrador",
        params: {
          viewAdmin: "clientes",
        },
      });
    } else {
      this.form.document = this.cliente.document;
      this.form.cellphone = this.cliente.cellphone;
      this.form.name = this.cliente.name;
      this.form.date_of_brith = this.cliente.date_of_brith;
      this.form.email = this.cliente.email;
      this.upDocument = this.cliente.document;
    }
  },
  methods: {
    async updateClient() {
      var ojb = new Object();
      ojb.id = this.cliente.id;
      if (this.upDocument !== this.form.document) {
        ojb.document = this.form.document;
      }
      ojb.cellphone = this.form.cellphone;
      ojb.name = this.form.name;
      ojb.date_of_brith = this.form.date_of_brith;
      ojb.email = this.form.email;

      var result = await clientService.updateClient(ojb);
      if (result.success) {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Cliente Actualizado";
        this.$router.push({ name: "Administrador", params: { viewAdmin: "clientes" } });
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Error al actualizar al cliente";
      }
    },
  },
};
</script>
