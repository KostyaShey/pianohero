import { computed } from 'vue'
import { NOTE_TO_SOLFEGE, VALID_NOTES } from '../constants/notes.js'

export function useNoteDisplay(useSolfege) {
  const getDisplayName = (note) => {
    return useSolfege.value ? NOTE_TO_SOLFEGE[note] : note
  }
  
  const getButtonNames = () => {
    return VALID_NOTES.map(letter => ({
      letter: letter,
      display: getDisplayName(letter)
    }))
  }
  
  return {
    getDisplayName,
    getButtonNames
  }
}
