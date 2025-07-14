<template>
  <g v-if="needsLedgerLine">
    <line :x1="note.x - 12" :x2="note.x + 12" 
          :y1="note.position" :y2="note.position" 
          stroke="#000" stroke-width="1"/>
  </g>
</template>

<script setup>
import { computed } from 'vue'
import { LEDGER_LINE_POSITIONS } from '../../constants/notes.js'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const needsLedgerLine = computed(() => {
  return LEDGER_LINE_POSITIONS.includes(props.note.position)
})
</script>
