import { ref, computed, watch } from 'vue'
import { TREBLE_NOTES, BASS_NOTES, NOTE_POSITIONS, NOTE_TO_SOLFEGE, VALID_NOTES } from '../constants/notes.js'

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
    return useTrebleClef.value ? TREBLE_NOTES : BASS_NOTES
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
    if (currentExpectedNote.value && guessedNote === currentExpectedNote.value.note) {
      showButtonFeedback(guessedNote, true)
      displayNextNote()
    } else if (VALID_NOTES.includes(guessedNote)) {
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
      resetGame()
    } else {
      showAllNotes.value = true
      const noteTypes = currentNoteTypes.value
      allNotesWithLabels.value = noteTypes.map((noteType, index) => ({
        ...noteType,
        x: 120 + (index * 35),
        id: `all-${index}`,
        displayName: useSolfege.value ? NOTE_TO_SOLFEGE[noteType.note] : noteType.note
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
