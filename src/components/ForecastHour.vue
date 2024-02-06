<template>
  <div class="card">
    <div
      v-for="(hour, index) in hourList"
      :key="index"
      class="card__col"
    >
      <div class="card__col-content">
        <span>{{ hour.temp }}°</span>
        <div><i :class="'qi-' + hour.icon"></i></div>
        <span>{{ hour.windScale }}级</span>
        <span>{{ timeFormat(hour.fxTime) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HourlyWeatherInfo } from '@/types'

withDefaults(
  defineProps<{
    hourList: HourlyWeatherInfo['hourly']
  }>(),
  { hourList: () => [] },
)

const timeFormat = (time: string) => {
  return new Date(time).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.card > div:first-child {
  margin-left: auto;
}

.card > div:last-child {
  margin-right: auto;
}

.card__col:not(:first-child),
.card__col-content *:not(:first-child) {
  margin-top: 0;
}

.card__col-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 4em;
  height: 100%;
}

.card::-webkit-scrollbar {
  display: none;
}
</style>
