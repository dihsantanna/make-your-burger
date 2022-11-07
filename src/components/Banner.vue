<script lang="ts">
export default {
  name: 'Banner',
};
</script>
<template>
  <div class="main-banner">
    <h1>Make Your Burger</h1>
  </div>
</template>
<style scoped>
.main-banner {
  align-items: center;
  background-image: url('@/assets/burger.jpg');
  background-position: 0 -40vh;
  background-size: cover;
  display: flex;
  height: 80vh;
  justify-content: flex-start;
  width: 100%;
}

.main-banner h1 {
  background-color: #222;
  color: #fff;
  font-size: 3.75rem;
  padding: 20px 40px;
  text-align: center;
  text-shadow: 2px 2px 4px #000;
}
</style>
