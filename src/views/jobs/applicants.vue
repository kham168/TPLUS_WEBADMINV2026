<template>
  <div id="JobApplicants">
    <section class="JobApplicants">
      <v-skeleton-loader
        class="mx-auto"
        type="table"
        v-if="Loader"
      ></v-skeleton-loader>
      <div class="header contact-header">
        <h1>{{ $t("JobApplicants.title") }}</h1>
        <v-btn @click="goBack" class="btn btn-create">
          <v-icon>fal fa-arrow-left</v-icon>{{ $t("JobApplicants.back") }}
        </v-btn>
      </div>
      <div class="contact-content">
        <!-- Pending Applicants Title -->
        <h3 class="mt-2 mb-2">{{ $t("JobApplicants.pendingTitle") }}</h3>
        <v-data-table
          :headers="$t('JobApplicants.table.headers')"
          :items="pendingApplicants"
          :options.sync="options"
          :search="searchItem"
          :loading-text="$t('JobApplicants.loadingtext')"
          v-if="pendingApplicants.length > 0"
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
                :label="$t('JobApplicants.search')"
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
              <td>{{ item.name_and_surname }}</td>
              <td>{{ formatSalary(item.salary_expecting) }}</td>
              <td>{{ item.contact_number }}</td>
              <td>{{ item.province }}</td>
              <td>{{ item.sex }}</td>
              <td>{{ formatDateDisplay(item.createdAt) }}</td>
              <td>
                <v-chip
                  :color="getStatusColor(item.status)"
                  dark
                  small
                >
                  {{ getStatusLabel(item.status) }}
                </v-chip>
              </td>
              <td>
                <div class="action-buttons">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        small
                        v-bind="attrs"
                        v-on="on"
                        @click="onViewDetail(item)"
                      >
                        <v-icon small color="primary">fas fa-eye</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t("JobApplicants.actions.view") }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        small
                        v-bind="attrs"
                        v-on="on"
                        color="success"
                        @click="onConfirm(item)"
                      >
                        <v-icon small>fas fa-check</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t("JobApplicants.actions.confirm") }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        small
                        v-bind="attrs"
                        v-on="on"
                        color="error"
                        @click="onReject(item)"
                      >
                        <v-icon small>fas fa-times</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t("JobApplicants.actions.reject") }}</span>
                  </v-tooltip>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="Table-empty" v-else>
          <div class="image">
            <v-img src="@/assets/Images/NoData.png"></v-img>
          </div>
          <h3>{{ $t("JobApplicants.table.dontdata") }}</h3>
        </div>

        <!-- History Table -->
        <h3 class="mt-6 mb-2">{{ $t("JobApplicants.historyTitle") }}</h3>
        <v-data-table
          :headers="$t('JobApplicants.historyTable.headers')"
          :items="historyApplicants"
          :options.sync="historyOptions"
          :search="searchHistory"
          :loading-text="$t('JobApplicants.loadingtext')"
          v-if="historyApplicants.length > 0"
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
                :label="$t('JobApplicants.search')"
                filled
                rounded
                dense
                append-icon="fas fa-search"
                single-line
                hide-details
                v-model="searchHistory"
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>

          <template v-slot:item="{ item, index }">
            <tr class="table-content">
              <td>{{ getHistoryIndex(index) }}</td>
              <td>{{ item.name_and_surname }}</td>
              <td>{{ formatSalary(item.salary_expecting) }}</td>
              <td>{{ item.contact_number }}</td>
              <td>{{ item.province }}</td>
              <td>{{ item.sex }}</td>
              <td>{{ formatDateDisplay(item.createdAt) }}</td>
              <td>
                <v-chip
                  :color="getStatusColor(item.status)"
                  dark
                  small
                >
                  {{ getStatusLabel(item.status) }}
                </v-chip>
              </td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="onViewDetail(item)"
                    >
                      <v-icon small color="primary">fas fa-eye</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t("JobApplicants.actions.view") }}</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="Table-empty" v-else>
          <h3>{{ $t("JobApplicants.historyTable.dontdata") }}</h3>
        </div>
      </div>
    </section>

    <!-- Detail Dialog -->
    <v-dialog v-model="detailDialog" max-width="800" scrollable>
      <v-card v-if="selectedApplicant">
        <v-card-title class="headline">
          {{ $t("JobApplicants.detail.title") }}
          <v-spacer></v-spacer>
          <v-btn icon @click="detailDialog = false">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-4">
          <!-- Photo -->
          <div class="text-center mb-4" v-if="selectedApplicant.photo_url">
            <v-avatar size="100">
              <v-img :src="getImageUrl(selectedApplicant.photo_url)"></v-img>
            </v-avatar>
          </div>

          <!-- Personal Info -->
          <h3 class="mb-2">{{ $t("JobApplicants.detail.personalInfo") }}</h3>
          <v-simple-table dense class="mb-4">
            <tbody>
              <tr>
                <td class="font-weight-bold" width="200">{{ $t("JobApplicants.detail.name") }}</td>
                <td>{{ selectedApplicant.name_and_surname }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.dob") }}</td>
                <td>{{ formatDateDisplay(selectedApplicant.date_of_birth) }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.pob") }}</td>
                <td>{{ selectedApplicant.place_of_birth }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.sex") }}</td>
                <td>{{ selectedApplicant.sex }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.nationality") }}</td>
                <td>{{ selectedApplicant.nationality }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.maritalStatus") }}</td>
                <td>{{ selectedApplicant.marital_status }}</td>
              </tr>
            </tbody>
          </v-simple-table>

          <!-- Contact Info -->
          <h3 class="mb-2">{{ $t("JobApplicants.detail.contactInfo") }}</h3>
          <v-simple-table dense class="mb-4">
            <tbody>
              <tr>
                <td class="font-weight-bold" width="200">{{ $t("JobApplicants.detail.phone") }}</td>
                <td>{{ selectedApplicant.contact_number }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.email") }}</td>
                <td>{{ selectedApplicant.email }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.address") }}</td>
                <td>{{ selectedApplicant.current_address }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.village") }}</td>
                <td>{{ selectedApplicant.village }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.district") }}</td>
                <td>{{ selectedApplicant.district }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.province") }}</td>
                <td>{{ selectedApplicant.province }}</td>
              </tr>
            </tbody>
          </v-simple-table>

          <!-- Job Info -->
          <h3 class="mb-2">{{ $t("JobApplicants.detail.jobInfo") }}</h3>
          <v-simple-table dense class="mb-4">
            <tbody>
              <tr>
                <td class="font-weight-bold" width="200">{{ $t("JobApplicants.detail.jobTitle") }}</td>
                <td>{{ selectedApplicant.job ? selectedApplicant.job.title : '-' }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.jobType") }}</td>
                <td>{{ selectedApplicant.job && selectedApplicant.job.TypeJobs ? selectedApplicant.job.TypeJobs.name : '-' }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.jobDescription") }}</td>
                <td>{{ selectedApplicant.job ? selectedApplicant.job.description : '-' }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.company") }}</td>
                <td>{{ selectedApplicant.job ? selectedApplicant.job.company : '-' }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.salaryExpecting") }}</td>
                <td>{{ selectedApplicant.salary_expecting || '-' }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">{{ $t("JobApplicants.detail.howKnow") }}</td>
                <td>{{ selectedApplicant.how_know_job || '-' }}</td>
              </tr>
            </tbody>
          </v-simple-table>

          <!-- Education -->
          <div v-if="selectedApplicant.educations && selectedApplicant.educations.length > 0">
            <h3 class="mb-2">{{ $t("JobApplicants.detail.education") }}</h3>
            <v-simple-table dense class="mb-4">
              <thead>
                <tr>
                  <th>{{ $t("JobApplicants.detail.university") }}</th>
                  <th>{{ $t("JobApplicants.detail.qualification") }}</th>
                  <th>{{ $t("JobApplicants.detail.major") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="edu in selectedApplicant.educations" :key="edu.id">
                  <td>{{ edu.university_name }}</td>
                  <td>{{ edu.qualification }}</td>
                  <td>{{ edu.major }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>

          <!-- Trainings -->
          <div v-if="selectedApplicant.trainings && selectedApplicant.trainings.length > 0">
            <h3 class="mb-2">{{ $t("JobApplicants.detail.trainings") }}</h3>
            <v-simple-table dense class="mb-4">
              <thead>
                <tr>
                  <th>{{ $t("JobApplicants.detail.trainingCompany") }}</th>
                  <th>{{ $t("JobApplicants.detail.trainingDepartment") }}</th>
                  <th>{{ $t("JobApplicants.detail.trainingDuty") }}</th>
                  <th>{{ $t("JobApplicants.detail.trainingDuration") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="training in selectedApplicant.trainings" :key="training.id">
                  <td>{{ training.company_name }}</td>
                  <td>{{ training.department }}</td>
                  <td>{{ training.main_duty }}</td>
                  <td>{{ training.duration }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>

          <!-- Work Experiences -->
          <div v-if="selectedApplicant.workExperiences && selectedApplicant.workExperiences.length > 0">
            <h3 class="mb-2">{{ $t("JobApplicants.detail.workExperience") }}</h3>
            <v-simple-table dense class="mb-4">
              <thead>
                <tr>
                  <th>{{ $t("JobApplicants.detail.workPeriod") }}</th>
                  <th>{{ $t("JobApplicants.detail.workPosition") }}</th>
                  <th>{{ $t("JobApplicants.detail.workEmployer") }}</th>
                  <th>{{ $t("JobApplicants.detail.workSalary") }}</th>
                  <th>{{ $t("JobApplicants.detail.workDuties") }}</th>
                  <th>{{ $t("JobApplicants.detail.workReason") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="work in selectedApplicant.workExperiences" :key="work.id">
                  <td>{{ work.from_to }}</td>
                  <td>{{ work.position }}</td>
                  <td>{{ work.employer_name }}</td>
                  <td>{{ work.salary }}</td>
                  <td>{{ work.duties_description }}</td>
                  <td>{{ work.reason_for_leaving }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>

          <!-- Reference -->
          <div v-if="selectedApplicant.reference">
            <h3 class="mb-2">{{ $t("JobApplicants.detail.reference") }}</h3>
            <v-simple-table dense class="mb-4">
              <tbody>
                <tr v-if="selectedApplicant.reference.ref_name">
                  <td class="font-weight-bold" width="200">{{ $t("JobApplicants.detail.refName") }}</td>
                  <td>{{ selectedApplicant.reference.ref_name }}</td>
                </tr>
                <tr v-if="selectedApplicant.reference.ref_occupation">
                  <td class="font-weight-bold" width="200">{{ $t("JobApplicants.detail.refOccupation") }}</td>
                  <td>{{ selectedApplicant.reference.ref_occupation }}</td>
                </tr>
                <tr v-if="selectedApplicant.reference.ref_company">
                  <td class="font-weight-bold" width="200">{{ $t("JobApplicants.detail.refCompany") }}</td>
                  <td>{{ selectedApplicant.reference.ref_company }}</td>
                </tr>
                <tr v-if="selectedApplicant.reference.ref_address_tel">
                  <td class="font-weight-bold" width="200">{{ $t("JobApplicants.detail.refContact") }}</td>
                  <td>{{ selectedApplicant.reference.ref_address_tel }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>

          <!-- Signature -->
          <div v-if="selectedApplicant.signature || selectedApplicant.signature_date">
            <h3 class="mb-2">{{ $t("JobApplicants.detail.signature") }}</h3>
            <v-simple-table dense class="mb-4">
              <tbody>
                <tr v-if="selectedApplicant.signature">
                  <td class="font-weight-bold" width="200">{{ $t("JobApplicants.detail.signatureName") }}</td>
                  <td>{{ selectedApplicant.signature }}</td>
                </tr>
                <tr v-if="selectedApplicant.signature_date">
                  <td class="font-weight-bold" width="200">{{ $t("JobApplicants.detail.signatureDate") }}</td>
                  <td>{{ formatDateDisplay(selectedApplicant.signature_date) }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>

          <!-- Document -->
          <div v-if="selectedApplicant.document">
            <h3 class="mb-2">{{ $t("JobApplicants.detail.document") }}</h3>
            <a v-if="selectedApplicant.document.endsWith('.pdf')" :href="getImageUrl(selectedApplicant.document)" target="_blank" class="d-block mb-4">
              <v-icon left>fas fa-file-pdf</v-icon> {{ $t("JobApplicants.detail.viewDocument") }}
            </a>
            <v-img
              v-else
              :src="getImageUrl(selectedApplicant.document)"
              max-width="400"
              class="mb-4"
            ></v-img>
          </div>

          <!-- Status -->
          <div class="mt-4">
            <h3 class="mb-2">{{ $t("JobApplicants.detail.currentStatus") }}</h3>
            <v-chip :color="getStatusColor(selectedApplicant.status)" dark>
              {{ getStatusLabel(selectedApplicant.status) }}
            </v-chip>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            @click="onConfirm(selectedApplicant)"
            :disabled="selectedApplicant.status === 'approved'"
          >
            <v-icon left small>fas fa-check</v-icon>
            {{ $t("JobApplicants.actions.confirm") }}
          </v-btn>
          <v-btn
            color="error"
            @click="onReject(selectedApplicant)"
            :disabled="selectedApplicant.status === 'rejected'"
          >
            <v-icon left small>fas fa-times</v-icon>
            {{ $t("JobApplicants.actions.reject") }}
          </v-btn>
          <v-btn text @click="detailDialog = false">
            {{ $t("JobApplicants.actions.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Loader: false,
      applicants: [],
      searchItem: null,
      searchHistory: null,
      options: {},
      historyOptions: {},
      detailDialog: false,
      selectedApplicant: null,
    };
  },
  computed: {
    pendingApplicants() {
      return this.applicants.filter(item => item.status === 'pending');
    },
    historyApplicants() {
      return this.applicants.filter(item => item.status === 'approved' || item.status === 'rejected');
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: "jobs.index" }).catch(() => {});
    },

    async fetchApplicants() {
      this.Loader = true;
      try {
        const res = await this.$axios.get("find-job-application");
        if (res.status == 200) {
          this.applicants = res.data.data || res.data;
        }
      } catch (error) {
        this.showErrorNotification(error);
      } finally {
        this.Loader = false;
      }
    },

    onViewDetail(item) {
      this.selectedApplicant = item;
      this.detailDialog = true;
    },

    async onConfirm(item) {
      try {
        const res = await this.$axios.put(`change-status/${item.id}`, {
          status: "approved",
        });
        if (res.status == 200) {
          const idx = this.applicants.findIndex(a => a.id === item.id);
          if (idx !== -1) {
            this.$set(this.applicants, idx, { ...this.applicants[idx], status: "approved" });
          }
          this.$store.dispatch({
            type: "action_Notifi_Success",
            message: "Application confirmed successfully",
          });
        }
      } catch (error) {
        this.showErrorNotification(error);
      }
    },

    async onReject(item) {
      try {
        const res = await this.$axios.put(`change-status/${item.id}`, {
          status: "rejected",
        });
        if (res.status == 200) {
          const idx = this.applicants.findIndex(a => a.id === item.id);
          if (idx !== -1) {
            this.$set(this.applicants, idx, { ...this.applicants[idx], status: "rejected" });
          }
          this.$store.dispatch({
            type: "action_Notifi_Success",
            message: "Application rejected successfully",
          });
        }
      } catch (error) {
        this.showErrorNotification(error);
      }
    },

    getStatusColor(status) {
      switch (status) {
        case "approved":
          return "green";
        case "rejected":
          return "red";
        case "pending":
        default:
          return "orange";
      }
    },

    getStatusLabel(status) {
      switch (status) {
        case "approved":
          return this.$t("JobApplicants.status.confirmed");
        case "rejected":
          return this.$t("JobApplicants.status.rejected");
        case "pending":
        default:
          return this.$t("JobApplicants.status.pending");
      }
    },

    formatSalary(salary) {
      if (!salary) return "-";
      return Number(salary).toLocaleString() + " LAK";
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

    getGlobalIndex(index) {
      const { page, itemsPerPage } = this.options;
      if (!page || !itemsPerPage) return index + 1;
      return (page - 1) * itemsPerPage + index + 1;
    },

    getHistoryIndex(index) {
      const { page, itemsPerPage } = this.historyOptions;
      if (!page || !itemsPerPage) return index + 1;
      return (page - 1) * itemsPerPage + index + 1;
    },

    getImageUrl(path) {
      if (!path) return "";
      const baseUrl = process.env.VUE_APP_BASE_API_URL_TEST || "";
      // Remove /api/v1/ from base URL to get the server root
      const serverRoot = baseUrl.replace(/\/api\/v1\/?$/, "");
      return serverRoot + path;
    },

    showErrorNotification(error) {
      if (error.response && error.response.data) {
        setTimeout(() => {
          this.$store.dispatch({
            type: "action_Notifi_Error",
            message: `${error.response.data.error ? error.response.data.error.message : "An error occurred"}`,
          });
        }, 300);
      }
    },
  },

  created() {
    this.fetchApplicants();
  },
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
