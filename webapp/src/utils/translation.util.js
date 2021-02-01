const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

export const translateText = (text, isEnabled) => {
  if (!isEnabled) {
    return text
  }
  let newWord = ''
  for (let i = 0; i < text.length; i++) {
    const random = Math.floor(Math.random() * Math.floor(26))

    if (text[i] === ' ') {
      newWord += ' '
    } else {
      newWord += alphabet[random]
    }
  }
  return newWord
}
