<template>
  <div class="top-controls">
    <!-- Clef Toggle -->
    <ClefToggle v-model="localUseTrebleClef" />
    
    <!-- Note Naming Toggle -->
    <NamingToggle v-model="localUseSolfege" />
    
    <!-- MIDI Status Indicator -->
    <MidiStatus :midi-supported="midiSupported" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ClefToggle from './ClefToggle.vue'
import NamingToggle from './NamingToggle.vue'
import MidiStatus from './MidiStatus.vue'

const props = defineProps({
  useTrebleClef: {
    type: Boolean,
    required: true
  },
  useSolfege: {
    type: Boolean,
    required: true
  },
  midiSupported: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:useTrebleClef', 'update:useSolfege'])

const localUseTrebleClef = computed({
  get: () => props.useTrebleClef,
  set: (value) => emit('update:useTrebleClef', value)
})

const localUseSolfege = computed({
  get: () => props.useSolfege,
  set: (value) => emit('update:useSolfege', value)
})
</script>

<style scoped>
.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  gap: 20px;
}
</style>
