<template>
  <div ref="chart" class="heatmapChart">
    <v-chart :options="chartOptions" autoresize />
  </div>
</template>

<script>
import { chartDefault, getUniquePropsFromArr } from '~/modules/chart'

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
      const xAxisProp = this.dimensions[0]
      const yAxisProp = this.dimensions[1]
      const seriesDataProp = this.dimensions[2]

      const xData = this.dataset.map((item) => item[xAxisProp])
      // get y data in reverse order
      const yData = getUniquePropsFromArr({
        arr: this.dataset,
        prop: yAxisProp,
      }).reverse()
      const seriesData = this.dataset.map((item) => [
        item[xAxisProp],
        item[yAxisProp],
        item[seriesDataProp] || '-',
      ])

      return chartDefault({
        title: {
          text: this.title,
        },
        dataset: {
          source: this.dataset,
          dimensions: this.dimensions,
        },
        tooltip: {
          position: 'top',
        },
        // position grid with gap between key
        grid: {
          height: '50%',
          top: '10%',
        },
        xAxis: {
          type: 'category',
          data: xData,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: 'category',
          data: yData,
          splitArea: {
            show: true,
          },
        },
        series: {
          type: 'heatmap',
          data: seriesData,
        },
        visualMap: {
          calculable: true,
          orient: 'horizontal',
          min: -1000,
          max: 1200,
          left: 'center',
          bottom: '15%',
          inRange: {
            color: ['red', 'yellow', '#1ed6af'],
          },
        },
      })
    },
  },
}
</script>

<style lang="scss">
.heatmapChart {
  width: 100%;
  height: 400px;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>
