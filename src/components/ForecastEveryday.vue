<template>
  <div class="card">
    <div
      v-for="(day, index) in everydayList"
      :key="index"
      class="card__col"
    >
      <div class="card__col-content">
        <span>{{ computeWeek(index) }}</span>
        <span>{{ dateFormat(index) }}</span>
        <div><i :class="'qi-' + day.iconDay"></i></div>
        <span>{{ day.textDay }}</span>
        <span>{{ day.tempMax }}°</span>
        <span>{{ day.tempMin }}°</span>
        <div><i :class="'qi-' + day.iconNight"></i></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DailyWeatherInfo } from '@/types'

withDefaults(
  defineProps<{
    everydayList: DailyWeatherInfo['daily']
  }>(),
  { everydayList: () => [] },
)
const propelDate = (num: number) => {
  const today = new Date()
  return today.setDate(today.getDate() + num)
}

const dateFormat = (num: number) => {
  return new Date(propelDate(num)).toLocaleDateString('zh-CN', {
    month: 'narrow',
    day: 'numeric',
  })
}

const weekFormat = (num: number) => {
  return new Date(propelDate(num)).toLocaleDateString('zh-CN', {
    weekday: 'short',
  })
}

const computeWeek = (index: number) => {
  if (index === 0) {
    return '今天'
  }
  if (index === 1) {
    return '明天'
  }
  return weekFormat(index)
}
</script>

<style scoped>
@media (max-width: 500px) {
  .card > div:first-child {
    margin-left: auto;
  }

  .card > div:last-child {
    margin-right: auto;
  }
}

@media (min-width: 500px) {
  .card {
    justify-content: space-evenly;
  }
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
