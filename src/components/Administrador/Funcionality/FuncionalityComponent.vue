<template>
  <article class="xl:col-span-2 order-2 xl:order-1">
    <h2 class="font-bold text-xl xl:text-3xl mb-4 text-text-blue xl:block">SMS MASIVO</h2>
    <form class="grid xl:grid-cols-1 gap-6">
      <div>
        <label for="document" class="block mb-2 text-text-blue font-bold text-sm"
          >Confirmar el envío de SMS: <span class="text-red-600"> ( * ) </span></label
        >

        <label class="switch">
          <input type="checkbox" v-model="form.status" />
          <span class="slider round"></span>
        </label>
      </div>

      <div>
        <label for="nombres" class="block mb-2 text-text-blue font-bold text-sm"
          >Mensaje: <span class="text-red-600"> ( * ) </span></label
        >

        <textarea
          type="text"
          class="w-full py-4 px-5 pr-12 rounded-2xl bg-gray-100 text-black text-base focus:outline-none focus:ring focus:ring-text-blue transition-colors"
          placeholder="Ingresar el mensaje"
          v-model="form.mensaje"
        ></textarea>
      </div>
    </form>
    <button
      v-if="form.status"
      type="submit"
      @click.prevent="enviarSms"
      class="block mt-5 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
    >
      ENVIAR
    </button>

    <h2 class="font-bold text-xl xl:text-3xl mb-4 mt-4 text-text-blue xl:block">
      EMAIL MASIVO
    </h2>
    <form class="grid xl:grid-cols-1 gap-6">
      <div>
        <label for="document" class="block mb-2 text-text-blue font-bold text-sm"
          >Confirmar el envío de EMAIL: <span class="text-red-600"> ( * ) </span></label
        >

        <label class="switch">
          <input type="checkbox" v-model="formEmail.status" />
          <span class="slider round"></span>
        </label>
      </div>

      <div>
        <label for="nombres" class="block mb-2 text-text-blue font-bold text-sm"
          >Mensaje: <span class="text-red-600"> ( * ) </span></label
        >

        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
      </div>
    </form>
    <button
      v-if="formEmail.status"
      type="submit"
      @click.prevent="enviarEmail"
      class="block mt-5 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
    >
      ENVIAR
    </button>

    <h2 class="font-bold text-xl xl:text-3xl mb-4 mt-4 text-text-blue xl:block">
      ENVIAR TICKETS
    </h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <button
        v-for="eventos in events"
        :key="eventos"
        :class="eventos.status === 1 ? 'cursor-pointer' : 'cursor-not-allowed'"
        :disabled="eventos.status === 0"
        @click.prevent="eventos.status === 1 ? sendTickets(eventos) : ''"
        class="font-semibold text-center border border-black w-full h-full px-2 hover:bg-black hover:text-white transition duration-500 ease-in-out"
      >
        {{ eventos.name }}
      </button>
    </div>
  </article>
</template>
<script>
import { funcionalityService } from "../../../service/Funcionality/funcionality.service";
import { clientService } from "../../../service/Cliente/cliente.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data() {
    return {
      // SMS
      form: {
        status: false,
        mensaje: "",
      },
      // EMAIL
      formEmail: {
        status: false,
      },
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the editor.
      },
      //tickets
      events: [],
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async sendTickets(data) {
      var opcion = confirm("Desea enviar tickets del evento: " + data.name + " ?");
      if (opcion) {
        var result = await funcionalityService.ticketMasivo(data.id);
        if (result.success) {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "success";
          this.$store.state.alert.text = "Ticket masivo enviado";
        } else {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = "Error al enviar los Ticket";
        }
      }
    },
    async getEvents() {
      var objPage = new Object();
      objPage.order_type = "id";
      var result = await clientService.getEventAdmin(objPage);
      if (result.success) {
        this.events = result.data.data;
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "success";
        this.$store.state.alert.text = "Lista de envetos";
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text = "Error al mostrar los eventos";
      }
    },
    async enviarSms() {
      if (this.form.status && this.form.mensaje.length > 10) {
        var result = await funcionalityService.smsMasivo(this.form.mensaje);
        if (result.success) {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "success";
          this.$store.state.alert.text =
            "SMS masivo enviado ,revisar su proveedor de servicio";
          this.form.status = false;
          this.form.mensaje = "";
        } else {
          this.form.status = false;
          this.form.mensaje = "";
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = "Error al enviar los SMS";
        }
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text =
          "Recuerde confirmar el envío y el mensaje debe contener más de 10 caractéres";
      }
    },
    async enviarEmail() {
      if (this.formEmail.status && this.editorData.length > 10) {
        var result = await funcionalityService.emailMasivo(this.editorData);
        if (result.success) {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "success";
          this.$store.state.alert.text = "Email masivo enviado";
          this.formEmail.status = false;
          this.editorData = "";
        } else {
          this.formEmail.status = false;
          this.editorData = "";
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = "Error al enviar los email";
        }
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text =
          "Recuerde confirmar el envío y el mensaje debe contener más de 10 caractéres";
      }
    },
  },
};
</script>
<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
