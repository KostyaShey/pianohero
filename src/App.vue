<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { 
  NOTE_POSITIONS, 
  TREBLE_NOTES, 
  BASS_NOTES, 
  MIDI_NOTE_TO_LETTER, 
  VALID_NOTES,
  getNotesByClef,
  getDisplayName,
  getButtonNames,
  getLedgerLinePositions
} from './constants/notes.js'

// Array to hold displayed notes
const displayedNotes = ref([])

// Mobile and orientation detection
const isMobileOrTablet = ref(false)
const isLandscape = ref(true)
const showOrientationMessage = ref(false)

// Function to detect mobile or tablet
const detectMobileOrTablet = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  const isTablet = /ipad|android(?!.*mobile)|tablet|playbook|silk/i.test(userAgent)
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  return isMobile || isTablet || hasTouchScreen
}

// Function to check orientation
const checkOrientation = () => {
  if (isMobileOrTablet.value) {
    isLandscape.value = window.innerWidth > window.innerHeight
    showOrientationMessage.value = !isLandscape.value
  } else {
    showOrientationMessage.value = false
  }
}

// Handle orientation change
const handleOrientationChange = () => {
  // Small delay to ensure dimensions are updated
  setTimeout(checkOrientation, 100)
}

// Current position index
const currentPositionIndex = ref(0)

// Maximum number of notes to display
const maxNotes = NOTE_POSITIONS.length

// Current expected note (the one the user should guess)
const currentExpectedNote = ref(null)

// Button feedback state
const buttonFeedback = ref({})

// MIDI support variables
const midiAccess = ref(null)
const midiSupported = ref(false)

// Note naming system toggle (true = solfège, false = letters)
const useSolfege = ref(true)

// Clef toggle (true = treble, false = bass)
const useTrebleClef = ref(true)

// Get current note types based on clef
const getCurrentNoteTypes = () => {
  return getNotesByClef(useTrebleClef.value ? 'treble' : 'bass')
}

// Get all display names for buttons
const getButtonNamesForCurrentSystem = () => {
  return getButtonNames(useSolfege.value)
}

// Show all notes feature
const showAllNotes = ref(false)
const allNotesWithLabels = ref([])

// Reset game when clef changes
const resetGameForClefChange = () => {
  displayedNotes.value = []
  currentPositionIndex.value = 0
  currentExpectedNote.value = null
  showAllNotes.value = false
  allNotesWithLabels.value = []
  displayNextNote()
}

// Toggle show all notes
const toggleShowAllNotes = () => {
  if (showAllNotes.value) {
    // Second press - reset the game
    showAllNotes.value = false
    allNotesWithLabels.value = []
    displayedNotes.value = []
    currentPositionIndex.value = 0
    currentExpectedNote.value = null
    displayNextNote()
  } else {
    // First press - show all notes
    showAllNotes.value = true
    const currentNoteTypes = getCurrentNoteTypes()
    allNotesWithLabels.value = currentNoteTypes.map((noteObj, index) => ({
      ...noteObj,
      x: 120 + (index * 35), // Spread notes across the staff
      id: `all-${index}`,
      displayName: getDisplayName(noteObj, useSolfege.value)
    }))
  }
}

// Fullscreen functionality
const isFullscreen = ref(false)

const toggleFullscreen = async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      isFullscreen.value = true
    } else {
      await document.exitFullscreen()
      isFullscreen.value = false
    }
  } catch (error) {
    console.warn('Fullscreen not supported or failed:', error)
  }
}

// Listen for fullscreen changes
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

// Wake Lock functionality to prevent screen from turning off
const isWakeLockActive = ref(false)
const wakeLock = ref(null)
const isWakeLockSupported = ref(false)

// Check if Wake Lock API is supported
const checkWakeLockSupport = () => {
  isWakeLockSupported.value = 'wakeLock' in navigator
}

const toggleWakeLock = async () => {
  if (!isWakeLockSupported.value) {
    console.warn('Wake Lock API not supported')
    return
  }

  try {
    if (!isWakeLockActive.value) {
      // Request wake lock
      wakeLock.value = await navigator.wakeLock.request('screen')
      isWakeLockActive.value = true
      console.log('Wake lock activated')
      
      // Listen for wake lock release
      wakeLock.value.addEventListener('release', () => {
        console.log('Wake lock released')
        isWakeLockActive.value = false
        wakeLock.value = null
      })
    } else {
      // Release wake lock
      if (wakeLock.value) {
        await wakeLock.value.release()
        wakeLock.value = null
        isWakeLockActive.value = false
        console.log('Wake lock manually released')
      }
    }
  } catch (error) {
    console.warn('Wake lock failed:', error)
    isWakeLockActive.value = false
    wakeLock.value = null
  }
}

