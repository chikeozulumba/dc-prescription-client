<template>
  <div id="app">
    <Navbar />
    <div id="app-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import '@/assets/css/tailwind.css';
import '@/assets/css/style.css';

export default {
  name: 'App',
  components: {
    Navbar: () => import('./components/shared/Navbar.vue'),
  },
};
</script>

<style>
#app-wrapper {
  padding-top: 80px;
}
</style>
