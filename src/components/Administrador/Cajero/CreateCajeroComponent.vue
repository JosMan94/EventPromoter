<template>
  <article class="xl:col-span-2 order-2 xl:order-1">
    <h2 class="font-bold text-xl xl:text-3xl mb-10 text-text-blue hidden xl:block">
      Crear nuevo cajero
    </h2>
    <form class="grid xl:grid-cols-2 gap-6">
      <div>
        <label for="document" class="block mb-2 text-text-blue font-bold text-sm"
          >Documento de identidad: <span class="text-red-600"> ( * ) (único)</span></label
        >
        <input
          type="tel"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="document"
          placeholder="Ingresa documento"
          v-model="form.documento"
        />
      </div>
      <div>
        <label for="tel" class="block mb-2 text-text-blue font-bold text-sm"
          >Celular: <span class="text-red-600"> ( * ) (único)</span></label
        >
        <input
          type="number"
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
          v-model="form.nombre"
        />
      </div>
      <div>
        <label for="alias" class="block mb-2 text-text-blue font-bold text-sm"
          >Alias: <span class="text-red-600"> ( * ) (único)</span></label
        >
        <input
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="alias"
          placeholder="Ingresa un alias"
          v-model="form.alias"
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
      <div>
        <label for="email" class="block mb-2 text-text-blue font-bold text-sm"
          >E-mail: <span class="text-red-600"> ( * ) (único)</span></label
        >
        <input
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="email"
          placeholder="Ingresa correo electrónico"
          v-model="form.email"
        />
      </div>

      <div>
        <label for="email" class="block mb-2 text-text-blue font-bold text-sm"
          >PIN para scanner: <span class="text-red-600">( * ) (único)</span></label
        >
        <input
          type="text"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          id="pin"
          placeholder="Ingrese el pin,mayor de 3 dígitos"
          v-model="form.pin"
        />
      </div>

      <div>
        <label for="email" class="block mb-2 text-text-blue font-bold text-sm"
          >Regalo por evento:
        </label>
        <label class="switch">
          <input type="checkbox" v-model="form.regalo_type_1" />
          <span class="slider round"></span>
        </label>
      </div>
      <div>
        <label for="email" class="block mb-2 text-text-blue font-bold text-sm"
          >Regalo personalizado:
        </label>
        <label class="switch">
          <input type="checkbox" v-model="form.regalo_type_2" />
          <span class="slider round"></span>
        </label>
      </div>
      <div>
        <label for="email" class="block mb-2 text-text-blue font-bold text-sm"
          >Ticket:
        </label>
        <label class="switch">
          <input type="checkbox" v-model="form.entrada_ticket" />
          <span class="slider round"></span>
        </label>
      </div>
    </form>
    <button
      type="submit"
      @click.prevent="createUser"
      class="block mt-5 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
    >
      CREAR CAJERO
    </button>
  </article>
  <aside class="xl:col-span-1 relative order-1 xl:order-2">
    <h2 class="font-bold text-xl xl:text-3xl mb-10 text-text-blue xl:hidden">
      Crear nuevo cajero
    </h2>
    <label for="nacimiento" class="block mb-2 text-text-blue font-bold text-sm"
      >Avatar: <span class="text-red-600"> ( * )</span></label
    >
    <img
      :src="form.avatar.length === 0 ? imgDefault : form.avatar"
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
      <span class="mt-1">Agregar foto de perfil</span>
    </label>
    <input
      type="file"
      name="image"
      id="image"
      ref="avatar"
      @change="previewImage"
      class="hidden"
      accept="image/png,image/jpeg,image/jpg"
    />
  </aside>
</template>
<script>
import { promotorService } from "../../../service/Promotor/promotor.service";
import imgDefault from "../../../assets/images/event-preview.png";
export default {
  data() {
    return {
      imgDefault: imgDefault,
      form: {
        documento: "",
        celular: "",
        nombre: "",
        alias: "",
        fecha: "",
        email: "",
        avatar: "",
        pin: "",
        regalo_type_1: false,
        regalo_type_2: false,
        entrada_ticket: false,
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
        this.form.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async createUser() {
      if (
        this.form.documento.length !== 0 &&
        this.form.celular.length !== 0 &&
        this.form.nombre.length !== 0 &&
        this.form.alias.length !== 0 &&
        this.form.fecha.length !== 0 &&
        this.form.email.length !== 0 &&
        this.form.avatar.length !== 0 &&
        this.form.pin.length !== 0
      ) {
        var ojb = new Object();
        ojb.document = String(this.form.documento);
        ojb.cellphone = String(this.form.celular);
        ojb.name = this.form.nombre;
        ojb.alias = this.form.alias;
        ojb.date_of_birth = this.form.fecha;
        ojb.email = this.form.email;
        ojb.avatar = this.form.avatar;
        ojb.type = "cajero";
        ojb.pin = this.form.pin;
        ojb.regalo_type_1 = this.form.regalo_type_1;
        ojb.regalo_type_2 = this.form.regalo_type_2;
        ojb.entrada_ticket = this.form.entrada_ticket;
        var result = await promotorService.createPromotor(ojb);
        if (result.success) {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "success";
          this.$store.state.alert.text = "Cajero creado";

          this.$refs.avatar.value = null;
          this.form.documento = "";
          this.form.celular = "";
          this.form.nombre = "";
          this.form.alias = "";
          this.form.fecha = "";
          this.form.email = "";
          this.form.avatar = "";
          this.$router.push({
            name: "Administrador",
            params: { viewAdmin: "cajeros" },
          });
        } else {
          this.$refs.avatar.value = null;
          this.form.documento = "";
          this.form.celular = "";
          this.form.nombre = "";
          this.form.alias = "";
          this.form.fecha = "";
          this.form.email = "";
          this.form.avatar = "";

          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = JSON.stringify(result.data);
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
