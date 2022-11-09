<script lang="ts">
import logo from './assets/logo.png';
import { Footer, Header } from './components';

export default {
  name: 'App',
  components: {
    Footer,
    Header,
  },
  data() {
    return {
      logo,
      altLogo: 'Logo da Hamburgueria',
      isLogged: false,
    };
  },
  methods: {
    handleIsLogged(bool: boolean) {
      this.isLogged = bool;
    },
  },
};
</script>

<template>
  <Header :logo="logo" :altLogo="altLogo" :logged="isLogged" :handleIsLogged="handleIsLogged" />
  <router-view />
  <Footer />
</template>

<style>
* {
  box-sizing: border-box;
  font-family: Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  min-height: 100vh;
  width: 100vw;
}

.main-container {
  padding: 50px;
  width: 100%;
}

h1 {
  color: #222;
  font-size: 2.62rem;
  margin-bottom: 30px;
  text-align: center;
}
</style>
