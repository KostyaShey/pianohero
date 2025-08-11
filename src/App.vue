<template>
  <div class="piano-hero">
    <!-- Orientation Message for Mobile/Tablet in Portrait Mode -->
    <OrientationMessage v-if="showOrientationMessage" />
    
    <!-- Main App UI (hidden when orientation message is shown) -->
    <template v-else>
      <div class="staff-container">
        <!-- Top Controls Row -->
        <TopControls 
          v-model:use-treble-clef="useTrebleClef"
          v-model:use-solfege="useSolfege"
          :midi-supported="midiSupported"
        />
      
        <!-- Staff Display -->
        <StaffDisplay 
          :use-treble-clef="useTrebleClef"
          :displayed-notes="displayedNotes"
          :show-all-notes="showAllNotes"
          :all-notes-with-labels="allNotesWithLabels"
        />
        
        <!-- Show All Notes Button -->
        <ShowAllNotesButton 
          :show-all-notes="showAllNotes"
          @toggle="toggleShowAllNotes"
        />
        
        <!-- Fullscreen Button -->
        <FullscreenButton 
          :is-fullscreen="isFullscreen"
          @toggle="toggleFullscreen"
        />
        
        <!-- Wake Lock Button -->
        <WakeLockButton 
          :is-wake-lock-supported="isWakeLockSupported"
          :is-wake-lock-active="isWakeLockActive"
          @toggle="toggleWakeLock"
        />
        
        <!-- Note buttons -->
        <NoteButtons 
          :use-solfege="useSolfege"
          :button-feedback="buttonFeedback"
          @note-guess="handleNoteGuess"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Components
import OrientationMessage from './components/OrientationMessage.vue'
import TopControls from './components/Controls/TopControls.vue'
import StaffDisplay from './components/StaffDisplay/StaffDisplay.vue'
import ShowAllNotesButton from './components/GameUI/ShowAllNotesButton.vue'
import FullscreenButton from './components/GameUI/FullscreenButton.vue'
import WakeLockButton from './components/GameUI/WakeLockButton.vue'
import NoteButtons from './components/NoteButtons/NoteButtons.vue'

// Composables
import { useGameState } from './composables/useGameState.js'
import { useMidi } from './composables/useMidi.js'
import { useOrientation } from './composables/useOrientation.js'
import { useFullscreen } from './composables/useFullscreen.js'
import { useWakeLock } from './composables/useWakeLock.js'

// Game state
const {
  useTrebleClef,
  useSolfege,
  displayedNotes,
  buttonFeedback,
  showAllNotes,
  allNotesWithLabels,
  displayNextNote,
  handleNoteGuess,
  toggleShowAllNotes
} = useGameState()

// MIDI support
const { midiSupported, setMessageHandler } = useMidi()

// Orientation handling
const { showOrientationMessage } = useOrientation()

// Fullscreen support
const { isFullscreen, toggleFullscreen } = useFullscreen()

// Wake Lock support
const { isWakeLockActive, isWakeLockSupported, toggleWakeLock } = useWakeLock()

// Initialize the game
onMounted(() => {
  setMessageHandler(handleNoteGuess)
  displayNextNote()
})
</script>

<style scoped>
.piano-hero {
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.staff-container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 90vw;
  max-width: 800px;
  min-width: 320px;
  position: relative;
}
</style>
