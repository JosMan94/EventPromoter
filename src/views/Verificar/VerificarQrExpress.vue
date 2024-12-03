<template>
  <div class="verificar-qr-express">
    <header class="bg-black text-white">
      <div class="u-container py-5 flex items-center justify-center relative">
        <a href="#">
          <img
            src="../../assets/images/LOGO.png"
            alt="Logo"
            class="block h-12 w-auto xl:h-auto mx-auto"
          />
        </a>
      </div>
    </header>
    <div class="content flex flex-col items-center justify-center">
      <qrcode-vue :value="qrValue" :size="200"></qrcode-vue>
      <div class="info bg-black text-white p-4 mt-4 rounded-md">
        <p class="text-center"><strong>{{ hora }} - {{ numeroAleatorio }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'VerificarQrExpress',
  components: {
    QrcodeVue
  },
  data() {
    return {
      hora: this.$route.params.hora,
      numeroAleatorio: this.$route.params.numeroAleatorio
    };
  },
  computed: {
    qrValue() {
      return `${window.location.origin}/qrexpress/${this.hora}/${this.numeroAleatorio}`;
    }
  }
};
</script>

<style scoped>
.verificar-qr-express {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  overflow: hidden;
}

.verificar-qr-express::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/mosaicoEuphoria.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5; /* Ajusta este valor para cambiar la transparencia */
  z-index: -1; /* Asegura que el fondo esté detrás del contenido */
}

.content {
  position: relative;
  z-index: 1; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem; /* Espaciado entre el QR y el texto */
  text-align: center;
  padding: 1rem; /* Asegura que el contenido esté encima del fondo */
}

.info {
  font-size: 1.5rem; /* Ajusta este valor para cambiar el tamaño de la fuente */
  font-weight: bold; /* Hace que el texto sea más visible */
  color: white;
  background-color: black; /* Asegura el fondo negro */
  max-width: 300px;
  padding: 1rem;
  border-radius: 0.5rem; /* Bordes redondeados */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra para resaltar */
  text-align: center;
}
</style>
