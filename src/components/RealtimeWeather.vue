<template>
  <div class="realtime">
    <div class="left">
      <span class="temp">{{ temp }}</span>
    </div>
    <div class="right">
      <span>℃</span>
      <span class="text">{{ text }}</span>
    </div>
  </div>

  <div class="tag">
    <el-tag
      type="info"
      round
    >
      <el-icon>
        <Flag />
      </el-icon>
      空气{{ category }} {{ aqi }}
    </el-tag>
    <el-tag
      v-show="rainTagVisibility"
      type="info"
      round
    >
      <el-icon><Pouring /></el-icon>
      正在下雨
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { Flag, Pouring } from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    temp: string
    text: string
    category: string
    aqi: string
  }>(),
  { temp: '', text: '', category: '', aqi: '' },
)

const rainTagVisibility = computed(() => {
  return props.text.includes('雨')
})
</script>

<style scoped>
.realtime {
  display: flex;
  justify-content: center;
}

.temp {
  font-size: 6rem;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 1.5rem;
  margin-top: 0;
}

.text {
  margin-top: 0;
}

.tag {
  margin-top: 0;
  text-align: center;
}

.tag > .el-tag:not(:nth-child(1)) {
  margin-left: 0.5em;
  margin-top: 0;
}
</style>
