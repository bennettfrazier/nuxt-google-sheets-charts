<template>
  <div class="googleSheetsCharts">
    <UiButton
      :href="`https://docs.google.com/spreadsheets/d/${currentGoogleSheetId}/edit#gid=0`"
      target="_blank"
      >open spreadsheet
    </UiButton>
    <UiButton icon="refresh" @click.native="$fetch">Refresh Data </UiButton>
    <div class="googleSheetsCharts__inputWrap">
      Chart ID:
      <input
        v-model="tmpGoogleSheetId"
        class="googleSheetsCharts__input"
        type="text"
      />
      <UiButton @click.native="updateChartId">update chart Id</UiButton>
      <UiButton @click.native="resetChartId">Reset Chart ID</UiButton>
    </div>
    <ClientOnly>
      <div v-if="$fetchState.pending" class="googleSheetsCharts__loadingText">
        <p>Fetching chart data...</p>
      </div>
      <div v-else class="googleSheetsCharts__chartRenders">
        <h3 class="googleSheetsCharts__averageTitle">
          Average in bank: ${{ bankAverage }}
        </h3>
        <LineChart
          :dataset="chartDataCurrent"
          :dimensions="['date', 'amount', 'change', 'secondaryBankAccounts']"
          title="Bank Account Forecast"
        ></LineChart>
        <HeatmapChart
          :dataset="chartDataCurrent"
          :dimensions="['date', 'month', 'change']"
          title="Hot Spend vs. Income Days"
        ></HeatmapChart>
      </div>
    </ClientOnly>
    <UiModal :show-modal="errorFetching" title="Error" @close="closeError">
      There was an error fetching Google Sheets Data based on provided ID.
      Please make sure you copy and paste the URL ID correctly as seen in the
      image below highlighted in red.
      <img
        src="~assets/img/google-spreadsheet-id.png"
        alt="Google Spreadsheet Example"
      />
    </UiModal>
  </div>
</template>

<script>
import { getJsonDataFromCsvString } from '~/modules/parse'
import { getAverageValueFromArray, roundToCurrency } from '~/modules/helpers'
import { DEFAULT_CHART_ID } from '~/constants'

export default {
  props: {
    googleSheetId: {
      type: String,
      default: '',
    },
    googleSheetName: {
      type: String,
      default: 'CSV',
    },
  },
  async fetch() {
    try {
      this.csvFromSheet = await this.$http.$get(this.googleSheetCsvUrl)
      this.chartData = getJsonDataFromCsvString(this.csvFromSheet)
      this.errorFetching = false
    } catch (e) {
      this.errorFetching = true
    }
  },
  data() {
    return {
      csvFromSheet: null,
      errorFetching: false,
      tmpGoogleSheetId: this.googleSheetId,
      currentGoogleSheetId: this.googleSheetId,
      chartData: [],
    }
  },
  computed: {
    chartDataCurrent() {
      // inspiration:
      // https://stackoverflow.com/questions/48227286/filter-array-in-array-by-date-between-2-dates
      const today = new Date()
      return this.chartData.filter((item) => {
        const date = new Date(item.date)
        return date >= today
      })
    },
    bankAverage() {
      const currentDailyAmountInBank = this.chartDataCurrent.map((a) =>
        parseInt(a.amount, 10)
      )
      return roundToCurrency(getAverageValueFromArray(currentDailyAmountInBank))
    },
    googleSheetCsvUrl() {
      return `/sheets/${this.currentGoogleSheetId}/gviz/tq?tqx=out:csv&sheet=${this.googleSheetName}`
    },
  },
  methods: {
    closeError() {
      this.errorFetching = false
    },
    async updateChartId() {
      this.currentGoogleSheetId = this.tmpGoogleSheetId
      await this.$fetch()
    },
    async resetChartId() {
      this.currentGoogleSheetId = DEFAULT_CHART_ID
      this.tmpGoogleSheetId = DEFAULT_CHART_ID
      await this.$fetch()
    },
  },
}
</script>

<style lang="scss">
.googleSheetsCharts {
  min-height: 840px;
  margin-bottom: 3rem;
}

.googleSheetsCharts__loadingText {
  margin-top: 2rem;
}

.googleSheetsCharts__inputWrap {
  margin-top: 2rem;
}

.googleSheetsCharts__chartRenders {
  margin-top: 1rem;
}

.googleSheetsCharts__input {
  padding: 10px 10px 10px 5px;
  display: inline-block;
  width: 300px;
  border: none;
  border-bottom: 1px solid $grey;
  outline: none;

  &:focus {
    border-bottom: 1px solid $black;
  }
}

.googleSheetsCharts__averageTitle {
  padding: 10px;
  margin: 1rem 0;
  border-radius: 5px;
  background-color: #d3d3d3;
}
</style>
