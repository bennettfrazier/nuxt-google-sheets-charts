import merge from 'deepmerge'

export function chartDefault(config) {
  const defaults = {
    color: ['#28df99', '#f56a79', '#99f3bd'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    animationDuration: 1000,
  }
  return merge(defaults, config)
}

export function setSeriesByDimension({ dimensions, settings }) {
  const series = []
  dimensions.forEach((_index) => {
    // return one less than the dimension due to x-axis
    if (_index !== dimensions.length - 1) {
      series.push(settings)
    }
  })
  return series
}

// used for returning an array of values from an array of objects based on a specified prop
export function getUniquePropsFromArr(config) {
  return [...new Set(config.arr.map((item) => item[config.prop]))]
}
