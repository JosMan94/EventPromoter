<template>
  <header class="bg-black text-white">
    <div
      class="u-container py-5 flex items-center justify-center xl:justify-between relative"
    >
      <button
        @click.prevent="changeStatusMenu"
        class="absolute left-0 top-6 xl:hidden"
        id="btn-abrir-menu"
      >
        <img src="../../../../assets/images/menu.png" alt="" />
      </button>
      <router-link :to="{ name: 'Home' }">
        <img
          src="../../../../assets/images/LOGO.png"
          alt="Logo"
          class="block h-6 w-auto xl:h-auto mx-auto"
        />
      </router-link>
      <nav class="text-light-gray hidden xl:block">
        <ul class="flex gap-8">
          <!-- <li>
            <a
              class="pb-2 border-b-4 border-main-green px-4 text-white font-bold hover:text-white hover:font-bold transition-colors"
              href="#eventos"
              >HOME</a
            >
          </li>
          <li>
            <a
              class="pb-2 hover:border-b-4 hover:border-main-green px-4 hover:text-white transition-colors"
              href="#reserva"
              >RESERVAS</a
            >
          </li>
          <li>
            <a
              class="pb-2 hover:border-b-4 hover:border-main-green px-4 hover:text-white transition-colors"
              href="#reserva"
              >CELEBRA TU CUMPLEAÑOS</a
            >
          </li> -->

          <li v-if="sessionUser === false">
            <a
              class="pb-2 border-b-4 border-main-green hover:border-b-4 hover:border-main-green px-4 hover:text-white transition-colors cursor-pointer"
              @click.prevent="login"
              >SOY PROMOTOR</a
            >
          </li>
          <li v-else-if="sessionUser">
            <a
              class="pb-2 hover:border-b-4 hover:border-main-green px-4 hover:text-white transition-colors cursor-pointer"
              @click.prevent="plataformaUser"
              >PLATAFORMA</a
            >
          </li>
        </ul>
      </nav>
      <div class="hidden xl:flex gap-6">
        <a href="#">
          <img src="../../../../assets/images/fb.png" alt="Facebook" />
        </a>
        <a href="#">
          <img src="../../../../assets/images/ig.png" alt="instagram" />
        </a>
      </div>
    </div>
  </header>
  <!-- Menu abierto -->
  <nav
    :class="menuClass ? '' : 'menu-cerrado'"
    class="fixed top-0 bottom-0 left-0 right-0 py-14 bg-main-blue-black min-h-screen transition-transform z-10"
  >
    <button type="button" class="block w-full mb-10 pl-12 pr-40">
      <img src="../../../../assets/images/LOGO.png" alt="LOGO" class="mx-auto" />
    </button>
    <!-- <button
      href="#eventos"
      type="button"
      class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center bg-main-green hover:bg-main-green transition-colors"
    >
      <img src="../../../../assets/images/home.png" alt="Home" />
      Home
    </button>
    <button
      href="#reserva"
      type="button"
      class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center hover:bg-main-green transition-colors"
    >
      <img src="../../../../assets/images/reserva.png" alt="Reservas" />
      Reservas
    </button>
    <button
      href="#reserva"
      type="button"
      class="py-5 pl-12 w-full flex gap-5 text-white items-center hover:bg-main-green transition-colors"
    >
      <img src="../../../../assets/images/cumpleaños.png" alt="Celebra tu Cumpleaños" />
      <span>Celebra tu Cumpleaños</span>
    </button> -->

    <button
      v-if="sessionUser === false"
      type="button"
      @click.prevent="login"
      class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center bg-main-green hover:bg-main-green transition-colors"
    >
      <img src="../../../../assets/images/icon-promotores.png" alt="PROMOTORES" />
      Promotores
    </button>
    <button
      v-else-if="sessionUser"
      type="button"
      @click.prevent="plataformaUser"
      class="py-5 pl-12 pr-40 w-full flex gap-5 text-white items-center bg-main-green hover:bg-main-green transition-colors"
    >
      <img src="../../../../assets/images/icon-promotores.png" alt="PROMOTORES" />
      Plataforma
    </button>
    <button
      @click.prevent="changeStatusMenu"
      class="absolute top-8 right-8 h-10 w-10 "
     
    >
      <img src="../../../../assets/images/Icon-x.png" alt="Cerrar menu" />
    </button>
  </nav>

  <!-- LOGIN -->
  <section
    :class="statusFormLogin ? '' : 'opacity-0 pointer-events-none'"
    class="fixed inset-0 bg-bg-black bg-opacity-50 z-40 flex items-center justify-center"
  >
    <article class="pt-20 pb-10 px-10 xl:px-20 bg-white rounded-2xl relative">
      <h3 class="font-bold text-xl xl:text-2xl text-center mb-10">
        Ingresar a mi cuenta
      </h3>
      <form @submit.prevent="petitionLogin" class="text-base font-bold">
        <label class="block mb-8 w-64 xl:w-80">
          <span class="block mb-1 text-sm xl:text-base">Correo electrónico</span>
          <input
            class="w-full xl:text-lg py-2 border-b-2 border-gray-200 transition-colors focus:outline-none focus:border-red-600"
            type="email"
            placeholder="user@gmail.com"
            v-model="form.email"
            required
          />
        </label>
        <label class="block mb-8 w-64 xl:w-80">
          <span class="block mb-1 text-sm xl:text-base">Contraseña</span>
          <input
            class="w-full xl:text-lg py-2 border-b-2 border-gray-200 transition-colors focus:outline-none focus:border-red-600"
            type="password"
            placeholder="**********"
            v-model="form.password"
            required
          />
        </label>
        <!-- <a href="#" class="block mb-8 text-center underline text-bg-black font-bold"
          >Recuperar clave</a
        > -->
        <button
          type="submit"
          class="block mx-auto py-4 px-16 rounded-2xl bg-main-green text-white font-bold"
        >
          Ingresa
        </button>
      </form>
      <button
        type="button"
        class="absolute top-3 right-3 xl:top-6 xl:right-6 cursor-pointer"
      >
        <img
          @click.prevent="login"
          src="../../../../assets/images/icon-x-2.png"
          alt="Cerrar modal"
          class="cursor-pointer"
        />
      </button>
    </article>
  </section>
