import { translateText } from './translation.util'

test('Should change Hello to random', () => {
  const translate = 'Hello'
  const translationEnabled = true
  const actual = translateText(translate, translationEnabled)
  expect(actual).not.toBe(translate)
})

test('Should not translate Hello', () => {
  const translate = 'Hello'
  const translationEnabled = false
  const actual = translateText(translate, translationEnabled)
  expect(actual).toBe(translate)
})

test('Should translate with right word breaks', () => {
  const translate = 'Hello Divvy'
  const translationEnabled = true
  const actual = translateText(translate, translationEnabled)
  const wordsArray = actual.split(' ')
  expect(wordsArray.length).toBe(2)
})
