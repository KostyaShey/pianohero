<template>
  <div class="midi-status-internal">
    <span v-if="midiSupported" class="midi-connected">🎹 MIDI Ready</span>
    <span v-else class="midi-disconnected">🎹 MIDI Not Available</span>
  </div>
</template>

<script setup>
defineProps({
  midiSupported: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.midi-status-internal {
  font-size: 14px;
  font-weight: bold;
  flex: 0 0 auto;
}

.midi-connected {
  color: #4CAF50;
}

.midi-disconnected {
  color: #999;
}
</style>
