<template>
  {{ code }}
</template>
<script>
import { clientService } from "../../service/Cliente/cliente.service";
export default {
  data() {
    return {
      code: this.$route.params.codeLink,
    };
  },
  mounted() {
    if (this.code) {
      this.linkCode(this.code);
    } else {
      alert("Url inválida");
    }
  },
  methods: {
    async linkCode(code) {
      await clientService.linkShort(code);
    },
  },
};
</script>
