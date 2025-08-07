// Note positioning constants for the staff
export const NOTE_POSITIONS = [150, 230, 310, 390, 470, 550, 630, 710]

// Helper function to get MIDI note number
const getMidiNoteNumber = (note, octave) => {
  const noteValues = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11 }
  return (octave + 1) * 12 + noteValues[note]
}

// Helper function to get solfège name
const getSolfegeName = (note) => {
  const solfegeMap = { 'C': 'do', 'D': 're', 'E': 'mi', 'F': 'fa', 'G': 'sol', 'A': 'la', 'B': 'ti' }
  return solfegeMap[note]
}

// Helper function to determine if ledger line is needed
const needsLedgerLine = (position) => {
  return [20, 30, 90, 95, 100].includes(position)
}

// Helper function to get staff placement description
const getStaffPlacement = (position, clef) => {
  if (clef === 'treble') {
    if (position === 90) return 'one ledger line below'
    if (position === 85) return 'below the staff'
    if (position === 80) return 'on the first line'
    if (position === 75) return 'between first and second line'
    if (position === 70) return 'on the second line'
    if (position === 65) return 'between second and third line'
    if (position === 60) return 'on the third line'
    if (position === 55) return 'between third and fourth line'
    if (position === 50) return 'on the fourth line'
    if (position === 45) return 'between fourth and fifth line'
    if (position === 40) return 'on the fifth line'
    if (position === 35) return 'above the staff'
    if (position === 30) return 'above the staff'
    if (position === 25) return 'above the staff'
    if (position === 20) return 'one ledger line above'
  } else {
    if (position === 30) return 'above the staff'
    if (position === 35) return 'above the staff'
    if (position === 40) return 'on the fifth line'
    if (position === 45) return 'between fourth and fifth line'
    if (position === 50) return 'on the fourth line'
    if (position === 55) return 'between third and fourth line'
    if (position === 60) return 'on the third line'
    if (position === 65) return 'between second and third line'
    if (position === 70) return 'on the second line'
    if (position === 75) return 'between first and second line'
    if (position === 80) return 'on the first line'
    if (position === 85) return 'below the staff'
    if (position === 90) return 'below the staff'
    if (position === 95) return 'below the staff'
    if (position === 100) return 'one ledger line below'
  }
  return 'unknown position'
}

// Treble clef note definitions with comprehensive properties
export const TREBLE_NOTES = [
  {
    note: 'C',
    octave: 4,
    position: 90,
    midiNumber: getMidiNoteNumber('C', 4),
    letterName: 'C',
    solfegeName: getSolfegeName('C'),
    fullName: 'C4',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(90),
    ledgerLinePosition: 90,
    staffPlacement: getStaffPlacement(90, 'treble'),
    frequency: 261.63
  },
  {
    note: 'D',
    octave: 4,
    position: 85,
    midiNumber: getMidiNoteNumber('D', 4),
    letterName: 'D',
    solfegeName: getSolfegeName('D'),
    fullName: 'D4',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(85),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(85, 'treble'),
    frequency: 293.66
  },
  {
    note: 'E',
    octave: 4,
    position: 80,
    midiNumber: getMidiNoteNumber('E', 4),
    letterName: 'E',
    solfegeName: getSolfegeName('E'),
    fullName: 'E4',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(80),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(80, 'treble'),
    frequency: 329.63
  },
  {
    note: 'F',
    octave: 4,
    position: 75,
    midiNumber: getMidiNoteNumber('F', 4),
    letterName: 'F',
    solfegeName: getSolfegeName('F'),
    fullName: 'F4',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(75),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(75, 'treble'),
    frequency: 349.23
  },
  {
    note: 'G',
    octave: 4,
    position: 70,
    midiNumber: getMidiNoteNumber('G', 4),
    letterName: 'G',
    solfegeName: getSolfegeName('G'),
    fullName: 'G4',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(70),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(70, 'treble'),
    frequency: 392.00
  },
  {
    note: 'A',
    octave: 4,
    position: 65,
    midiNumber: getMidiNoteNumber('A', 4),
    letterName: 'A',
    solfegeName: getSolfegeName('A'),
    fullName: 'A4',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(65),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(65, 'treble'),
    frequency: 440.00
  },
  {
    note: 'B',
    octave: 4,
    position: 60,
    midiNumber: getMidiNoteNumber('B', 4),
    letterName: 'B',
    solfegeName: getSolfegeName('B'),
    fullName: 'B4',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(60),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(60, 'treble'),
    frequency: 493.88
  },
  {
    note: 'C',
    octave: 5,
    position: 55,
    midiNumber: getMidiNoteNumber('C', 5),
    letterName: 'C',
    solfegeName: getSolfegeName('C'),
    fullName: 'C5',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(55),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(55, 'treble'),
    frequency: 523.25
  },
  {
    note: 'D',
    octave: 5,
    position: 50,
    midiNumber: getMidiNoteNumber('D', 5),
    letterName: 'D',
    solfegeName: getSolfegeName('D'),
    fullName: 'D5',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(50),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(50, 'treble'),
    frequency: 587.33
  },
  {
    note: 'E',
    octave: 5,
    position: 45,
    midiNumber: getMidiNoteNumber('E', 5),
    letterName: 'E',
    solfegeName: getSolfegeName('E'),
    fullName: 'E5',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(45),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(45, 'treble'),
    frequency: 659.25
  },
  {
    note: 'F',
    octave: 5,
    position: 40,
    midiNumber: getMidiNoteNumber('F', 5),
    letterName: 'F',
    solfegeName: getSolfegeName('F'),
    fullName: 'F5',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(40),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(40, 'treble'),
    frequency: 698.46
  },
  {
    note: 'G',
    octave: 5,
    position: 35,
    midiNumber: getMidiNoteNumber('G', 5),
    letterName: 'G',
    solfegeName: getSolfegeName('G'),
    fullName: 'G5',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(35),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(35, 'treble'),
    frequency: 783.99
  },
  {
    note: 'A',
    octave: 5,
    position: 30,
    midiNumber: getMidiNoteNumber('A', 5),
    letterName: 'A',
    solfegeName: getSolfegeName('A'),
    fullName: 'A5',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(30),
    ledgerLinePosition: 30,
    staffPlacement: getStaffPlacement(30, 'treble'),
    frequency: 880.00
  },
  {
    note: 'B',
    octave: 5,
    position: 25,
    midiNumber: getMidiNoteNumber('B', 5),
    letterName: 'B',
    solfegeName: getSolfegeName('B'),
    fullName: 'B5',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(25),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(25, 'treble'),
    frequency: 987.77
  },
  {
    note: 'C',
    octave: 6,
    position: 20,
    midiNumber: getMidiNoteNumber('C', 6),
    letterName: 'C',
    solfegeName: getSolfegeName('C'),
    fullName: 'C6',
    clef: 'treble',
    needsLedgerLine: needsLedgerLine(20),
    ledgerLinePosition: 20,
    staffPlacement: getStaffPlacement(20, 'treble'),
    frequency: 1046.50
  }
]

