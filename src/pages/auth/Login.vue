<template>
  <div class="absolute w-full mt-20">
    <div class="w-full max-w-xs m-auto">
      <div class="flex items-center flex-shrink-0 text-white mb-6 m-auto justify-center">
        <img class="w-10 mr-2 " src="../../assets/logo.png" alt="">
        <!-- <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span> -->
      </div>
      <form @submit.prevent="loginUser" class="bg-white shadow rounded px-8 pt-6 pb-8 mb-4">
        <h3 class="block text-orange-600 font-sans text-lg md:text-2xl font-bold mb-6" for="password">Login</h3>
        <div class="mb-4">
          <label class="block text-orange-600 font-sans text-sm font-bold mb-2" for="email">Email Address</label>
          <input
            @change.prevent="(evt) => onInputChange(evt, 'email')"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-orange-600 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email Address"
          />
        </div>
        <div class="mb-6">
          <label class="block text-orange-600 font-sans text-sm font-bold mb-2" for="password">Password</label>
          <input
            @change.prevent="(evt) => onInputChange(evt, 'password')"
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-orange-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p class="text-red-500 text-xs font-mono italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline font-sans"
            type="submit"
          >Continue</button>
          <a
            class="inline-block align-baseline font-bold text-sm text-orange-600 hover:text-orange-600 font-mono"
            href="#"
          >Forgot Password?</a>
        </div>
      </form>
      <div class="w-full text-center">
        <router-link
            class="underline inline-block align-baseline font-bold text-sm text-orange-600 hover:text-orange-600 font-mono"
            to="/register"
          >Create An Account</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login-page',
  data() {
    return {
      formFields: {},
    };
  },
  methods: {
    async onInputChange(evt, field) {
      this.formFields[field] = evt.target.value;
    },
    async loginUser() {
      this.$store.dispatch('login', this.formFields)
        .then(() => {
          this.$toast.success('Success!', {
            position: 'top-right',
            duration: 3000,
          });
          this.$router.push('/');
        })
        .catch((error) => {
          this.$toast.error(error.response?.data.message || 'Unsuccessful attempt', {
            position: 'top-right',
            duration: 3000,
          });
        });
    },
    switchToLogin() {
      this.$eventBus.$emit('auth-mode', 'login');
    },
  },
};
</script>

<style>
.notices .toast-success {
  background: #dd6b20;
}
</style>