// Handle visibility change to re-request wake lock when page becomes visible
const handleVisibilityChange = async () => {
  if (document.visibilityState === 'visible' && isWakeLockActive.value && !wakeLock.value) {
    try {
      wakeLock.value = await navigator.wakeLock.request('screen')
      console.log('Wake lock re-activated after visibility change')
    } catch (error) {
      console.warn('Failed to re-activate wake lock:', error)
      isWakeLockActive.value = false
    }
  }
}

// Function to generate a random note
const generateRandomNote = () => {
  const currentNoteTypes = getCurrentNoteTypes()
  const randomIndex = Math.floor(Math.random() * currentNoteTypes.length)
  return currentNoteTypes[randomIndex]
}

// Function to show button feedback
const showButtonFeedback = (noteLetter, isCorrect) => {
  buttonFeedback.value[noteLetter] = isCorrect ? 'correct' : 'incorrect'
  
  // Clear feedback after 500ms
  setTimeout(() => {
    buttonFeedback.value[noteLetter] = null
  }, 250)
}

// Function to display the next note
const displayNextNote = () => {
  // If we've reached the maximum number of notes, clear all and start over
  if (currentPositionIndex.value >= maxNotes) {
    displayedNotes.value = []
    currentPositionIndex.value = 0
  }
  
  // Generate a new random note
  const selectedNoteObj = generateRandomNote()
  
  // Create a new note at the current position
  const newNote = {
    ...selectedNoteObj,
    x: NOTE_POSITIONS[currentPositionIndex.value],
    id: Date.now() // unique id for the note
  }
  
  // Add the new note to the displayed notes array
  displayedNotes.value.push(newNote)
  
  // Set this as the expected note
  currentExpectedNote.value = newNote
  
  // Move to the next position
  currentPositionIndex.value++
}

// Function to handle note guesses (from both buttons and MIDI)
const handleNoteGuess = (guessedNote) => {
  console.log(`Note guess received: ${guessedNote}`)
  console.log(`Expected note: ${currentExpectedNote.value?.letterName}`)
  
  if (currentExpectedNote.value && guessedNote === currentExpectedNote.value.letterName) {
    // Correct guess! Show positive feedback and display the next note
    console.log(`✅ Correct! ${guessedNote} matches ${currentExpectedNote.value.letterName}`)
    showButtonFeedback(guessedNote, true)
    displayNextNote()
  } else if (VALID_NOTES.includes(guessedNote)) {
    // Incorrect guess! Show negative feedback (only for valid notes)
    console.log(`❌ Incorrect! ${guessedNote} does not match ${currentExpectedNote.value?.letterName}`)
    showButtonFeedback(guessedNote, false)
  }
}

// MIDI message handler
const handleMidiMessage = (message) => {
  const [command, note, velocity] = message.data
  
  // Log all MIDI messages for debugging
  console.log(`MIDI Message: Command=${command}, Note=${note}, Velocity=${velocity}`)
  
  // Only handle note on messages (144) with velocity > 0
  if (command === 144 && velocity > 0) {
    const noteLetter = MIDI_NOTE_TO_LETTER[note]
    console.log(`MIDI Note ${note} mapped to letter: ${noteLetter}`)
    
    if (noteLetter && VALID_NOTES.includes(noteLetter)) {
      console.log(`Playing note: ${noteLetter}`)
      handleNoteGuess(noteLetter)
    } else {
      console.log(`Note ${noteLetter} not in valid range or not found in mapping`)
    }
  }
}

