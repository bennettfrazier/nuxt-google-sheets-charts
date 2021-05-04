<template>
  <div ref="chart" class="lineChart">
    <v-chart :option="chartOption" autoresize />
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
    chartOption() {
      return chartDefault({
        title: {
          text: this.title,
        },
        dataset: {
          source: this.dataset,
          dimensions: this.dimensions,
        },
        tooltip: {
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          axisLine: { onZero: true },
        },
        axisPointer: {
          link: { xAxisIndex: 'all' },
        },
        series: setSeriesByDimension({
          dimensions: this.dimensions,
          settings: {
            type: 'line',
            stack: 'name',
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
          },
        }),
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        calculable: true,
        dataZoom: [
          {
            show: true,
            realtime: true,
          },
          {
            type: 'inside',
            realtime: true,
          },
        ],
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
