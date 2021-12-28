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
          <v-col cols="12" sm="12" md="4" xl="4" lg="4">
            <div class="container">
              <div class="customer-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="customer-detail">
                <h3>{{ Customers.count | numFormat }}</h3>
                <p>{{ $t("Dashboard.users.title") }}</p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="8" xl="8" lg="8">
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
      >
      </v-data-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
    })
  },
};
</script>

<style lang="scss" scoped></style>
