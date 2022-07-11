<template>
  <div id="report_package">
    <section class="promotion-container">
      <div class="header">
        <div class="title">
          <h3>
            {{ $t("Dashboard.Packages.title") }} ({{ dataPackages.length }})
          </h3>
        </div>
      </div>
    </section>
    <section class="packages-type-condition">
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-select
            v-if="isLaoLanguage"
            :items="package_type['data']"
            item-text="type_name"
            :label="$t('Dashboard.Packages.condition.package_type')"
            outlined
            v-model="selectedItem"
            @change="onPackageTypeSelected($event)"
          ></v-select>
          <v-select
            v-else
            :items="package_type['data']"
            item-text="TypePackagTrans[0].type_name"
            :label="$t('Dashboard.Packages.condition.package_type')"
            outlined
            v-model="selectedItem"
            @change="onPackageTypeSelected($event)"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <h4>{{ $t("Dashboard.Packages.condition.package_regular") }}</h4>
          <div class="check--list">
            <v-radio-group row @change="CategorySelected($event)">
              <v-radio
                v-for="item in $t('Dashboard.Packages.check_list')"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-col>
      </v-row>
    </section>
    <section class="table data-promotion">
      <v-data-table
        :headers="$t('Dashboard.Packages.headers')"
        :items="dataPackages"
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
              <div class="image-package">
                <v-img :src="item.image"></v-img>
              </div>
            </td>
            <td>
              {{ item.packageCode }}
            </td>
            <td>
              {{ item.packageName }}
            </td>
            <td>
              <div class="description">
                {{ item.detail }}
              </div>
            </td>
            <td>{{ selectedItem }}</td>
            <td>
              <div
                v-for="catItem in $t('Dashboard.Packages.check_list')"
                :key="catItem.id"
              >
                <span v-if="catItem.id == item.catId">
                  {{ catItem.name }}
                </span>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </section>
    <section
      class="section--download--excel"
      v-if="dataPackages.length > 0"
    >
      <div class="download--excel--btn">
        <v-btn @click="DownloadExcel" color="success" outlined
          >Download Excel</v-btn
        >
      </div>
    </section>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TPlusWebAdminPackagesReport",

  data() {
    return {
      isLaoLanguage: localStorage.getItem("lang") === "la",
      selectedItem: "ຕື່ມເງິນ",
      filter: {
        packageType: "prepaid",
        catId: 0,
      },
    };
  },

  mounted() {
    this.getPackageType().then((res) => {
      this.firstLoad = false;
    });
    if (this.isLaoLanguage) {
      this.selectedItem = "ຕື່ມເງິນ";
      this.getDataPackages(this.filter);
    } else {
      this.selectedItem = "Prepaid";
      this.getDataPackages(this.filter);
    }
  },

  methods: {
    ...mapActions({
      getPackageType: "PackageType/getPackageType",
      getDataPackages: "report/getDataPackages",
    }),

    onPackageTypeSelected(type) {
      if (this.isLaoLanguage) {
        type == "ຕື່ມເງິນ"
          ? (this.filter.packageType = "prepaid")
          : (this.filter.packageType = "postpaid");
      } else {
        this.filter.packageType = type.toLowerCase();
      }
      this.getDataPackages(this.filter);
    },

    CategorySelected(id) {
      this.filter.catId = id;
      this.getDataPackages(this.filter);
    },

    DownloadExcel() {
      let rows = [];
      for (const i in this.dataPackages) {
        rows[i] = {
          No: i + 1,
          package_image: this.dataPackages[i].image,
          package_code: this.dataPackages[i].packageCode,
          package_name: this.dataPackages[i].packageName,
          package_detail: this.dataPackages[i].detail,
          package_type: this.selectedItem,
          category: this.findCategory(this.dataPackages[i].catId),
        };
      }
      const dataWS = XLSX.utils.json_to_sheet(rows);
      const Wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(Wb, dataWS, "Packages");
      XLSX.writeFile(Wb, "Packages.xlsx");
    },

    findCategory(id) {
      let category = "";
      if (localStorage.getItem("lang") === "la") {
        if (id == 1) {
          category = "ປະຈຳວັນ";
        } else if (id == 2) {
          category = "ປະຈຳອາທິດ";
        } else {
          category = "ປະຈຳເດືອນ";
        }
      } else {
        if (id == 1) {
          category = "Daily";
        } else if (id == 2) {
          category = "Weekly";
        } else {
          category = "Monthly";
        }
      }

      return category;
    },
  },

  computed: {
    ...mapGetters({
      package_type: "PackageType/package_type",
      dataPackages: "report/DataPackages",
    }),
  },
};
</script>

<style lang="scss" scoped>
.image-package {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin: 10px;
  overflow: hidden;
}
</style>
