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
          type="number"
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
          type="number"
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
      <div>
        <label for="fecha_event" class="block mb-2 text-text-blue font-bold text-sm"
          >Obtener Enlace: <span class="text-red-600"> ( * )</span></label
        >
        <GMapAutocomplete
          placeholder="Buscar y seleccionar para mayor presición"
          @place_changed="setPlace"
          class="p-6 input w-full text-sm xl:text-base bg-gray-100 bg-opacity-50 focus:border-blue-400 shadow-sm rounded-2xl"
        >
        </GMapAutocomplete>
      </div>
      <div>
        <label for="fecha_event" class="block mb-2 text-text-blue font-bold text-sm"
          >Enlace de la dirección: <span class="text-red-600"> ( * )</span></label
        >
        <a
          :href="form.enlace"
          target="_blank"
          :class="
            form.enlace === null
              ? 'cursor-not-allowed bg-gray-500'
              : 'bg-purple-500 cursor-pointer'
          "
          class="block mb-5 text-base font-bold text-white rounded-2xl p-5 text-center"
        >
          PROBAR ENLACE
        </a>
      </div>
      <div class="xl:col-span-2 mb-5">
        <GMapMap
          ref="myMapRef"
          :center="center"
          :zoom="15"
          map-type-id="terrain"
          class="w-full h-80"
        >
          <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="openMarker(m.id)"
            @dragend="handleMarkerDragend"
          >
            <GMapInfoWindow
              :closeclick="true"
              @closeclick="openMarker(null)"
              :opened="openedMarkerID === m.id"
              :options="{
                pixelOffset: {
                  width: 10,
                  height: 0,
                },
                maxWidth: 320,
                maxHeight: 320,
              }"
            >
              <div>Dirección del evento: "{{ m.nameDirection }}"</div>
            </GMapInfoWindow>
          </GMapMarker>
        </GMapMap>
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
      openedMarkerID: null,
      center: { lat: null, lng: null },
      markers: [
        {
          id: 1,
          position: {
            lat: null,
            lng: null,
          },
          nameDirection: "",
        },
      ],
      newImage: "",
      nameEvent: "",
      form: {
        name: "",
        fecha: "",
        canditad: "",
        aforo: "",
        direction: "",
        banner: "",
        enlace: null,
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
      this.form.enlace = this.evento.enlace_direction;
      this.newImage = this.evento.banner;
      this.nameEvent = this.evento.name;
      // obtener latitud y longitud
      var enlace = this.evento.enlace_direction;
      var separar1 = enlace.split("?q=");
      var separar2 = separar1[1].split(",");
      this.center.lat = parseFloat(separar2[0]);
      this.center.lng = parseFloat(separar2[1]);

      this.markers[0].position.lat = parseFloat(separar2[0]);
      this.markers[0].position.lng = parseFloat(separar2[1]);
    }
  },
  methods: {
    handleMarkerDragend(event) {
      this.center.lat = event.latLng.lat();
      this.center.lng = event.latLng.lng();

      this.markers[0].position.lat = event.latLng.lat();
      this.markers[0].position.lng = event.latLng.lng();
      this.form.enlace =
        "https://www.google.com/maps?q=" + event.latLng.lat() + "," + event.latLng.lng();
    },
    setPlace(place) {
      this.center.lat = place.geometry.location.lat();
      this.center.lng = place.geometry.location.lng();

      this.markers[0].position.lat = place.geometry.location.lat();
      this.markers[0].position.lng = place.geometry.location.lng();
      this.form.enlace =
        "https://www.google.com/maps?q=" +
        place.geometry.location.lat() +
        "," +
        place.geometry.location.lng();
      // this.form.enlace = place.url;
    },
    openMarker(id) {
      this.openedMarkerID = id;
    },
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
      ojb.enlace_direction = this.form.enlace;
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
  watch: {
    "form.name": function (val) {
      this.markers[0].nameDirection = val;
    },
  },
};
</script>
