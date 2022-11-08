<script lang="ts">
import { OrderTable } from '@/components';
export default {
  name: 'Orders',
  components: {
    OrderTable,
  },
};
</script>
<template>
  <main class="main-container">
    <h1>Gerenciar Pedidos:</h1>
    <OrderTable />
  </main>
</template>
<style scoped></style>
