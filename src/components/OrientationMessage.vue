<template>
  <div class="orientation-message">
    <div class="orientation-content">
      <div class="rotate-icon">📱↻</div>
      <h2>Please turn your device in landscape mode</h2>
      <p>This app is optimized for landscape orientation</p>
    </div>
  </div>
</template>

<style scoped>
.orientation-message {
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.orientation-content {
  max-width: 400px;
}

.rotate-icon {
  font-size: 60px;
  margin-bottom: 20px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orientation-message h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.orientation-message p {
  font-size: 16px;
  color: #666;
  margin: 0;
}
</style>
