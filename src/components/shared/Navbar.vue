<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-white fixed w-full shadow p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <img class="w-10 mr-2 " src="../../assets/logo.png" alt="">
        <!-- <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span> -->
      </div>
      <div class="block md:hidden">
        <button
          @click.prevent="toggleNavMenu"
          class="flex items-center px-3 py-2 border rounded text-orange-600 border-orange-600 hover:text-orange-800 hover:border-orange-800"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        class="w-full flex-grow md:flex md:items-center md:w-auto mt-2 md:mt-0"
        :class="[showNavMenu ? 'block' : 'hidden']"
      >
        <div v-if="$store.getters.authStatus === 'success' || typeof $store.getters.token === 'string'" class="text-sm md:flex-grow">
          <a
            href="#responsive-header"
            class="font-mono block mt-4 md:inline-block mt-2 md:mt-0 text-orange-600 hover:text-orange-800 mr-4"
          >History</a>
          <a
            href="#responsive-header"
            class="font-mono block mt-4 md:inline-block mt-2 md:mt-0 text-orange-600 hover:text-orange-800 mr-4"
          >Settings</a>
        </div>
        <div v-else class="text-sm md:flex-grow">

        </div>
        <div v-if="$store.getters.authStatus === 'success' || typeof $store.getters.token === 'string'">
          <a
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-orange-600 border-orange-600 hover:border-transparent hover:text-white hover:bg-orange-800 mt-2 md:mt-0"
          >Logout</a>
        </div>
        <div v-else>
          <a
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-orange-600 border-orange-600 hover:border-transparent hover:text-white hover:bg-orange-800 mt-2 md:mt-0"
          >Login</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNavMenu: false,
    };
  },
  methods: {
    toggleNavMenu() {
      this.showNavMenu = !this.showNavMenu;
    },
  },
};
</script>

<style scoped>
  div.text-sm > a {
    width: fit-content;
  }
</style>
