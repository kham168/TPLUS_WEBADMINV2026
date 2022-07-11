<template>
  <div id="Report-customer">
    <section class="report-customer-container">
      <div class="header">
        <div class="title">
          <h3>{{ $t("Dashboard.users.header") }}</h3>
        </div>
      </div>
      <div class="data-customer-card">
        <v-row>
          <!-- all users -->
          <v-col cols="12" sm="12" md="4" xl="4" lg="4">
            <div class="container">
              <div class="customer-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="customer-detail">
                <h3>{{ Customers.all | numFormat }}</h3>
                <p>{{ $t("reports.customer.all_users") }}</p>
              </div>
            </div>
          </v-col>

          <!-- users active -->
          <v-col cols="12" sm="12" md="4" xl="4" lg="4">
            <div class="container">
              <div class="customer-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="customer-detail">
                <h3>{{ Customers.active | numFormat }}</h3>
                <p>{{ $t("reports.customer.active_users") }}</p>
              </div>
            </div>
          </v-col>

          <!-- users unActive -->
          <v-col cols="12" sm="12" md="4" xl="4" lg="4">
            <div class="container">
              <div class="customer-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="customer-detail">
                <h3>{{ Customers.inactive | numFormat }}</h3>
                <p>{{ $t("reports.customer.inactive_users") }}</p>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="8" lg="8" sm="12" xl="8">
            <div class="export-customers">
              <!-- <v-btn @click="EportPDF" class="export-customer-btn">
                Export PDF
              </v-btn> -->
              <!-- <v-btn class="export-customer-btn" outlined> Download Excel </v-btn> -->
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
            <div class="search-container">
              <div class="search">
                <v-text-field
                  :label="$t('Dashboard.users.search')"
                  rounded
                  outlined
                  dense
                  hide-details
                  append-icon="fas fa-search"
                  single-line
                  v-model="search"
                ></v-text-field>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
    <section class="data-customer">
      <v-data-table
        :headers="$t('Dashboard.users.headers')"
        :items="Customers.rows"
        :search="search"
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
      </v-data-table>
    </section>
    <section class="section--download--excel">
      <div class="download--excel-btn">
        <v-btn @click="DownloadExcel" color="success" outlined
          >Download excel</v-btn
        >
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as XLSX from "xlsx";
export default {
  name: "Customer",
  data() {
    return {
      search: null,
    };
  },

  mounted() {
    this.getCustomer();
  },
  computed: {
    ...mapGetters({
      Customers: "report/Customers",
    }),
  },
  methods: {
    ...mapActions({
      getCustomer: "report/getCustomer",
    }),

    DownloadExcel() {
      let rows = [];
      let data = this.Customers.rows;
      for (const i in data) {
        rows[i] = {
          No:i+1,
          name: data[i].Customer.firstName,
          lastname:data[i].Customer.surName,
          phone:data[i].phone,
          status:data[i].status
        };
      }
      const dataWS = XLSX.utils.json_to_sheet(rows);
      const Wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(Wb, dataWS, "Customers");
      XLSX.writeFile(Wb, "Customers.xlsx");
    },

    // export customers for pdf file
    async EportPDF() {
      // format data for export
      var data = this.Customers.rows;
      var rows = [];
      for (const i in data) {
        rows[i] = {
          index: i + 1,
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
  },
};
</script>

<style lang="scss" scoped></style>
