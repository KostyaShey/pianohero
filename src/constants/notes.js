// Note positioning constants
export const NOTE_POSITIONS = [150, 230, 310, 390, 470, 550, 630, 710]

// Treble clef note definitions
export const TREBLE_NOTES = [
  { note: 'C', position: 90, octave: 4 },  // C4 - one ledger line below
  { note: 'D', position: 85, octave: 4 },  // D4 - below the staff
  { note: 'E', position: 80, octave: 4 },  // E4 - on the first line
  { note: 'F', position: 75, octave: 4 },  // F4 - between first and second line
  { note: 'G', position: 70, octave: 4 },  // G4 - on the second line
  { note: 'A', position: 65, octave: 4 },  // A4 - between second and third line
  { note: 'B', position: 60, octave: 4 },  // B4 - on the third line
  { note: 'C', position: 55, octave: 5 },  // C5 - between third and fourth line
  { note: 'D', position: 50, octave: 5 },  // D5 - on the fourth line
  { note: 'E', position: 45, octave: 5 },  // E5 - between fourth and fifth line
  { note: 'F', position: 40, octave: 5 },  // F5 - on the fifth line
  { note: 'G', position: 35, octave: 5 },  // G5 - above the staff
  { note: 'A', position: 30, octave: 5 },  // A5 - above the staff
  { note: 'B', position: 25, octave: 5 },  // B5 - above the staff
  { note: 'C', position: 20, octave: 6 }   // C6 - one ledger line above
]

// Bass clef note definitions
export const BASS_NOTES = [
  { note: 'C', position: 30, octave: 4 },  // C4 - above the staff
  { note: 'B', position: 35, octave: 3 },  // B3 - above the staff
  { note: 'A', position: 40, octave: 3 },  // A3 - on the fifth line
  { note: 'G', position: 45, octave: 3 },  // G3 - between fourth and fifth line
  { note: 'F', position: 50, octave: 3 },  // F3 - on the fourth line
  { note: 'E', position: 55, octave: 3 },  // E3 - between third and fourth line
  { note: 'D', position: 60, octave: 3 },  // D3 - on the third line
  { note: 'C', position: 65, octave: 3 },  // C3 - between second and third line
  { note: 'B', position: 70, octave: 2 },  // B2 - on the second line
  { note: 'A', position: 75, octave: 2 },  // A2 - between first and second line
  { note: 'G', position: 80, octave: 2 },  // G2 - on the first line
  { note: 'F', position: 85, octave: 2 },  // F2 - below the staff
  { note: 'E', position: 90, octave: 2 },  // E2 - below the staff
  { note: 'D', position: 95, octave: 2 },  // D2 - below the staff
  { note: 'C', position: 100, octave: 2 }  // C2 - one ledger line below
]

// Solfège mapping
export const NOTE_TO_SOLFEGE = {
  'C': 'do',
  'D': 're', 
  'E': 'mi',
  'F': 'fa',
  'G': 'sol',
  'A': 'la',
  'B': 'ti'
}

// MIDI note to letter mapping
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

// Ledger line positions that need special rendering
export const LEDGER_LINE_POSITIONS = [20, 30, 90, 95, 100]
