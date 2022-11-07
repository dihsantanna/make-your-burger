<script lang="ts">
import { Banner, BurgerForm } from '@/components';
export default {
  name: 'Home',
  components: {
    Banner,
    BurgerForm,
  },
};
</script>
<template>
  <Banner />
  <main class="main-container">
    <h1>Monte o seu burger:</h1>
    <BurgerForm />
  </main>
</template>

<style scoped></style>
