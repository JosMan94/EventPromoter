<template>
  <article class="xl:col-span-2 order-2 xl:order-1">
    <h2 class="font-bold text-xl xl:text-3xl mb-4 text-text-blue xl:block">
      SMS MASIVO
    </h2>
    <form class="grid xl:grid-cols-1 gap-6">
      <div>
        <label for="document" class="block mb-2 text-text-blue font-bold text-sm">
          Confirmar el envío de SMS: <span class="text-red-600"> ( * ) </span>
        </label>

        <label class="switch">
          <input type="checkbox" v-model="form.status" />
          <span class="slider round"></span>
        </label>
      </div>

      <div>
        <label for="nombres" class="block mb-2 text-text-blue font-bold text-sm">
          Mensaje: <span class="text-red-600"> ( * ) </span>
        </label>

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
        <label for="document" class="block mb-2 text-text-blue font-bold text-sm">
          Confirmar el envío de EMAIL: <span class="text-red-600"> ( * ) </span>
        </label>

        <label class="switch">
          <input type="checkbox" v-model="formEmail.status" />
          <span class="slider round"></span>
        </label>
      </div>

      <div>
        <label for="nombres" class="block mb-2 text-text-blue font-bold text-sm">
          Mensaje: <span class="text-red-600"> ( * ) </span>
        </label>

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

    <!-- Nueva Sección para Carga de Archivos -->
    <h2 class="font-bold text-xl xl:text-3xl mb-4 mt-4 text-text-blue xl:block">
      CARGAR ARCHIVO CSV/EXCEL
    </h2>
    <form @submit.prevent="uploadFile" class="grid xl:grid-cols-1 gap-6">
      <div>
        <label for="file" class="block mb-2 text-text-blue font-bold text-sm">
          Seleccione un archivo: <span class="text-red-600"> ( * ) </span>
        </label>
        <input
          type="file"
          @change="onFileChange"
          accept=".csv, .xls, .xlsx"
          class="w-full py-2 px-3 bg-gray-100 rounded-2xl text-black focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        :disabled="!selectedFile || uploading"
        class="block mt-5 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
      >
        {{ uploading ? 'Cargando...' : 'Subir Archivo' }}
      </button>
    </form>
    <div v-if="successMessage" class="text-green-500 font-semibold mt-2">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="text-red-500 font-semibold mt-2">
      {{ errorMessage }}
    </div>
  </article>
</template>

<script>
import { funcionalityService } from "../../../service/Funcionality/funcionality.service";
import { clientService } from "../../../service/Cliente/cliente.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from 'axios'; // Importa Axios

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
      // tickets
      events: [],
      // Archivo
      selectedFile: null,  // Nuevo campo para almacenar el archivo seleccionado
      uploading: false,    // Estado de carga
      successMessage: '',  // Mensaje de éxito
      errorMessage: '',    // Mensaje de error
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
          this.$store.state.alert.text = "EMAIL masivo enviado";
          this.formEmail.status = false;
          this.editorData = "";
        } else {
          this.formEmail.status = false;
          this.editorData = "";
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = "Error al enviar los EMAILS";
        }
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text =
          "Recuerde confirmar el envío y el mensaje debe contener más de 10 caractéres";
      }
    },
    // Nuevo método para manejar el cambio de archivo
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    // Nuevo método para cargar el archivo al backend
    async uploadFile() {
      if (!this.selectedFile) {
        this.errorMessage = 'Seleccione un archivo primero';
        return;
      }
      this.uploading = true;
      this.successMessage = '';
      this.errorMessage = '';
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      try {
        const response = await axios.post('https://promotoresback.azurewebsites.net/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.successMessage = 'Archivo subido con éxito';
        this.selectedFile = null;  // Limpiar el archivo seleccionado
      } catch (error) {
        this.errorMessage = 'Error al subir el archivo';
      } finally {
        this.uploading = false;
      }
    }
  },
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