// Initialize MIDI
const initializeMidi = async () => {
  if ('requestMIDIAccess' in navigator) {
    try {
      console.log('Requesting MIDI access...')
      midiAccess.value = await navigator.requestMIDIAccess()
      midiSupported.value = true
      
      console.log('MIDI access granted')
      console.log(`Found ${midiAccess.value.inputs.size} MIDI input device(s)`)
      
      // Connect to all MIDI inputs
      for (const input of midiAccess.value.inputs.values()) {
        console.log(`Connecting to MIDI input: ${input.name}`)
        input.onmidimessage = handleMidiMessage
      }
      
      // Handle new MIDI device connections
      midiAccess.value.onstatechange = (event) => {
        console.log(`MIDI device state changed: ${event.port.name} - ${event.port.state}`)
        if (event.port.type === 'input' && event.port.state === 'connected') {
          console.log(`New MIDI input connected: ${event.port.name}`)
          event.port.onmidimessage = handleMidiMessage
        }
      }
      
    } catch (error) {
      console.warn('MIDI access denied or failed:', error)
      midiSupported.value = false
    }
  } else {
    console.warn('Web MIDI API not supported in this browser')
    midiSupported.value = false
  }
}

// Start the game when the component mounts
onMounted(async () => {
  // Initialize mobile detection
  isMobileOrTablet.value = detectMobileOrTablet()
  checkOrientation()
  
  // Check wake lock support
  checkWakeLockSupport()
  
  // Add orientation change listeners
  window.addEventListener('orientationchange', handleOrientationChange)
  window.addEventListener('resize', handleOrientationChange)
  
  // Add fullscreen change listener
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  
  // Add visibility change listener for wake lock
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  await initializeMidi()
  displayNextNote()
})

// Watch for clef changes and reset game
watch(useTrebleClef, () => {
  resetGameForClefChange()
})

