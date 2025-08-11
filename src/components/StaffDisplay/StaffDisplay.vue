<template>
  <svg class="staff" width="100%" height="150" viewBox="0 0 800 150" preserveAspectRatio="xMidYMid meet">
    <!-- Five main staff lines -->
    <line v-for="i in 5" :key="i" 
          :x1="50" :x2="750" 
          :y1="40 + (i-1) * 10" :y2="40 + (i-1) * 10" 
          stroke="#000" stroke-width="1"/>
    
    <!-- Clef symbol -->
    <text :x="clefPosition.x" :y="clefPosition.y" 
          font-family="serif" 
          :font-size="clefPosition.fontSize" 
          fill="#000">
      {{ useTrebleClef ? '𝄞' : '𝄢' }}
    </text>
    
    <!-- Individual ledger lines for notes that need them -->
    <LedgerLine 
      v-for="note in displayedNotes" 
      :key="`ledger-${note.id}`"
      :note="note" 
    />
    
    <!-- Displayed notes (game notes) -->
    <Note 
      v-if="!showAllNotes" 
      v-for="note in displayedNotes" 
      :key="note.id"
      :note="note"
    />
    
    <!-- All notes display (when showing all notes) -->
    <template v-if="showAllNotes">
      <LedgerLine 
        v-for="note in allNotesWithLabels" 
        :key="`all-ledger-${note.id}`"
        :note="note" 
      />
      
      <Note 
        v-for="note in allNotesWithLabels" 
        :key="note.id"
        :note="note"
        :show-label="true"
      />
    </template>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import Note from './Note.vue'
import LedgerLine from './LedgerLine.vue'

const props = defineProps({
  useTrebleClef: {
    type: Boolean,
    required: true
  },
  displayedNotes: {
    type: Array,
    required: true
  },
  showAllNotes: {
    type: Boolean,
    required: true
  },
  allNotesWithLabels: {
    type: Array,
    required: true
  },
  // Clef positioning options
  trebleClefPosition: {
    type: Object,
    default: () => ({
      x: 60,
      y: 90,
      fontSize: 70
    })
  },
  bassClefPosition: {
    type: Object,
    default: () => ({
      x: 60,
      y: 65,
      fontSize: 45
    })
  }
})

// Computed property to get the current clef position
const clefPosition = computed(() => {
  return props.useTrebleClef ? props.trebleClefPosition : props.bassClefPosition
})
</script>

<style scoped>
.staff {
  background-color: white;
  width: 100%;
  height: auto;
}
</style>
