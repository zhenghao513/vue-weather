<template>
  <div class="card">
    <div>{{ timeFormat(sunrise) }}</div>
    <div>日出</div>
    <div>{{ timeFormat(sunset) }}</div>
    <div>日落</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    sunrise: string
    sunset: string
  }>(),
  { sunrise: '', sunset: '' },
)

const timeFormat = (time: string) => {
  return new Date(time).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.card {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 1.5em 0;
  padding: 1.5em;
  min-height: 6.75em;
}

.card * + * {
  margin-top: 0;
}
</style>
