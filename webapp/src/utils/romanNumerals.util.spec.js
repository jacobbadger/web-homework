import { convertToRomanNumeral } from './romanNumerals.util'

test('Should convert 25 to XXV', () => {
  const expected = 'XXV'
  const actual = convertToRomanNumeral(25)
  expect(actual).toBe(expected)
})

test('Should convert 4 to IV', () => {
  const expected = 'IV'
  const actual = convertToRomanNumeral(4)
  expect(actual).toBe(expected)
})

test('Should convert 12345 to MMMMMMMMMMMMCCCXLV', () => {
  const expected = 'MMMMMMMMMMMMCCCXLV'
  const actual = convertToRomanNumeral(12345)
  expect(actual).toBe(expected)
})