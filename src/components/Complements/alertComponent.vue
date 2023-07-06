<template>
  <section class="fixed right-0 top-0 px-6 py-8 z-40 grid gap-4">
    <article
      v-if="getStatusAlert"
      :class="getTypeAlert == 'error' ? 'border-red-700' : 'border-green-700'"
      class="relative p-4 rounded-md border-2 border-green-700 bg-green-50 text-sm"
    >
      <header
        :class="getTypeAlert == 'error' ? 'text-red-700' : 'text-green-700'"
        class="flex items-center justify-between mb-4 text-green-700 font-semibold"
      >
        <h2>{{ getTypeAlert == "error" ? "Error" : "Success" }}</h2>
        <!-- <button class="text-xl" type="button">x</button> -->
      </header>
      <p style="max-width: 75ch">
        {{ getTextAlert }}
      </p>
    </article>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeStatusAlert() {
      setTimeout(() => {
        this.$store.state.alert.status = false;
      }, 4000);
    },
  },
  computed: {
    getStatusAlert() {
      if (this.$store.state.alert.status) {
        this.changeStatusAlert();
      }
      return this.$store.state.alert.status;
    },
    getTypeAlert() {
      return this.$store.state.alert.type;
    },
    getTextAlert() {
      return this.$store.state.alert.text;
    },
  },
};
</script>
