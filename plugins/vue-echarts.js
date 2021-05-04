import Vue from 'vue'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

import * as echarts from 'echarts'

// See docs for imports, www.npmjs.com/package/vue-echarts
// import ECharts modules manually to reduce bundle size

import { LineChart, HeatmapChart } from 'echarts/charts'

import {
  GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  // DatasetComponent,
} from 'echarts/components'

import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  AxisPointerComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  GridSimpleComponent,
  GridComponent,
  ToolboxComponent,
  TimelineComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  LineChart,
  HeatmapChart,
  CanvasRenderer,
])

// register component to use globally
Vue.component('v-chart', ECharts)
