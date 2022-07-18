<template>
  <div id="Event-report">
    <section class="event-container">
      <div class="header">
        <div class="title">
          <h3>{{ $t("Dashboard.event.header") }}</h3>
        </div>
      </div>
      <!-- <div class="search-event">
        <div class="search">
          <v-text-field
            :label="$t('Dashboard.event.search')"
            rounded
            outlined
            dense
            single-line
            hide-details
            append-icon="fas fa-search"
            v-model="SearchEvent"
          ></v-text-field>
        </div>
      </div> -->
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
      <!-- <v-row>
        <v-col>
          <v-btn @click="EportPDF" class="export-customer-btn"> Export PDF </v-btn>
          <v-btn class="export-customer-btn mx-3"> Export Excel </v-btn>
        </v-col>
      </v-row> -->
    </section>
    <section class="table data-event">
      <v-data-table
        :headers="$t('Dashboard.event.headers')"
        :items="DataActivities"
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
    <section class="section--download--excel" v-if="DataActivities.length > 0">
      <div class="download--excel">
        <v-btn @click="DownloadExcel" color="success" outlined>Download Excel</v-btn>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
export default {
  name: "EventReport",

  data() {
    return {
      SearchEvent: null,
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
  created() {},

  mounted() {
    this.fetch_Activity();
  },
  computed: {
    ...mapGetters({
      DataActivities: "report/Activities",
    }),
  },
  methods: {
    ...mapActions({
      fetch_ActivityByDate: "report/getActivityByDate",
      fetch_Activity: "report/getActivity",
    }),
    HanddleSubmit() {
      var date = {
        Fromdate: this.Fromdate,
        Todate: this.Todate,
      };
      this.fetch_ActivityByDate(date);
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

      this.fetch_Activity();
    },


     // export customers for pdf file
    async EportPDF() {
      // format data for export
      var data = this.DataActivities;
      console.log(data);
      var rows = [];
      for (const i in data) {
        rows[i] = {
          customer_name: data[i].Customer.firstName,
          customer_lastname: data[i].Customer.surName,
          customer_phone: data[i].phone,
          customer_status: data[i].status,
        };
      }
      // table columns
      const columns = [
        { title: "ລຳດັບ", dataKey: "index" },
        { title: "ຊື່", dataKey: "customer_name" },
        { title: "ນາມສະກຸນ", dataKey: "customer_lastname" },
        { title: "ເບີໂທ", dataKey: "customer_phone" },
        { title: "ສະຖານະ", dataKey: "customer_status" },
      ];

      //set format PDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "cm",
        format: "A4",
      });
      //set font and line
      doc.addFont("Phetsarath_OT.ttf", "Notosan-lao", "normal");
      doc.setFont("Notosan-lao");
      // Table
      doc.autoTable({
        columns,
        body: rows,
        bodyStyles: {
          overflow: "linebreak",
          tableWidth: "auto",
          // fileColor: [0, 0, 0],
          //lineWidth: 0.01,
        },
        margin: { left: 1.5, top: 4.8, right: 1.5 },
        styles: { font: "Notosan-lao" },
        columnWidth: "auto",
        theme: "striped",
        options: {
          valign: "middle",
          halign: "center",
        },
      });
      doc.setFont("Notosan-lao");
      doc.setFontSize(14);
      doc.setFontSize(14).text("ລາຍງານຂໍ້ມູນລູກຄ້າຂອງເວບໄຊ TPLUS", 10, 2, {
        align: "center",
        maxWidth: "7.5",
      }),
        // set total users text
        doc.setFont("Notosan-lao");
      doc.setFontSize(12);
      doc
        .setFontSize(12)
        .text(`ຈຳນວນລູກຄ້າທັງໝົດ: ${this.Customers.count}`, 1.5, 3, {
          align: "left",
          maxWidth: "7.5",
        }),
        // set all users active
        doc.setFont("Notosan-lao");
      doc.setFontSize(12);
      doc.setFontSize(12).text(`ຈຳນວນລູກຄ້າທີ່ໃຊ້ງານ: ${0}`, 1.5, 3.7, {
        align: "left",
        maxWidth: "7.5",
      }),
        // set all users inactive
        doc.setFont("Notosan-lao");
      doc.setFontSize(12);
      doc.setFontSize(12).text(`ຈຳນວນລູກຄ້າທີ່ບໍ່ໃຊ້ງານ: ${0}`, 1.5, 4.4, {
        align: "left",
        maxWidth: "7.5",
      }),
        doc.save("tplus_customer_export.pdf");
    },

    DownloadExcel() {
      let rows = [];
      for (const i in this.DataActivities){
        rows[i] ={
          No: i + 1,
          title: this.DataActivities[i].title,
          description:this.DataActivities[i].description.replace(/<[^>]+>/g, ''),
          image: this.DataActivities[i].image,
          start_date: this.DataActivities[i].startDate,
          end_date: this.DataActivities[i].endDate,
          status:this.DataActivities[i].status,
        }
      }
       const dataWS = XLSX.utils.json_to_sheet(rows);
       const Wb = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(Wb,dataWS,"Event");
       XLSX.writeFile(Wb,"Event.xlsx")
    }
  },
};
</script>

<style lang="scss" scoped></style>
