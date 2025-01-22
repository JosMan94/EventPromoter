<template>
  <div class="verificar-qr-express">
    <header class=" text-white">
      <div class="u-container py-5 flex items-center justify-center relative">
        <a href="#">
          <img
            src="../../assets/images/qrExpresslogo.png"
            alt="Logo"
            class="block w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto mx-auto"
          />
        </a>
      </div>
    </header>
    
    <div class="content flex flex-col items-center justify-center px-4">
      <qrcode-vue :value="qrValue" :size="qrSize"></qrcode-vue>
      <div class="info  text-white p-4 mt-4 rounded-md max-w-xs md:max-w-sm">
        <p class="text-center text-lg md:text-xl"><strong>{{ hora }} - {{ numeroAleatorio }}</strong></p>
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
      numeroAleatorio: this.$route.params.numeroAleatorio,
      qrSize: 200 // Tamaño inicial del QR
    };
  },
  computed: {
    qrValue() {
      return `${window.location.origin}/qrexpress/${this.hora}/${this.numeroAleatorio}`;
    }
  },
  mounted() {
    this.updateQrSize();
    window.addEventListener('resize', this.updateQrSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateQrSize);
  },
  methods: {
    updateQrSize() {
      const screenWidth = window.innerWidth;
      this.qrSize = screenWidth < 400 ? 150 : screenWidth < 768 ? 180 : 200;
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
  padding: 1rem; /* Asegura que no se pegue a los bordes en móviles */
}

.verificar-qr-express::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/fondoQr.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  padding: 1rem;
}

.info {
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
