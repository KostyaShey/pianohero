# Clef Symbol Positioning Guide

## Overview
The Piano Hero app now supports manual positioning of both treble and bass clef symbols. You can adjust their position, size, and alignment to perfectly fit your visual preferences.

## How to Adjust Clef Positioning

The clef positioning is controlled in `src/App.vue` through two reactive objects:

### Treble Clef Position
```javascript
const trebleClefPosition = ref({
  x: 60,        // Horizontal position (pixels from left)
  y: 70,        // Vertical position (pixels from top)
  fontSize: 50  // Font size of the clef symbol
})
```

### Bass Clef Position
```javascript
const bassClefPosition = ref({
  x: 60,        // Horizontal position (pixels from left)
  y: 65,        // Vertical position (pixels from top)
  fontSize: 45  // Font size of the clef symbol
})
```

## Positioning Tips

### X Position (Horizontal)
- **Lower values** (e.g., 50): Move clef closer to the left edge
- **Higher values** (e.g., 80): Move clef further from the left edge
- **Recommended range**: 50-80 for optimal appearance

### Y Position (Vertical)
- **Lower values** (e.g., 60): Move clef higher on the staff
- **Higher values** (e.g., 80): Move clef lower on the staff
- **Staff lines are at**: y=40, 50, 60, 70, 80

### Font Size
- **Treble clef**: Usually looks good between 45-55
- **Bass clef**: Usually looks good between 40-50
- **Note**: Bass clef often looks better slightly smaller than treble

## Example Adjustments

### Make Treble Clef Larger and More Centered
```javascript
const trebleClefPosition = ref({
  x: 65,
  y: 70,
  fontSize: 55
})
```

### Position Bass Clef Lower on Staff
```javascript
const bassClefPosition = ref({
  x: 60,
  y: 75,
  fontSize: 45
})
```

### Compact Clef Symbols
```javascript
const trebleClefPosition = ref({
  x: 55,
  y: 70,
  fontSize: 45
})

const bassClefPosition = ref({
  x: 55,
  y: 65,
  fontSize: 40
})
```

## Staff Reference
The staff has these dimensions for reference:
- **Width**: 800px viewBox (50px to 750px usable area)
- **Height**: 150px viewBox
- **Staff lines**: 5 horizontal lines at y=40, 50, 60, 70, 80
- **Line spacing**: 10px between each staff line

## Visual Alignment Tips
1. **Treble clef** typically sits with its center around the G line (y=70)
2. **Bass clef** typically sits with its center around the F line (y=60-65)
3. Both clefs should have enough space from the left edge but not interfere with notes
4. Keep font sizes proportional - bass clef is often 5-10px smaller than treble

## Live Testing
After making changes, the development server will automatically reload and you can see your adjustments immediately. Use the clef toggle button to switch between treble and bass to test both positions.