// Bass clef note definitions with comprehensive properties
export const BASS_NOTES = [
  {
    note: 'C',
    octave: 4,
    position: 30,
    midiNumber: getMidiNoteNumber('C', 4),
    letterName: 'C',
    solfegeName: getSolfegeName('C'),
    fullName: 'C4',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(30),
    ledgerLinePosition: 30,
    staffPlacement: getStaffPlacement(30, 'bass'),
    frequency: 261.63
  },
  {
    note: 'B',
    octave: 3,
    position: 35,
    midiNumber: getMidiNoteNumber('B', 3),
    letterName: 'B',
    solfegeName: getSolfegeName('B'),
    fullName: 'B3',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(35),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(35, 'bass'),
    frequency: 246.94
  },
  {
    note: 'A',
    octave: 3,
    position: 40,
    midiNumber: getMidiNoteNumber('A', 3),
    letterName: 'A',
    solfegeName: getSolfegeName('A'),
    fullName: 'A3',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(40),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(40, 'bass'),
    frequency: 220.00
  },
  {
    note: 'G',
    octave: 3,
    position: 45,
    midiNumber: getMidiNoteNumber('G', 3),
    letterName: 'G',
    solfegeName: getSolfegeName('G'),
    fullName: 'G3',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(45),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(45, 'bass'),
    frequency: 196.00
  },
  {
    note: 'F',
    octave: 3,
    position: 50,
    midiNumber: getMidiNoteNumber('F', 3),
    letterName: 'F',
    solfegeName: getSolfegeName('F'),
    fullName: 'F3',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(50),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(50, 'bass'),
    frequency: 174.61
  },
  {
    note: 'E',
    octave: 3,
    position: 55,
    midiNumber: getMidiNoteNumber('E', 3),
    letterName: 'E',
    solfegeName: getSolfegeName('E'),
    fullName: 'E3',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(55),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(55, 'bass'),
    frequency: 164.81
  },
  {
    note: 'D',
    octave: 3,
    position: 60,
    midiNumber: getMidiNoteNumber('D', 3),
    letterName: 'D',
    solfegeName: getSolfegeName('D'),
    fullName: 'D3',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(60),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(60, 'bass'),
    frequency: 146.83
  },
  {
    note: 'C',
    octave: 3,
    position: 65,
    midiNumber: getMidiNoteNumber('C', 3),
    letterName: 'C',
    solfegeName: getSolfegeName('C'),
    fullName: 'C3',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(65),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(65, 'bass'),
    frequency: 130.81
  },
  {
    note: 'B',
    octave: 2,
    position: 70,
    midiNumber: getMidiNoteNumber('B', 2),
    letterName: 'B',
    solfegeName: getSolfegeName('B'),
    fullName: 'B2',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(70),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(70, 'bass'),
    frequency: 123.47
  },
  {
    note: 'A',
    octave: 2,
    position: 75,
    midiNumber: getMidiNoteNumber('A', 2),
    letterName: 'A',
    solfegeName: getSolfegeName('A'),
    fullName: 'A2',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(75),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(75, 'bass'),
    frequency: 110.00
  },
  {
    note: 'G',
    octave: 2,
    position: 80,
    midiNumber: getMidiNoteNumber('G', 2),
    letterName: 'G',
    solfegeName: getSolfegeName('G'),
    fullName: 'G2',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(80),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(80, 'bass'),
    frequency: 98.00
  },
  {
    note: 'F',
    octave: 2,
    position: 85,
    midiNumber: getMidiNoteNumber('F', 2),
    letterName: 'F',
    solfegeName: getSolfegeName('F'),
    fullName: 'F2',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(85),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(85, 'bass'),
    frequency: 87.31
  },
  {
    note: 'E',
    octave: 2,
    position: 90,
    midiNumber: getMidiNoteNumber('E', 2),
    letterName: 'E',
    solfegeName: getSolfegeName('E'),
    fullName: 'E2',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(90),
    ledgerLinePosition: 90,
    staffPlacement: getStaffPlacement(90, 'bass'),
    frequency: 82.41
  },
  {
    note: 'D',
    octave: 2,
    position: 95,
    midiNumber: getMidiNoteNumber('D', 2),
    letterName: 'D',
    solfegeName: getSolfegeName('D'),
    fullName: 'D2',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(95),
    ledgerLinePosition: null,
    staffPlacement: getStaffPlacement(95, 'bass'),
    frequency: 73.42
  },
  {
    note: 'C',
    octave: 2,
    position: 100,
    midiNumber: getMidiNoteNumber('C', 2),
    letterName: 'C',
    solfegeName: getSolfegeName('C'),
    fullName: 'C2',
    clef: 'bass',
    needsLedgerLine: needsLedgerLine(100),
    ledgerLinePosition: 100,
    staffPlacement: getStaffPlacement(100, 'bass'),
    frequency: 65.41
  }
]

