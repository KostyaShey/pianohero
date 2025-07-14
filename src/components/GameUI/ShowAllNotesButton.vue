<template>
  <button class="show-all-button" @click="$emit('toggle')">
    {{ showAllNotes ? 'Hide notes' : 'Show notes' }}
  </button>
</template>

<script setup>
defineProps({
  showAllNotes: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggle'])
</script>

<style scoped>
.show-all-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: bold;
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.show-all-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.show-all-button:active {
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateY(0);
}
</style>
