<template>
  <article class="xl:col-span-2 order-2 xl:order-1">
    <h2 class="font-bold text-xl xl:text-3xl mb-10 text-text-blue hidden xl:block">
      Crear nuevo evento
    </h2>
    <form class="grid xl:grid-cols-2 gap-6">
      <div>
        <label for="name_event" class="block mb-2 text-text-blue font-bold text-sm"
          >Nombre del evento: <span class="text-red-600"> ( * ) (único)</span>
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
          >Fecha del evento: <span class="text-red-600"> ( * )</span></label
        >
        <input
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="fecha_event"
          placeholder="dd/mm/aaaa"
          v-model="form.fecha"
        />
      </div>
      <div>
        <label for="entradas" class="block mb-2 text-text-blue font-bold text-sm"
          >Cantidad de entradas: <span class="text-red-600"> ( * )</span></label
        >
        <input
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="entradas"
          placeholder="10,000"
          v-model="form.canditad"
        />
      </div>
      <div>
        <label for="aforo" class="block mb-2 text-text-blue font-bold text-sm"
          >Aforo permitido: <span class="text-red-600"> ( * )</span></label
        >
        <input
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="aforo"
          placeholder="2,000"
          v-model="form.aforo"
        />
      </div>
      <div class="xl:col-span-2 mb-5">
        <label for="direccion" class="block mb-2 text-text-blue font-bold text-sm"
          >Dirección: <span class="text-red-600"> ( * )</span></label
        >
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
        CREAR EVENTO
      </button>
    </form>
  </article>

  <aside class="xl:col-span-1 relative order-1 xl:order-2">
    <h2 class="font-bold text-xl xl:text-3xl mb-10 text-text-blue xl:hidden">
      Crear nuevo evento
    </h2>
    <label for="direccion" class="block mb-2 text-text-blue font-bold text-sm"
      >Foto del evento: <span class="text-red-600"> ( * )</span></label
    >
    <img
      :src="form.banner.length === 0 ? imgDefault : form.banner"
      alt="Event"
      class="block w-full"
    />
    <label
      for="image"
      style="top: 45%"
      class="cursor-pointer absolute left-8 right-8 flex items-center justify-center gap-3 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
    >
      <img src="../../../assets/images/icon-descargar.svg" alt="Descargar" />
      <span class="mt-1">Agregar foto evento</span>
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
import imgDefault from "../../../assets/images/event-preview.png";
export default {
  data() {
    return {
      imgDefault: imgDefault,
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
      if (
        this.form.name.length !== 0 &&
        this.form.fecha.length !== 0 &&
        this.form.canditad.length !== 0 &&
        this.form.aforo.length !== 0 &&
        this.form.direction.length !== 0 &&
        this.form.banner.length !== 0
      ) {
        var ojb = new Object();
        ojb.name = this.form.name;
        ojb.date = this.form.fecha;
        ojb.number_tickets = this.form.canditad;
        ojb.capacity = this.form.aforo;
        ojb.direction = this.form.direction;
        ojb.banner = this.form.banner;
        var result = await eventoService.createEvent(ojb);
       
        if (result.success) {
          this.$refs.banner.value = null;
          this.form.name = "";
          this.form.fecha = "";
          this.form.canditad = "";
          this.form.aforo = "";
          this.form.direction = "";
          this.form.banner = "";
          this.$router.push({ name: "Administrador", params: { viewAdmin: "eventos" } });
        } else {
          this.$refs.banner.value = null;
          this.form.name = "";
          this.form.fecha = "";
          this.form.canditad = "";
          this.form.aforo = "";
          this.form.direction = "";
          this.form.banner = "";
          alert(JSON.stringify(result.data));
        }
      } else {
        alert("Revisar datos ha enviar");
      }
    },
  },
};
</script>
