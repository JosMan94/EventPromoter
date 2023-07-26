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
      type="submit"
      @click.prevent="enviarSms"
      class="block mt-5 bg-main-green text-base font-bold text-white rounded-2xl p-5 text-center"
    >
      ENVIAR
    </button>
  </article>
</template>
<script>
import { funcionalityService } from "../../../service/Funcionality/funcionality.service";
export default {
  data() {
    return {
      form: {
        status: false,
        mensaje: "",
      },
    };
  },
  methods: {
    async enviarSms() {
      if (this.form.status && this.form.mensaje.length !== 5) {
        var result = await funcionalityService.smsMasivo(this.form.mensaje);
        if (result.success) {
          this.eventos = result.data.data;
        } else {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = "Error al enviar los SMS";
        }
      } else {
        this.$store.state.alert.status = true;
        this.$store.state.alert.type = "error";
        this.$store.state.alert.text =
          "Recuerde confirmar el envío y el mensaje debe contener más de 5 caractéres";
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
