import { ref, computed, watch } from 'vue'
import { 
  NOTE_POSITIONS, 
  VALID_NOTES,
  getNotesByClef,
  getDisplayName,
  getButtonNames
} from '../constants/notes.js'

export function useGameState() {
  // State
  const useTrebleClef = ref(true)
  const useSolfege = ref(true)
  const displayedNotes = ref([])
  const currentPositionIndex = ref(0)
  const currentExpectedNote = ref(null)
  const buttonFeedback = ref({})
  const showAllNotes = ref(false)
  const allNotesWithLabels = ref([])
  
  // Constants
  const maxNotes = NOTE_POSITIONS.length
  
  // Computed
  const currentNoteTypes = computed(() => {
    return getNotesByClef(useTrebleClef.value ? 'treble' : 'bass')
  })
  
  // Methods
  const generateRandomNote = () => {
    const noteTypes = currentNoteTypes.value
    const randomIndex = Math.floor(Math.random() * noteTypes.length)
    return noteTypes[randomIndex]
  }
  
  const showButtonFeedback = (noteLetter, isCorrect) => {
    buttonFeedback.value[noteLetter] = isCorrect ? 'correct' : 'incorrect'
    
    setTimeout(() => {
      buttonFeedback.value[noteLetter] = null
    }, 250)
  }
  
  const displayNextNote = () => {
    if (currentPositionIndex.value >= maxNotes) {
      displayedNotes.value = []
      currentPositionIndex.value = 0
    }
    
    const selectedNoteType = generateRandomNote()
    const newNote = {
      ...selectedNoteType,
      x: NOTE_POSITIONS[currentPositionIndex.value],
      id: Date.now()
    }
    
    displayedNotes.value.push(newNote)
    currentExpectedNote.value = newNote
    currentPositionIndex.value++
  }
  
  const handleNoteGuess = (guessedNote) => {
    console.log(`Note guess received: ${guessedNote}`)
    console.log(`Expected note: ${currentExpectedNote.value?.letterName}`)
    
    if (currentExpectedNote.value && guessedNote === currentExpectedNote.value.letterName) {
      console.log(`✅ Correct! ${guessedNote} matches ${currentExpectedNote.value.letterName}`)
      showButtonFeedback(guessedNote, true)
      displayNextNote()
    } else if (VALID_NOTES.includes(guessedNote)) {
      console.log(`❌ Incorrect! ${guessedNote} does not match ${currentExpectedNote.value?.letterName}`)
      showButtonFeedback(guessedNote, false)
    }
  }
  
  const resetGame = () => {
    displayedNotes.value = []
    currentPositionIndex.value = 0
    currentExpectedNote.value = null
    showAllNotes.value = false
    allNotesWithLabels.value = []
    displayNextNote()
  }
  
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
      const noteTypes = currentNoteTypes.value
      allNotesWithLabels.value = noteTypes.map((noteObj, index) => ({
        ...noteObj,
        x: 120 + (index * 35), // Spread notes across the staff
        id: `all-${index}`,
        displayName: getDisplayName(noteObj, useSolfege.value)
      }))
    }
  }
  
  // Watch for clef changes
  watch(useTrebleClef, resetGame)
  
  return {
    // State
    useTrebleClef,
    useSolfege,
    displayedNotes,
    currentPositionIndex,
    currentExpectedNote,
    buttonFeedback,
    showAllNotes,
    allNotesWithLabels,
    
    // Computed
    currentNoteTypes,
    
    // Methods
    displayNextNote,
    handleNoteGuess,
    resetGame,
    toggleShowAllNotes,
    showButtonFeedback
  }
}
