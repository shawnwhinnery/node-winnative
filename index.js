const KeeperFill = require('./build/Release/NodeWinNative.node')
const windowsVcodeMap = {

  '0': 0x30,
  '1': 0x31,
  '2': 0x32,
  '3': 0x33,
  '4': 0x34,
  '5': 0x35,
  '6': 0x36,
  '7': 0x37,
  '8': 0x38,
  '9': 0x39,

  '-': 0xBD,
  '=': 0xBB,
  '[': 0xDB,
  ']': 0xDD,
  ';': 0xBA,
  "'": 0xDE,
  ',': 0xBC,
  '/': 0xBF,
  "\\": 0xDC,
  '`': 0xC0,
  '.': 0xBE,

  '|': ['Left Shift', '\\'],
  '?': ['Left Shift', '/'],
  '>': ['Left Shift', '.'],
  '<': ['Left Shift', ','],
  '~': ['Left Shift', '`'],
  '{': ['Left Shift', '['],
  '}': ['Left Shift', ']'],
  '"': ['Left Shift', "'"],
  ':': ['Left Shift', ';'],
  '!': ['Left Shift', '1'],
  '@': ['Left Shift', '2'],
  '#': ['Left Shift', '3'],
  '$': ['Left Shift', '4'],
  '%': ['Left Shift', '5'],
  '^': ['Left Shift', '6'],
  '&': ['Left Shift', '7'],
  '*': ['Left Shift', '8'],
  '(': ['Left Shift', '9'],
  ')': ['Left Shift', '0'],
  '_': ['Left Shift', '-'],
  '+': ['Left Shift', '='],

  'a': 0x41,
  'b': 0x42,
  'c': 0x43,
  'd': 0x44,
  'e': 0x45,
  'f': 0x46,
  'g': 0x47,
  'h': 0x48,
  'i': 0x49,
  'j': 0x4A,
  'k': 0x4B,
  'l': 0x4C,
  'm': 0x4D,
  'n': 0x4E,
  'o': 0x4F,
  'p': 0x50,
  'q': 0x51,
  'r': 0x52,
  's': 0x53,
  't': 0x54,
  'u': 0x55,
  'v': 0x56,
  'w': 0x57,
  'x': 0x58,
  'y': 0x59,
  'z': 0x5A,

  'A': ['Left Shift', 'a'],
  'B': ['Left Shift', 'b'],
  'C': ['Left Shift', 'c'],
  'D': ['Left Shift', 'd'],
  'E': ['Left Shift', 'e'],
  'F': ['Left Shift', 'f'],
  'G': ['Left Shift', 'g'],
  'H': ['Left Shift', 'h'],
  'I': ['Left Shift', 'i'],
  'J': ['Left Shift', 'j'],
  'K': ['Left Shift', 'k'],
  'L': ['Left Shift', 'l'],
  'M': ['Left Shift', 'm'],
  'N': ['Left Shift', 'n'],
  'O': ['Left Shift', 'o'],
  'P': ['Left Shift', 'p'],
  'Q': ['Left Shift', 'q'],
  'R': ['Left Shift', 'r'],
  'S': ['Left Shift', 's'],
  'T': ['Left Shift', 't'],
  'U': ['Left Shift', 'u'],
  'V': ['Left Shift', 'v'],
  'W': ['Left Shift', 'w'],
  'X': ['Left Shift', 'x'],
  'Y': ['Left Shift', 'y'],
  'Z': ['Left Shift', 'z'],

  'Left Ctrl': 0xA2,
  'Left Shift': 0xA0,
  'Left Win': 0x5B,
  'Left Alt': 0xA4,

  'Right Ctrl': 0xA3,
  'Right Alt': 0xA5,
  'Right Shift': 0xA1,
  'Right Win': 0x5C,

  'Esc': 0x1B,
  'Tab': 0x09,
  ' ': 0x20

}



const keyDown = (character) => {
  var code = windowsVcodeMap[character]
  if (code) KeeperFill.keyDown(code)
}

const keyUp = (character) => {
  var code = windowsVcodeMap[character]
  if (code) KeeperFill.keyUp(code)
}

const keyStroke = (character) => {
  var code = windowsVcodeMap[character]
  if (code) KeeperFill.keyStroke(code)
}

const typeString = (word) => {

  for (var character in word) {

    var code = windowsVcodeMap[word[character]]

    if (Array.isArray(code)) {

      code.forEach((key) => {
        var nestedCode = windowsVcodeMap[key]
        console.log(`DOWN ${key}`)
        KeeperFill.keyDown(nestedCode)
      })

      code.forEach((key) => {
        var nestedCode = windowsVcodeMap[key]
        console.log(`UP ${key}`)
        KeeperFill.keyUp(nestedCode)
      })


    } else {

      KeeperFill.keyStroke(code)

    }

  }
}

const keyIsDown = (character) => {
  var code = windowsVcodeMap[character]
  if (code) return KeeperFill.keyIsDown(code)
}

module.exports = {
  KeeperFill: {
    typeString: typeString,
    keyDown: keyDown,
    keyUp: keyUp,
    keyStroke: keyStroke,
    keyIsDown: keyIsDown,
    getActiveWindowTitle: KeeperFill.getActiveWindowTitle
  }
}
