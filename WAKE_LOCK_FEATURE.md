# Wake Lock Feature

## Overview
Added a Wake Lock button next to the fullscreen button that prevents mobile phone screens from turning off while the app is in use. This is particularly useful for extended practice sessions.

## Features

### Wake Lock Button
- **Location**: Bottom left, next to the fullscreen button
- **Icons**: 
  - 🔓 (unlocked) - Screen can sleep normally
  - 🔒 (locked) - Screen will stay awake
- **Visual Feedback**: Button turns green when wake lock is active
- **Tooltip**: Shows current state and action

### Browser Support
- **Supported**: Modern mobile browsers (Chrome, Safari, Firefox on mobile)
- **Detection**: Button only appears if Wake Lock API is supported
- **Graceful Degradation**: App works normally if API is not available

### Functionality

#### Activation
1. Tap the wake lock button (🔓)
2. Browser requests permission to prevent screen sleep
3. Button changes to locked state (🔒) with green background
4. Screen will remain on while the app is active

#### Deactivation
1. Tap the wake lock button again (🔒)
2. Wake lock is released
3. Button returns to unlocked state (🔓)
4. Screen sleep behavior returns to normal

#### Automatic Handling
- **Tab Switching**: Wake lock is temporarily suspended when switching tabs
- **Return to Tab**: Wake lock is automatically re-activated when returning
- **App Close**: Wake lock is properly released when closing the app
- **Battery Optimization**: System can still override for battery conservation

## Technical Implementation

### API Used
```javascript
// Request wake lock
await navigator.wakeLock.request('screen')

// Release wake lock  
await wakeLock.release()
```

### Error Handling
- Checks for API support before showing button
- Graceful fallback if permission denied
- Console logging for debugging
- Automatic cleanup on app unmount

### Event Listeners
- **Visibility Change**: Re-activates wake lock when returning to tab
- **Page Unload**: Ensures wake lock is properly released

## Use Cases

### Practice Sessions
- Long practice sessions without screen timeout
- Continuous access to sheet music display
- Uninterrupted MIDI input monitoring

### Teaching
- Extended lessons without screen interruption
- Consistent visibility during demonstrations
- Reliable display for group sessions

### Performance
- Stage use without screen dimming
- Consistent lighting during performances
- Reliable operation during live use

## Battery Considerations

### Power Usage
- Wake lock prevents screen sleep but allows other power management
- CPU can still throttle for battery conservation
- Screen brightness can still be adjusted manually

### Best Practices
- Use only when needed for extended sessions
- Remember to disable when finished
- Monitor battery level during long sessions

## Troubleshooting

### Button Not Visible
- Check if using a modern mobile browser
- Ensure JavaScript is enabled
- Try refreshing the page

### Wake Lock Not Working
- Check browser permissions
- Ensure page is in foreground
- Try toggling the feature off and on

### Battery Drain
- Disable wake lock when not needed
- Reduce screen brightness if possible
- Consider using device charger for long sessions

## Future Enhancements

### Possible Additions
- Automatic wake lock based on activity
- Integration with practice session timer
- Smart wake lock with MIDI activity detection
- Battery level warnings when wake lock is active
