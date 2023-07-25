import { test, expect, it } from 'vitest'
test('Should be able to sum 2 numbers', () => {
  expect(Sum(1, 2)).toBe(3)
})

export function Sum(num1: number, num2: number) {
  return num1 + num2
}
