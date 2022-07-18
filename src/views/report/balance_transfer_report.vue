<template>
  <div id="RefillBalanceReport">
    <section class="section--report">
      <div class="header--report">
        <div class="title">
          <h2>{{ $t("Dashboard.balance_transfer.title") }}</h2>
        </div>
      </div>
    </section>
    <section class="refill--balance--card">
      <div class="card--container">
        <div class="card--icon">
          <i class="fas fa-analytics"></i>
        </div>
        <div class="card--price-total">
          <h3>{{ TotalBalance | numFormat }}</h3>
          <p>{{ $t("Dashboard.balance_transfer.refill_total") }}</p>
        </div>
      </div>
    </section>

    <section class="section--filter--data">
      <div class="report-with-calendar">
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="4" xl="4">
            <v-menu
              v-model="Frommenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="Fromdate"
                  label="From Date"
                  outlined
                  dense
                  prepend-inner-icon="far fa-calendar-alt"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="Fromdate"
                @input="Frommenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="4" xl="4">
            <v-menu
              v-model="Tomenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="Todate"
                  label="To Date"
                  outlined
                  dense
                  prepend-inner-icon="far fa-calendar-alt"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="Todate"
                @input="Tomenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="4" xl="4">
            <div class="container-action">
              <v-btn
                @click="HanddleSubmit"
                class="elevation-0"
                style="height: 45px"
              >
                {{ $t("Dashboard.event.submit") }}
              </v-btn>
              <v-btn @click="Reset" text class="mx-2" style="height: 45px">
                {{ $t("Dashboard.event.reset") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>

    <section class="table data-promotion">
      <v-data-table
        :headers="$t('Dashboard.balance_transfer.headers')"
        :items="DataTopUp"
        class="elevation-0"
        :footer-props="{
          'items-per-page-text': $t('row_per_page'),
        }"
        :no-data-text="$t('no_data')"
      >
        <template v-slot:[`footer.page-text`]="items">
          {{ items.pageStart }} - {{ items.pageStop }} {{ $t("of") }}
          {{ items.itemsLength }}
        </template>
        >
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>
              <div v-if="item.type == 'transfer'">
                {{ $t("Dashboard.balance_transfer.refill") }}
              </div>
            </td>
            <td>
              {{ item.value | numFormat }}
            </td>
            <td>
              {{ item.phoneDestination }}
            </td>
            <td>
              {{ item.User.phone }}
            </td>
            <td>
              {{ item.createdAt | moment("DD-MM-YYYY") }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </section>
    <section class="section--download--excel" v-if="DataTopUp.length > 0">
      <div class="download--excel">
        <v-btn @click="DownloadExcel" color="success" outlined
          >Download Excel</v-btn
        >
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as XLSX from "xlsx";
export default {
  name: "TPlusWebAdminRefillBalanceReport",

  data() {
    return {
      Fromdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      Todate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      Frommenu: false,
      Tomenu: false,
    };
  },

  created() {
    this.getTotalBalance();
    this.getDataTopUp({
      startDate: this.Fromdate,
      endDate: this.Todate,
      type: "transfer",
    });
  },

  computed: {
    ...mapGetters({
      TotalBalance: "report/Transfer_total",
      DataTopUp: "report/DataTopUp",
    }),
  },

  methods: {
    ...mapActions({
      getTotalBalance: "report/getTotalBalance",
      getDataTopUp: "report/getDataTopUp",
    }),

    HanddleSubmit() {
      var body = {
        startDate: this.Fromdate,
        endDate: this.Todate,
        type: "transfer",
      };
      this.getDataTopUp(body);
    },

    Reset() {
      this.Fromdate = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.Todate = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);

      var body = {
        startDate: this.Fromdate,
        endDate: this.Todate,
        type: "transfer",
      };
      this.getDataTopUp(body);
    },

    DownloadExcel() {
      let rows = [];
      let data = this.DataTopUp;
      for (const i in data) {
        rows[i] = {
          type: data[i].type,
          value: data[i].value,
          from_phone: data[i].phoneDestination,
          to_phone: data[i].User.phone,
          date: data[i].createdAt,
        };
      }
      const dataWS = XLSX.utils.json_to_sheet(rows);
      const Wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(Wb, dataWS, "Balance Transfer");
      XLSX.writeFile(Wb, "Balance_Transfer.xlsx");
    },
  },
};
</script>

<style lang="scss" scoped></style>
