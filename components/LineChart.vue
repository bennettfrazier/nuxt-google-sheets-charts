<template>
  <div ref="chart" class="lineChart">
    <v-chart :options="chartOptions" autoresize />
  </div>
</template>

<script>
import { chartDefault, setSeriesByDimension } from '~/modules/chart'

export default {
  props: {
    dataset: {
      type: Array,
      default: null,
    },
    dimensions: {
      type: Array,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    chartOptions() {
      return chartDefault({
        title: {
          text: this.title,
        },
        dataset: {
          source: this.dataset,
          dimensions: this.dimensions,
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {},
        series: setSeriesByDimension({
          dimensions: this.dimensions,
          settings: { type: 'line', smooth: true, areaStyle: {} },
        }),
      })
    },
  },
}
</script>

<style lang="scss">
.lineChart {
  width: 100%;
  height: 400px;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>
