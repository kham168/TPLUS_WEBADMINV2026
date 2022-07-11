<template>
  <div id="report-promotion">
    <section class="promotion-container">
      <div class="header">
        <div class="title">
          <h3>{{ $t("Dashboard.promotion.title") }}</h3>
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
            <div class="container-action">
              <v-btn @click="HanddleSubmit" class="elevation-0" style="height: 45px;">
                {{ $t("Dashboard.event.submit") }}
              </v-btn>
              <v-btn @click="Reset" text class="mx-2" style="height: 45px;">
                {{ $t("Dashboard.event.reset") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
    <section class="table data-promotion">
      <v-data-table
        :headers="$t('Dashboard.event.headers')"
        :items="DataPromotion"
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
              <div class="image">
                <v-img :src="item.image"></v-img>
              </div>
            </td>
            <td>{{ item.startDate | moment("DD-MM-YYYY") }}</td>
            <td>{{ item.endDate | moment("DD-MM-YYYY") }}</td>
            <td>
              <div :class="item.status === 'open' ? 'active-status' : 'status'">
                {{ item.status }}
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </section>
     <section class="section--download--excel" v-if="DataPromotion.length > 0">
      <div class="download--excel">
        <v-btn @click="DownloadExcel" color="success" outlined>Download Excel</v-btn>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions , mapGetters} from 'vuex'
import * as XLSX from "xlsx";
export default {
  name: "Promotion",

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

  mounted() {
      this.getPromotion();
  },
  computed: {
    ...mapGetters({
      DataPromotion : 'report/Promotions'
    })
  },
  methods: {
      ...mapActions({
         getPromotion:'report/getPromotions',
         getPromotionByDate: 'report/getPromotionByDate'
      }),
      HanddleSubmit(){
        var date ={
         Fromdate : this.Fromdate,
         Todate : this.Todate
        }
        this.getPromotionByDate(date)
      },
      Reset(){
         this.Fromdate= new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
      this.Todate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
        this.getPromotion();
      },

       DownloadExcel() {
      let rows = [];
      for (const i in this.DataPromotion){
        rows[i] ={
          No: i + 1,
          title: this.DataPromotion[i].title,
          description:this.DataPromotion[i].description.replace(/<[^>]+>/g, ''),
          image: this.DataPromotion[i].image,
          start_date: this.DataPromotion[i].startDate,
          end_date: this.DataPromotion[i].endDate,
          status:this.DataPromotion[i].status,
        }
      }
       const dataWS = XLSX.utils.json_to_sheet(rows);
       const Wb = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(Wb,dataWS,"Promotion");
       XLSX.writeFile(Wb,"Promotion.xlsx")
    }
  },
};
</script>

<style lang="scss" scoped></style>