// Backward compatibility - Solfège mapping (now redundant but kept for reference)
export const NOTE_TO_SOLFEGE = {
  'C': 'do',
  'D': 're', 
  'E': 'mi',
  'F': 'fa',
  'G': 'sol',
  'A': 'la',
  'B': 'ti'
}

// MIDI note to letter mapping (updated to work with comprehensive note objects)
export const MIDI_NOTE_TO_LETTER = {
  // Bass clef range (C2 to C4)
  36: 'C', // C2
  37: 'C#',
  38: 'D', // D2
  39: 'D#',
  40: 'E', // E2
  41: 'F', // F2
  42: 'F#',
  43: 'G', // G2
  44: 'G#',
  45: 'A', // A2
  46: 'A#',
  47: 'B', // B2
  48: 'C', // C3
  49: 'C#',
  50: 'D', // D3
  51: 'D#',
  52: 'E', // E3
  53: 'F', // F3
  54: 'F#',
  55: 'G', // G3
  56: 'G#',
  57: 'A', // A3
  58: 'A#',
  59: 'B', // B3
  60: 'C', // C4
  // Treble clef range (C4 to C6)
  61: 'C#',
  62: 'D', // D4
  63: 'D#',
  64: 'E', // E4
  65: 'F', // F4
  66: 'F#',
  67: 'G', // G4
  68: 'G#',
  69: 'A', // A4
  70: 'A#',
  71: 'B', // B4
  72: 'C', // C5
  73: 'C#',
  74: 'D', // D5
  75: 'D#',
  76: 'E', // E5
  77: 'F', // F5
  78: 'F#',
  79: 'G', // G5
  80: 'G#',
  81: 'A', // A5
  82: 'A#',
  83: 'B', // B5
  84: 'C'  // C6
}

// Valid note letters
export const VALID_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// Utility functions for working with note objects
export const getNotesByClef = (clef) => {
  return clef === 'treble' ? TREBLE_NOTES : BASS_NOTES
}

export const getDisplayName = (noteObj, useSolfege) => {
  return useSolfege ? noteObj.solfegeName : noteObj.letterName
}

export const getButtonNames = (useSolfege) => {
  return VALID_NOTES.map(letter => ({
    letter: letter,
    display: useSolfege ? NOTE_TO_SOLFEGE[letter] : letter
  }))
}

// Get all unique ledger line positions that need rendering
export const getLedgerLinePositions = (notes) => {
  return [...new Set(notes
    .filter(note => note.needsLedgerLine && note.ledgerLinePosition)
    .map(note => note.ledgerLinePosition))]
}