// Cleanup MIDI connections when component unmounts
onUnmounted(() => {
  if (midiAccess.value) {
    for (const input of midiAccess.value.inputs.values()) {
      input.onmidimessage = null
    }
  }
  
  // Release wake lock if active
  if (wakeLock.value) {
    wakeLock.value.release()
    wakeLock.value = null
    isWakeLockActive.value = false
  }
  
  // Remove orientation change listeners
  window.removeEventListener('orientationchange', handleOrientationChange)
  window.removeEventListener('resize', handleOrientationChange)
  
  // Remove fullscreen change listener
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  
  // Remove visibility change listener
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <div class="piano-hero">
    <!-- Orientation Message for Mobile/Tablet in Portrait Mode -->
    <div v-if="showOrientationMessage" class="orientation-message">
      <div class="orientation-content">
        <div class="rotate-icon">📱↻</div>
        <h2>Please turn your device in landscape mode</h2>
        <p>This app is optimized for landscape orientation</p>
      </div>
    </div>
    
    <!-- Main App UI (hidden when orientation message is shown) -->
    <template v-else>
      <div class="staff-container">
        <!-- Top Controls Row -->
        <div class="top-controls">
          <!-- Clef Toggle -->
          <div class="clef-toggle">
            <label class="toggle-container">
              <span>Bass</span>
              <input type="checkbox" v-model="useTrebleClef" class="toggle-checkbox">
              <span class="toggle-slider"></span>
              <span>Treble</span>
            </label>
          </div>
          
          <!-- Note Naming Toggle -->
          <div class="naming-toggle">
            <label class="toggle-container">
              <span>Letters</span>
              <input type="checkbox" v-model="useSolfege" class="toggle-checkbox">
              <span class="toggle-slider"></span>
              <span>Solfège</span>
            </label>
          </div>
          
          <!-- MIDI Status Indicator -->
          <div class="midi-status-internal">
            <span v-if="midiSupported" class="midi-connected">🎹 MIDI Ready</span>
            <span v-else class="midi-disconnected">🎹 MIDI Not Available</span>
          </div>
        </div>
      
      <!-- Staff lines -->
      <svg class="staff" width="100%" height="150" viewBox="0 0 800 150" preserveAspectRatio="xMidYMid meet">
        <!-- Five main staff lines -->
        <line v-for="i in 5" :key="i" 
              :x1="50" :x2="750" 
              :y1="40 + (i-1) * 10" :y2="40 + (i-1) * 10" 
              stroke="#000" stroke-width="1"/>
        
        <!-- Clef symbol -->
        <text x="60" y="65" font-family="serif" font-size="40" fill="#000">
          {{ useTrebleClef ? '𝄞' : '𝄢' }}
        </text>
        
        <!-- Individual ledger lines for notes that need them -->
        <g v-for="note in displayedNotes" :key="`ledger-${note.id}`">
          <!-- Render ledger line if note needs one -->
          <line v-if="note.needsLedgerLine && note.ledgerLinePosition" 
                :x1="note.x - 12" :x2="note.x + 12" 
                :y1="note.ledgerLinePosition" :y2="note.ledgerLinePosition" 
                stroke="#000" stroke-width="1"/>
        </g>
        
        <!-- Displayed notes (game notes) -->
        <g v-if="!showAllNotes" v-for="note in displayedNotes" :key="note.id">
          <!-- Note head -->
          <ellipse :cx="note.x" :cy="note.position" 
                   rx="8" ry="6" 
                   fill="#000" 
                   transform="rotate(-20)" 
                   :transform-origin="`${note.x} ${note.position}`"/>
        </g>
        
        <!-- All notes display (when showing all notes) -->
        <g v-if="showAllNotes" v-for="note in allNotesWithLabels" :key="note.id">
          <!-- Individual ledger lines for all notes -->
          <line v-if="note.needsLedgerLine && note.ledgerLinePosition" 
                :x1="note.x - 12" :x2="note.x + 12" 
                :y1="note.ledgerLinePosition" :y2="note.ledgerLinePosition" 
                stroke="#000" stroke-width="1"/>
          
          <!-- Note head -->
          <ellipse :cx="note.x" :cy="note.position" 
                   rx="8" ry="6" 
                   fill="#000" 
                   transform="rotate(-20)" 
                   :transform-origin="`${note.x} ${note.position}`"/>
          
          <!-- Note label -->
          <text :x="note.x - 5" :y="note.position + 25" 
                font-family="Arial" font-size="12" fill="#666" text-anchor="middle">
            {{ note.displayName }}
          </text>
        </g>
      </svg>
      
      <!-- Show All Notes Button -->
      <button class="show-all-button" @click="toggleShowAllNotes">
        {{ showAllNotes ? 'Hide notes' : 'Show notes' }}
      </button>
      
      <!-- Fullscreen Button -->
      <button class="fullscreen-button" @click="toggleFullscreen" :title="isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'">
        <span v-if="isFullscreen">⤪</span>
        <span v-else>⤢</span>
      </button>
      
      <!-- Wake Lock Button -->
      <button v-if="isWakeLockSupported" 
              class="wake-lock-button" 
              @click="toggleWakeLock" 
              :title="isWakeLockActive ? 'Allow screen to sleep' : 'Keep screen awake'"
              :class="{ 'active': isWakeLockActive }">
        <span v-if="isWakeLockActive">🔒</span>
        <span v-else>🔓</span>
      </button>
      
      <!-- Note buttons -->
      <div class="note-buttons">
        <button v-for="noteData in getButtonNamesForCurrentSystem()" 
                :key="noteData.letter" 
                :class="[
                  'note-button',
                  {
                    'correct-feedback': buttonFeedback[noteData.letter] === 'correct',
                    'incorrect-feedback': buttonFeedback[noteData.letter] === 'incorrect'
                  }
                ]"
                @click="handleNoteGuess(noteData.letter)">
          {{ noteData.display }}
        </button>
      </div>
    </div>
    </template>
  </div>
</template>

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

.orientation-message {
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.orientation-content {
  max-width: 400px;
}

.rotate-icon {
  font-size: 60px;
  margin-bottom: 20px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orientation-message h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.orientation-message p {
  font-size: 16px;
  color: #666;
  margin: 0;
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

.staff {
  background-color: white;
  width: 100%;
  height: auto;
}

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

.midi-status {
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
}

.midi-connected {
  color: #4CAF50;
}

.midi-disconnected {
  color: #999;
}

.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  gap: 20px;
}

.clef-toggle,
.naming-toggle {
  flex: 0 0 auto;
}

.midi-status-internal {
  font-size: 14px;
  font-weight: bold;
  flex: 0 0 auto;
}

.toggle-container {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: bold;
}

.toggle-checkbox {
  display: none;
}

.toggle-slider {
  position: relative;
  width: 50px;
  height: 24px;
  background-color: #ccc;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-slider::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-checkbox:checked + .toggle-slider {
  background-color: #4CAF50;
}

.toggle-checkbox:checked + .toggle-slider::before {
  transform: translateX(26px);
}

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

.wake-lock-button {
  position: absolute;
  bottom: 20px;
  left: 70px;
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

.wake-lock-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.wake-lock-button:active {
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateY(0);
}

.wake-lock-button.active {
  background-color: #4CAF50;
  border-color: #4CAF50;
  color: white;
}

.wake-lock-button.active:hover {
  background-color: #45a049;
  border-color: #45a049;
}
</style>
