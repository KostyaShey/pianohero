import { ref, onMounted, onUnmounted } from 'vue'
import { MIDI_NOTE_TO_LETTER, VALID_NOTES } from '../constants/notes.js'

export function useMidi() {
  const midiAccess = ref(null)
  const midiSupported = ref(false)
  
  let messageHandler = null
  
  const handleMidiMessage = (message) => {
    const [command, note, velocity] = message.data
    
    console.log(`MIDI Message: Command=${command}, Note=${note}, Velocity=${velocity}`)
    
    // Only handle note on messages (144) with velocity > 0
    if (command === 144 && velocity > 0) {
      const noteLetter = MIDI_NOTE_TO_LETTER[note]
      console.log(`MIDI Note ${note} mapped to letter: ${noteLetter}`)
      
      if (noteLetter && VALID_NOTES.includes(noteLetter)) {
        console.log(`Playing note: ${noteLetter}`)
        if (messageHandler) {
          messageHandler(noteLetter)
        }
      } else {
        console.log(`Note ${noteLetter} not in valid range or not found in mapping`)
      }
    }
  }
  
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
  
  const setMessageHandler = (handler) => {
    messageHandler = handler
  }
  
  const cleanup = () => {
    if (midiAccess.value) {
      for (const input of midiAccess.value.inputs.values()) {
        input.onmidimessage = null
      }
    }
    messageHandler = null
  }
  
  onMounted(initializeMidi)
  onUnmounted(cleanup)
  
  return {
    midiSupported,
    setMessageHandler,
    cleanup
  }
}
