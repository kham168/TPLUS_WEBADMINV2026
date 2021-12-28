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
          <v-col cols="4">
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
          <v-col cols="4">
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
          <v-col cols="4">
            <div class="container">
              <v-btn @click="HanddleSubmit" class="elevation-0">
                {{ $t("Dashboard.event.submit") }}
              </v-btn>
              <v-btn @click="Reset" text class="mx-2">
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
  </div>
</template>

<script>
import {mapActions , mapGetters} from 'vuex'
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
      }
  },
};
</script>

<style lang="scss" scoped></style>
