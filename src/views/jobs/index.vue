<template>
  <div id="Jobs">
    <section class="Jobs">
      <v-skeleton-loader
        class="mx-auto"
        type="table"
        v-if="Loader"
      ></v-skeleton-loader>
      <div class="header contact-header">
        <h1>{{ $t("Jobs.title") }}</h1>
        <v-btn @click="onCreate" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("Jobs.button") }}</v-btn
        >
      </div>
      <div class="contact-content">
        <v-data-table
          :headers="$t('Jobs.table.headers')"
          :items="dataJobs"
          :options.sync="options"
          :search="searchItem"
          :loading-text="$t('Jobs.loadingtext')"
          v-if="dataJobs.length > 0"
          :footer-props="{
            'items-per-page-text': $t('row_per_page'),
          }"
          :no-data-text="$t('no_data')"
        >
          <template v-slot:[`footer.page-text`]="items">
            {{ items.pageStart }} - {{ items.pageStop }} {{ $t("of") }}
            {{ items.itemsLength }}
          </template>
        
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('Jobs.search')"
                filled
                rounded
                dense
                append-icon="fas fa-search"
                single-line
                hide-details
                v-model="searchItem"
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <!-- table content -->
          <template v-slot:item="{ item, index }">
            <tr class="table-content">
              <td>{{ getGlobalIndex(index) }}</td>
              <td>{{ item.title }}</td>
              <td>{{ getJobTypeName(item.type_job_id) }}</td>
              <td>{{ item.company }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.salary }}</td>
              <td>{{ formatDateDisplay(item.start_date) }}</td>
              <td>{{ formatDateDisplay(item.end_date) }}</td>
              <td>
                <v-chip
                  :color="item.is_active ? 'green' : 'red'"
                  dark
                  small
                >
                  {{ item.is_active ? $t('Jobs.status.active') : $t('Jobs.status.inactive') }}
                </v-chip>
              </td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link @click="onEdit(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Contact.table.options.iconEdit")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("Contact.table.options.edit") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Contact.table.options.delicon")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("Contact.table.options.delete") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="Table-empty" v-else>
          <div class="image">
            <v-img src="@/assets/Images/NoData.png"></v-img>
          </div>
          <h3>{{ $t("Contact.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
    <DeleteModal />
  </div>
</template>
<script>
import DeleteModal from "../../components/forms/jobs/Delete.vue";
export default {
  components: { DeleteModal },
  data() {
    return {
      Loader: false,
      dataJobs: [],
      typeJobItems: [],
      searchItem: null,
      options: {},
    };
  },
  methods: {
    onCreate() {
      this.$router.push({ name: "jobs.create" }).catch({});
    },
    onEdit(id) {
      this.$router
        .push({ name: "jobs.edit", params: { id: id } })
        .catch({});
    },
    onDelete(id) {
      this.$store.commit("isDeleteJobsModal", id);
    },
    async fetchDataJobs() {
      this.Loader = true;
      try {
        const res = await this.$axios.get("get-all");
        if (res.status == 200) {
          this.dataJobs = res.data.data || res.data;
        }
      } catch (error) {
        this.showErrorNotification(error);
      } finally {
        this.Loader = false;
      }
    },

    async fetchTypeJobs() {
      try {
        const res = await this.$axios.get("find-all-type-job");
        if (res.status == 200) {
          this.typeJobItems = res.data.data || res.data;
        }
      } catch (error) {
        console.error("Error fetching type jobs:", error);
      }
    },

    getJobTypeName(id) {
      if (!id) return "-";
      const type = this.typeJobItems.find((item) => item.id == id);
      return type ? type.name : id;
    },

    getGlobalIndex(index) {
      const { page, itemsPerPage } = this.options;
      if (!page || !itemsPerPage) return index + 1;
      return (page - 1) * itemsPerPage + index + 1;
    },

    formatDateDisplay(dateString) {
      if (!dateString) return "-";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      } catch (e) {
        return dateString;
      }
    },

    showErrorNotification(error) {
      if (error.response && error.response.data) {
        setTimeout(() => {
          this.$store.dispatch({
            type: "action_Notifi_Error",
            message: `${error.response.data.error.message}`,
          });
        }, 300);
      }
    },
  },

  created() {
    this.fetchDataJobs();
    this.fetchTypeJobs();
  },
};
</script>
