import Vue from 'vue'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
// see https://github.com/ecomfe/vue-echarts/blob/master/src/demo/Demo.vue for example

// chart types
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/heatmap'

// components
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

// register component to use globally
Vue.component('v-chart', ECharts)
