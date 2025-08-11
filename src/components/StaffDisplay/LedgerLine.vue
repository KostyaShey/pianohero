<template>
  <line v-if="note.needsLedgerLine && note.ledgerLinePosition" 
        :x1="note.x - 12" :x2="note.x + 12" 
        :y1="note.ledgerLinePosition" :y2="note.ledgerLinePosition" 
        stroke="#000" stroke-width="1"/>
</template>

<script setup>
defineProps({
  note: {
    type: Object,
    required: true
  }
})
</script>
