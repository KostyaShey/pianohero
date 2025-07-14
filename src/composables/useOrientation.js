import { ref, onMounted, onUnmounted } from 'vue'

export function useOrientation() {
  const isMobileOrTablet = ref(false)
  const isLandscape = ref(true)
  const showOrientationMessage = ref(false)
  
  const detectMobileOrTablet = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    const isTablet = /ipad|android(?!.*mobile)|tablet|playbook|silk/i.test(userAgent)
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    return isMobile || isTablet || hasTouchScreen
  }
  
  const checkOrientation = () => {
    if (isMobileOrTablet.value) {
      isLandscape.value = window.innerWidth > window.innerHeight
      showOrientationMessage.value = !isLandscape.value
    } else {
      showOrientationMessage.value = false
    }
  }
  
  const handleOrientationChange = () => {
    setTimeout(checkOrientation, 100)
  }
  
  const initialize = () => {
    isMobileOrTablet.value = detectMobileOrTablet()
    checkOrientation()
    
    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)
  }
  
  const cleanup = () => {
    window.removeEventListener('orientationchange', handleOrientationChange)
    window.removeEventListener('resize', handleOrientationChange)
  }
  
  onMounted(initialize)
  onUnmounted(cleanup)
  
  return {
    isMobileOrTablet,
    isLandscape,
    showOrientationMessage
  }
}
