<template>
  <div>
    <h3 class="title">{{ locationName }}</h3>
  </div>
</template>

<script setup lang="ts">
const locationName = ref('')
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
