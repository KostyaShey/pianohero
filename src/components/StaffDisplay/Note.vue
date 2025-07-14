<template>
  <g>
    <!-- Note head -->
    <ellipse :cx="note.x" :cy="note.position" 
             rx="8" ry="6" 
             fill="#000" 
             transform="rotate(-20)" 
             :transform-origin="`${note.x} ${note.position}`"/>
    
    <!-- Note label (for show all mode) -->
    <text v-if="showLabel && note.displayName" 
          :x="note.x - 5" :y="note.position + 25" 
          font-family="Arial" font-size="12" fill="#666" text-anchor="middle">
      {{ note.displayName }}
    </text>
  </g>
</template>

<script setup>
defineProps({
  note: {
    type: Object,
    required: true
  },
  showLabel: {
    type: Boolean,
    default: false
  }
})
</script>
