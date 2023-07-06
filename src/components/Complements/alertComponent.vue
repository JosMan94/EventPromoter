<template>
  <section class="fixed right-0 top-0 px-6 py-8 z-40 grid gap-4">
    <article
      class="relative p-4 rounded-md border-2 border-green-700 bg-green-50 text-sm"
    >
      <header class="flex items-center justify-between mb-4 text-green-700 font-semibold">
        <h2>Success</h2>
        <!-- <button class="text-xl" type="button">x</button> -->
      </header>
      <p style="max-width: 75ch">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusantium sequi
        sapiente laudantium est repellendus deleniti eos!
      </p>
    </article>
    <article class="relative p-4 rounded-md border-2 border-red-700 bg-red-50 text-sm">
      <header class="flex items-center justify-between mb-4 text-red-700 font-semibold">
        <h2>Error</h2>
        <!-- <button class="text-xl" type="button">x</button> -->
      </header>
      <p style="max-width: 75ch">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusantium sequi
        sapiente laudantium est repellendus deleniti eos!
      </p>
    </article>
    <!-- <article class="relative p-4 rounded-md border-2 border-yellow-700 bg-yellow-50 text-sm">
      <header class="flex items-center justify-between mb-4 text-yellow-700 font-semibold">
        <h2>Warning</h2>
        <button class="text-xl" type="button">x</button>
      </header>
      <p style="max-width: 75ch;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusantium sequi sapiente laudantium est repellendus deleniti eos!</p>
    </article> -->
    <!-- <article class="relative p-4 rounded-md border-2 border-blue-700 bg-blue-50 text-sm">
      <header class="flex items-center justify-between mb-4 text-blue-700 font-semibold">
        <h2>Info</h2>
        <button class="text-xl" type="button">x</button>
      </header>
      <p style="max-width: 75ch;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusantium sequi sapiente laudantium est repellendus deleniti eos!</p>
    </article> -->
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    getStatusAlert() {
      return this.$store.state.alert.status;
    },
    getTypeAlert() {
      return this.$store.state.alert.type;
    },
  },
};
</script>
