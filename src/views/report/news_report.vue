<template>
  <div id="report-promotion">
    <section class="promotion-container">
      <div class="header">
        <div class="title">
          <h3>{{ $t("Dashboard.News.title") }}</h3>
        </div>
      </div>
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
            <h4 class="status--title">
              {{ $t("Dashboard.news.status_title") }}
            </h4>
            <div class="status--list">
              <v-radio-group v-model="isSelected_status" row>
                <v-radio
                  :label="item.status"
                  :value="item.key"
                  v-for="item in $t('Dashboard.news.status')"
                  :key="item.id"
                ></v-radio>
              </v-radio-group>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
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
        :headers="$t('Dashboard.news.headers')"
        :items="DataNews"
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
              <div class="event-title">
                <p>{{ item.title }}</p>
              </div>
            </td>
            <td>
              <div class="description">
                <p v-html="item.description"></p>
              </div>
            </td>
            <td>
              <div class="image ma-1">
                <v-img :src="item.image"></v-img>
              </div>
            </td>
            <td>
              <div :class="item.status === 'open' ? 'active-status' : 'status'">
                {{ item.status }}
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </section>
    <section class="section--download--excel" v-if="DataNews.length > 0">
      <div class="download--excel--btn">
        <v-btn @click="downloadExcel" color="success" outlined
          >Download excel</v-btn
        >
      </div>
    </section>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "News-report",

  data() {
    return {
      Fromdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      Todate: new Date(
        Date.now() - new Date().getTimezoneOffset() + 24 * 60 * 60 * 1000
      )
        .toISOString()
        .substr(0, 10),
      Frommenu: false,
      Tomenu: false,
      isLaoLanguage: localStorage.getItem("lang") === "la",
      isSelected_status: "open",
    };
  },

  mounted() {
    this.getDataNews({
      startOfDate: this.Fromdate,
      endOfDate: this.Todate,
      status: this.isSelected_status,
    });
  },
  computed: {
    ...mapGetters({
      DataNews: "report/DataNews",
    }),
  },
  methods: {
    ...mapActions({
      getDataNews: "report/getDataNews",
    }),
    HanddleSubmit() {
      var body = {
        startOfDate: this.Fromdate,
        endOfDate: this.Todate,
        status: this.isSelected_status,
      };
      this.getDataNews(body);
    },
    Reset() {
      this.Fromdate = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.Todate = new Date(
        Date.now() - new Date().getTimezoneOffset() + 24 * 60 * 60 * 1000
      )
        .toISOString()
        .substr(0, 10);
      this.isSelected_status = "open";
      this.getDataNews({
        startOfDate: this.Fromdate,
        endOfDate: "2022-07-12",
        status: this.isSelected_status,
      });
    },

    downloadExcel() {
      const rows = [];
      for (const i in this.DataNews) {
        rows[i] = {
          title:this.DataNews[i].title,
          description:this.DataNews[i].description.replace(/<[^>]+>/g, ''),
          image:this.DataNews[i].image,
          status:this.DataNews[i].status,
        }
      }
       const dataWS = XLSX.utils.json_to_sheet(rows);
       const Wb = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(Wb,dataWS,"News");
       XLSX.writeFile(Wb,"News.xlsx")
    },
  },
};
</script>

<style lang="scss" scoped>
.status--title {
  width: 100%;
  text-align: left;
}

.status--list {
  .v-input--selection-controls {
    margin: 5px 0 !important;
    margin-right: 10px !important;
  }
}

.section--download--excel {
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
