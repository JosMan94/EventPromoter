<!-- Archivo: src/views/Verificar/VerificarQrExpress.vue -->
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
    <div class="content">
      <qrcode-vue :value="qrValue" :size="200"></qrcode-vue>
      <div class="info">
        <p><strong>{{ hora }} - {{ numeroAleatorio }}</strong></p>
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
  z-index: 1; /* Asegura que el contenido esté encima del fondo */
}

.info {
  margin-top: 20px;
  font-size: 1.5rem; /* Ajusta este valor para cambiar el tamaño de la fuente */
  font-weight: bold; /* Hace que el texto sea más visible */
  text-align: center;
  color:white;
}
</style>
