export function getAverageValueFromArray(arr) {
  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length
  return average(arr)
}

export function roundToCurrency(number) {
  return Math.round(number * 100) / 100
}
