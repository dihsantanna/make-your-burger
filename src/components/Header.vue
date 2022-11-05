<script lang="ts">
export default {
  name: 'Header',
  props: {
    logo: {
      type: String,
      required: true,
    },
    altLogo: {
      type: String,
      required: true,
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
      <router-link to="/">Inicio</router-link>
      <router-link to="/pedidos">Pedidos</router-link>
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

a {
  color: #fcba03;
  text-decoration: none;
  opacity: 0.9;
  transition: 0.5s;
}

a:hover {
  color: white;
  opacity: 1;
}
</style>
