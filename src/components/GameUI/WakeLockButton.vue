<template>
  <button 
    v-if="isWakeLockSupported" 
    class="wake-lock-button" 
    @click="toggleWakeLock" 
    :title="isWakeLockActive ? 'Allow screen to sleep' : 'Keep screen awake'"
    :class="{ 'active': isWakeLockActive }"
  >
    <span v-if="isWakeLockActive">🔒</span>
    <span v-else>🔓</span>
  </button>
</template>

<script setup>
defineProps({
  isWakeLockSupported: {
    type: Boolean,
    required: true
  },
  isWakeLockActive: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle'])

const toggleWakeLock = () => {
  emit('toggle')
}
</script>

<style scoped>
.wake-lock-button {
  position: absolute;
  bottom: 20px;
  left: 70px;
  width: 40px;
  height: 40px;
  font-size: 18px;
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wake-lock-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.wake-lock-button:active {
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateY(0);
}

.wake-lock-button.active {
  background-color: #4CAF50;
  border-color: #4CAF50;
  color: white;
}

.wake-lock-button.active:hover {
  background-color: #45a049;
  border-color: #45a049;
}
</style>
