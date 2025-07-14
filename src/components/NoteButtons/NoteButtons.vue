<template>
  <div class="note-buttons">
    <button v-for="noteData in buttonNames" 
            :key="noteData.letter" 
            :class="[
              'note-button',
              {
                'correct-feedback': buttonFeedback[noteData.letter] === 'correct',
                'incorrect-feedback': buttonFeedback[noteData.letter] === 'incorrect'
              }
            ]"
            @click="$emit('noteGuess', noteData.letter)">
      {{ noteData.display }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNoteDisplay } from '../composables/useNoteDisplay.js'

const props = defineProps({
  useSolfege: {
    type: Boolean,
    required: true
  },
  buttonFeedback: {
    type: Object,
    required: true
  }
})

defineEmits(['noteGuess'])

const { getButtonNames } = useNoteDisplay(computed(() => props.useSolfege))

const buttonNames = computed(() => getButtonNames())
</script>

<style scoped>
.note-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 60px;
  gap: 10px;
}

.note-button {
  flex: 1;
  padding: 12px 8px;
  font-size: 18px;
  font-weight: bold;
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.note-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.note-button:active {
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateY(0);
}

.correct-feedback {
  background-color: #4CAF50 !important;
  color: white !important;
  transform: scale(1.1) !important;
  transition: all 0.2s ease !important;
}

.incorrect-feedback {
  background-color: #f44336 !important;
  color: white !important;
  transform: scale(0.9) !important;
  transition: all 0.2s ease !important;
}
</style>