</template>
<script>
import { clientService } from "../../../../service/Cliente/cliente.service";
export default {
  data() {
    return {
      menuClass: false,
      statusFormLogin: false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    // const $btn_abrir_menu = document.getElementById("btn-abrir-menu");
    // const $btn_cerrar_menu = document.getElementById("btn-cerrar-menu");
    // const $menu = document.getElementById("menu");
    // $btn_abrir_menu.addEventListener("click", () =>
    //   $menu.classList.remove("menu-cerrado")
    // );
    // $btn_cerrar_menu.addEventListener("click", () => $menu.classList.add("menu-cerrado"));
    // addEventListener("click", (e) => {
    //   if (e.target.matches("#menu")) $menu.classList.add("menu-cerrado");
    // });
  },
  methods: {
    changeStatusMenu() {
      this.menuClass = !this.menuClass;
    },
    plataformaUser() {
      if (this.$cookies.get("session") === "admin") {
        this.$router.push({ name: "Administrador", params: { viewAdmin: "eventos" } });
      } else if (this.$cookies.get("session") === "promotor") {
        this.$router.push({ name: "Promotor", params: { viewPromotor: "eventos" } });
      } else {
        location.reload();
      }
    },
    async petitionLogin() {
      if (this.form.email.length !== 0 && this.form.password.length !== 0) {
        var ojb = new Object();
        ojb.email = this.form.email;
        ojb.password = this.form.password;
        var result = await clientService.login(ojb);
        if (result.success) {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "success";
          this.$store.state.alert.text = "Acceso permitido";
          if (result.data.type === "admin") {
            this.$router.push({
              name: "Administrador",
              params: { viewAdmin: "eventos" },
            });
          }
          if (result.data.type === "promotor") {
            this.$router.push({ name: "Promotor", params: { viewPromotor: "eventos" } });
          }
          this.$store.state.typeUser = result.data.type;
          this.$store.state.codeUser = result.data.code_user;
          this.$cookies.set(
            "session",
            this.$store.state.typeUser,
            60 + 60 + 60 + 60 + 60 + 60
          );
          this.$cookies.set(
            "code",
            this.$store.state.codeUser,
            60 + 60 + 60 + 60 + 60 + 60
          );
        } else {
          this.$store.state.alert.status = true;
          this.$store.state.alert.type = "error";
          this.$store.state.alert.text = "Error al iniciar sesión";
        }
      }
    },
    login() {
      this.statusFormLogin = !this.statusFormLogin;
      if (this.statusFormLogin === false) {
        this.form.email = "";
        this.form.password = "";
      }
    },
  },
  computed: {
    sessionUser() {
      if (this.$cookies.get("session") && this.$cookies.get("code")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
