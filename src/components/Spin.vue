<script lang="ts">
export default {
  name: 'Spin',
  props: {
    size: {
      type: String,
      default: '20px',
    },
    duration: {
      type: String,
      default: '0.3s',
    },
    borderSize: {
      type: String,
      default: '1.5px',
    },
  },
};
</script>
<template>
  <div
    class="spin"
    :style="{
      animationDuration: duration,
      border: `${borderSize} solid #e8e6e8`,
      borderLeft: `${borderSize} solid #fcba03`,
      width: size,
      height: size,
    }"
  />
</template>
<style scoped>
.spin {
  animation: spin linear infinite;
  border-radius: 50%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
