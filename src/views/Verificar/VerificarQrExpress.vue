<!-- Archivo: src/views/Verificar/VerificarQrExpress.vue -->
<template>
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
  <div class="verificar-qr-express">
    <qrcode-vue :value="qrValue" :size="200"></qrcode-vue>
    <div class="info">
      <p><strong>{{ hora }} - {{ numeroAleatorio }}</strong></p>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.info {
  margin-top: 20px;
}
</style>
