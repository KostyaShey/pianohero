import { ref, onMounted, onUnmounted } from 'vue'

export function useWakeLock() {
  const isWakeLockActive = ref(false)
  const wakeLock = ref(null)
  const isWakeLockSupported = ref(false)

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

  const cleanup = () => {
    if (wakeLock.value) {
      wakeLock.value.release()
      wakeLock.value = null
      isWakeLockActive.value = false
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }

  onMounted(() => {
    checkWakeLockSupport()
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(cleanup)

  return {
    isWakeLockActive,
    isWakeLockSupported,
    toggleWakeLock
  }
}
