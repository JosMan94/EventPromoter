<template>
  <article class="xl:col-span-2 order-2 xl:order-1">
    <h2 class="font-bold text-xl xl:text-3xl mb-10 text-text-blue hidden xl:block">
      Editar Evento
    </h2>
    <form class="grid xl:grid-cols-2 gap-6">
      <div>
        <label for="name_event" class="block mb-2 text-text-blue font-bold text-sm"
          >Nombre del evento: <span class="text-red-600">(único)</span>
        </label>
        <input
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="name_event"
          placeholder="Ingresa evento"
          v-model="form.name"
        />
      </div>
      <div>
        <label for="fecha_event" class="block mb-2 text-text-blue font-bold text-sm"
          >Fecha del evento: <span class="text-red-600"></span
        ></label>
        <input
          type="date"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="fecha_event"
          placeholder="dd/mm/aaaa"
          v-model="form.fecha"
        />
      </div>
      <div>
        <label for="entradas" class="block mb-2 text-text-blue font-bold text-sm"
          >Cantidad de entradas: <span class="text-red-600"></span
        ></label>
        <input
          type="tel"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="entradas"
          placeholder="10,000"
          v-model="form.canditad"
        />
      </div>
      <div>
        <label for="aforo" class="block mb-2 text-text-blue font-bold text-sm"
          >Aforo permitido: <span class="text-red-600"></span
        ></label>
        <input
          type="tel"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="aforo"
          placeholder="2,000"
          v-model="form.aforo"
        />
      </div>
      <div class="xl:col-span-2 mb-5">
        <label for="direccion" class="block mb-2 text-text-blue font-bold text-sm"
          >Dirección: <span class="text-red-600"></span
        ></label>
        <input
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="direccion"
          placeholder="Ingresa dirección del evento"
          v-model="form.direction"
        />
      </div>

      <button
        @click.prevent="createEvent"
        type="submit"
        class="block mb-5 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
      >
        EDITAR EVENTO
      </button>
    </form>
  </article>

  <aside class="xl:col-span-1 relative order-1 xl:order-2">
    <h2 class="font-bold text-xl xl:text-3xl mb-10 text-text-blue xl:hidden">
      EDITAR EVENTO
    </h2>
    <label for="direccion" class="block mb-2 text-text-blue font-bold text-sm"
      >Foto del evento: <span class="text-red-600"></span
    ></label>
    <img
      :src="form.banner"
      alt="Event"
      class="block w-full object-cover"
      style="height: 480px"
    />
    <label
      for="image"
      style="top: 45%"
      class="cursor-pointer absolute left-8 right-8 flex items-center justify-center gap-3 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
    >
      <img src="../../../assets/images/icon-descargar.svg" alt="Descargar" />
      <span class="mt-1">foto evento</span>
    </label>
    <input
      type="file"
      name="image"
      id="image"
      ref="banner"
      @change="previewImage"
      class="hidden"
      accept="image/png,image/jpeg,image/jpg"
    />
  </aside>
</template>
<script>
import { eventoService } from "../../../service/Evento/evento.service";
export default {
  props: ["evento"],
  data() {
    return {
      newImage: "",
      nameEvent: "",
      form: {
        name: "",
        fecha: "",
        canditad: "",
        aforo: "",
        direction: "",
        banner: "",
      },
    };
  },
  mounted() {
    if (this.evento === null) {
      this.$router.push({
        name: "Administrador",
        params: {
          viewAdmin: "eventos",
        },
      });
    } else {
      this.form.name = this.evento.name;
      this.form.fecha = this.evento.date;
      this.form.canditad = this.evento.number_tickets;
      this.form.aforo = this.evento.capacity;
      this.form.direction = this.evento.direction;
      this.form.banner = this.evento.banner;
      this.newImage = this.evento.banner;
      this.nameEvent = this.evento.name;
    }
  },
  methods: {
    previewImage(e) {
      const file = e.target.files[0];
      this.cargarImagen(file);
    },
    cargarImagen(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.form.banner = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async createEvent() {
      var ojb = new Object();
      ojb.id = this.evento.id;
      if (this.nameEvent !== this.form.name) {
        ojb.name = this.form.name;
      }
      ojb.date = this.form.fecha;
      ojb.number_tickets = String(this.form.canditad);
      ojb.capacity = String(this.form.aforo);
      ojb.direction = this.form.direction;
      if (this.form.banner !== this.newImage) {
        ojb.banner = this.form.banner;
      }
      var result = await eventoService.updateEvent(ojb);
      if (result.success) {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Evento Actualizado";
        this.$router.push({ name: "Administrador", params: { viewAdmin: "eventos" } });
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Error al actualizar el evento";
      }
    },
  },
};
</script>
