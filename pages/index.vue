<template>
  <div>
    <div class="container">
      <div>
        <h1 class="title">
          Google Sheets Budget Forecast Tool
        </h1>
        <p>
          The purpose of this tool is to forecast the amount that will be in a
          bank account, by using Google Sheets as a data source.
        </p>
        <!-- default chart id found in ~/constants -->
        <GoogleSheetCharts :google-sheet-id="chartId" />
      </div>
    </div>
  </div>
</template>

<script>
import { DEFAULT_CHART_ID } from '~/constants'
export default {
  data() {
    return {
      chartId: DEFAULT_CHART_ID,
    }
  },
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  max-width: calc(100% - 2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
}

p {
  margin: 1rem 0;
}

.title {
  display: block;
  font-weight: 700;
  font-size: 3.5rem;
  color: #000;
  letter-spacing: -0.1rem;
  line-height: 1;
  margin-top: 2.5rem;
}

// print styles
@media only print {
  .container {
    min-height: 0;
  }

  .title {
    font-size: 2rem;
  }
}
</style>
