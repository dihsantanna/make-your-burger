<script lang="ts">
import LoginForm from './LoginForm.vue';

export default {
  name: 'Header',
  components: { LoginForm },
  props: {
    logo: {
      type: String,
      required: true,
    },
    altLogo: {
      type: String,
      required: true,
    },
    logged: {
      type: Boolean,
      required: true,
    },
    handleIsLogged: {
      type: Function,
      required: true,
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.handleIsLogged(false);
      this.$router.push('/');
    },
  },
};
</script>
<template>
  <header class="header">
    <router-link to="/">
      <img :src="logo" :alt="altLogo" class="logo" />
    </router-link>
    <nav class="nav-bar">
      <LoginForm v-if="!logged" :handleIsLogged="handleIsLogged" />
      <router-link v-if="logged" to="/">Inicio</router-link>
      <router-link v-if="logged" to="/pedidos">Pedidos</router-link>
      <button v-if="logged" class="logout-btn" type="button" @click="logout">Sair</button>
    </nav>
  </header>
</template>
<style scoped>
.header {
  align-items: center;
  background-color: #222;
  border-bottom: 2px solid #fcba03;
  border-radius: 0 0 5px 5px;
  display: flex;
  justify-content: space-between;
  padding: 15px 50px;
  width: 100vw;
}

.logo {
  width: 40px;
  height: 40px;
}

.nav-bar {
  display: flex;
  gap: 50px;
}

a,
.logout-btn {
  color: #fcba03;
  text-decoration: none;
  opacity: 0.9;
  transition: 0.5s;
}

a:hover,
.logout-btn:hover {
  color: white;
  opacity: 1;
}

.logout-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}
</style>
