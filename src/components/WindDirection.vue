<template>
  <div class="card">
    <div>{{ windDir }}</div>
    <div>{{ windScale }}级</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    windDir: string
    windScale: string
  }>(),
  { windDir: '', windScale: '' },
)
</script>

<style scoped>
.card {
  flex-direction: column;
  justify-content: center;
  padding: 1.5em;
  min-height: 6.75em;
}
</style>
