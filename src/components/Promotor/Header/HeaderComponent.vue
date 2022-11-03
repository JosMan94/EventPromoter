<template>
  <header class="xl:hidden bg-black text-white">
    <div
      class="u-container py-5 flex items-center justify-center xl:justify-between relative"
    >
      <button class="absolute left-0 top-6 xl:hidden">
        <img src="../../../assets/images/menu.png" alt="" />
      </button>
      <a href="#">
        <img
          src="../../../assets/images/LOGO.png"
          alt="Logo"
          class="block h-6 w-auto xl:h-auto xl:h-auto mx-auto"
        />
      </a>
      <nav class="text-light-gray hidden xl:block">
        <ul class="flex gap-8">
          <li>
            <a
              class="pb-2 border-b-4 border-main-green px-4 text-white font-bold hover:text-white hover:font-bold transition-colors"
              href="#"
              >HOME</a
            >
          </li>
          <li>
            <a
              class="pb-2 hover:border-b-4 hover:border-main-green px-4 hover:text-white transition-colors"
              href="#"
              >RESERVAS</a
            >
          </li>
          <li>
            <a
              class="pb-2 hover:border-b-4 hover:border-main-green px-4 hover:text-white transition-colors"
              href="#"
              >CELEBRA TU CUMPLEAÑOS</a
            >
          </li>
          <li>
            <a
              class="pb-2 hover:border-b-4 hover:border-main-green px-4 hover:text-white transition-colors"
              href="#"
              >SOY PROMOTOR</a
            >
          </li>
        </ul>
      </nav>
      <div class="hidden xl:flex gap-6">
        <a href="#">
          <img src="../../../assets/images/fb.png" alt="Facebook" />
        </a>
        <a href="#">
          <img src="../../../assets/images/ig.png" alt="instagram" />
        </a>
      </div>
    </div>
  </header>
</template>
