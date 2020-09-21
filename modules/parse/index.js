import Papa from 'papaparse'

export function parseCsvString(csvString, cb) {
  Papa.parse(csvString, {
    header: true,
    complete(results) {
      cb(results.data)
    },
  })
}

export function getJsonDataFromCsvString(csvString) {
  let result = []
  parseCsvString(csvString, (data) => {
    // callback to set data
    result = data
  })
  return result
}
