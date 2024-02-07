<template>
  <el-dialog
    v-model="visible"
    title="切换城市"
    width="300"
    align-center
  >
    <el-input
      v-model="input"
      placeholder="请输入"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClick">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
defineExpose({ visible })
const emit = defineEmits<{
  search: [value: string]
}>()

const input = ref('')

function handleClick() {
  visible.value = false
  emit('search', input.value)
}
</script>
