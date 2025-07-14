<template>
  <button 
    class="fullscreen-button" 
    @click="$emit('toggle')" 
    :title="isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'"
  >
    <span v-if="isFullscreen">⤪</span>
    <span v-else>⤢</span>
  </button>
</template>

<script setup>
defineProps({
  isFullscreen: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggle'])
</script>

<style scoped>
.fullscreen-button {
  position: absolute;
  bottom: 20px;
  left: 20px;
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

.fullscreen-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.fullscreen-button:active {
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateY(0);
}
</style>
