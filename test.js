const WinNative = require('./index.js')
var word = "abcdefghijklmnopqrstuvwqyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*()_+[]\{}|;':\"',./<>?"
setInterval(() => {
  // KeeperBot.keyDown('Left Alt')
  // KeeperBot.keyDown('Esc')
  // KeeperBot.keyUp('Esc')
  // KeeperBot.keyUp('Left Alt')

  // KeeperBot.typeString(word)

  console.log(WinNative.KeeperFill.keyIsDown('a'))
}, 100)
