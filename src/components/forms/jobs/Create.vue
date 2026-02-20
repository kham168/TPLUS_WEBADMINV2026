<template>
  <div id="Create-Jobs">
    <section class="Create-jobs">
      <div class="header contact-header">
        <h1>{{ $t("Jobs.Create.header") }}</h1>
      </div>
      <div class="create-contents">
        <div class="form">
          <v-form lazy-validation ref="form" v-model="isValid">
            <v-row>
              <!-- TITLE -->
              <v-col cols="12">
                <v-text-field
                  :label="$t('Jobs.form.title')"
                  outlined
                  required
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                  v-model="DataJob.title"
                ></v-text-field>
              </v-col>

              <!-- COMPANY -->
              <v-col cols="6">
                <v-text-field
                  :label="$t('Jobs.form.company')"
                  outlined
                  required
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                  v-model="DataJob.company"
                ></v-text-field>
              </v-col>

              <!-- TYPE JOB ID -->
              <v-col cols="6">
                <v-select
                  :items="typeJobItems"
                  item-text="name"
                  item-value="id"
                  v-model="DataJob.type_job_id"
                  :label="$t('Jobs.form.type_job_id')"
                  outlined
                  :loading="isLoadingTypeJobs"
                  :disabled="isLoadingTypeJobs"
                  clearable
                ></v-select>
              </v-col>

              <!-- LOCATION -->
              <v-col cols="6">
                <v-text-field
                  :label="$t('Jobs.form.location')"
                  outlined
                  required
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                  v-model="DataJob.location"
                ></v-text-field>
              </v-col>

              <!-- TYPE -->
              <v-col cols="6">
                <v-select
                  :items="typeItems"
                  item-text="text"
                  item-value="value"
                  v-model="DataJob.type"
                  :label="$t('Jobs.form.type')"
                  outlined
                  required
                  :rules="[
                    $myValidator.SelectValidate($t('Validate.required')),
                  ]"
                ></v-select>
              </v-col>

              <!-- SALARY -->
              <v-col cols="12">
                <v-text-field
                  :label="$t('Jobs.form.salary')"
                  outlined
                  :placeholder="$t('Jobs.form.salary_placeholder')"
                  v-model="DataJob.salary"
                ></v-text-field>
              </v-col>

              <!-- DESCRIPTION -->
              <v-col cols="12">
                <v-textarea
                  :label="$t('Jobs.form.description')"
                  outlined
                  rows="4"
                  v-model="DataJob.description"
                ></v-textarea>
              </v-col>

              <!-- DATE SECTION DIVIDER -->
              <v-col cols="12">
                <v-divider class="my-4"></v-divider>
                <div class="d-flex align-center mb-2">
                  <v-icon color="primary" class="mr-2">mdi-calendar-range</v-icon>
                  <h3 class="text-subtitle-1 font-weight-medium">
                    {{ $t('Jobs.form.date_range_title') }}
                  </h3>
                </div>
                <p class="text-caption grey--text text--darken-1 ml-8 mb-3">
                  {{ $t('Jobs.form.date_range_subtitle') }}
                </p>
              </v-col>

              <!-- START DATE with Menu Picker -->
              <v-col cols="12" md="6">
                <v-menu
                  ref="startDateMenu"
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedStartDate"
                      :label="$t('Jobs.form.start_date')"
                      prepend-inner-icon="mdi-calendar-start"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      :hint="$t('Jobs.form.start_date_hint')"
                      persistent-hint
                      required
                      :rules="[
                        $myValidator.SimpleValidate($t('Validate.required')),
                      ]"
                      clearable
                      @click:clear="DataJob.start_date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="DataJob.start_date"
                    @input="startDateMenu = false"
                    :min="todayDate"
                    locale="lo"
                    scrollable
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!-- END DATE with Menu Picker -->
              <v-col cols="12" md="6">
                <v-menu
                  ref="endDateMenu"
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedEndDate"
                      :label="$t('Jobs.form.end_date')"
                      prepend-inner-icon="mdi-calendar-end"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      :hint="$t('Jobs.form.end_date_hint')"
                      persistent-hint
                      required
                      :rules="[
                        $myValidator.SimpleValidate($t('Validate.required')),
                        validateDates
                      ]"
                      clearable
                      @click:clear="DataJob.end_date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="DataJob.end_date"
                    @input="endDateMenu = false"
                    :min="DataJob.start_date || todayDate"
                    locale="lo"
                    scrollable
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!-- Duration Alert - Success -->
              <v-col cols="12" v-if="durationDays && durationDays > 0">
                <v-alert
                  color="success"
                  dense
                  text
                  outlined
                  class="mb-0"
                >
                  <div class="d-flex align-center">
                    <v-icon small left color="success">mdi-information-outline</v-icon>
                    <span>{{ $t('Jobs.form.total_days') }} <strong>{{ durationDays }} ມື້</strong></span>
                  </div>
                </v-alert>
              </v-col>

              <!-- Duration Alert - Error -->
              <v-col cols="12" v-else-if="DataJob.start_date && DataJob.end_date && durationDays <= 0">
                <v-alert
                  color="error"
                  dense
                  text
                  class="mb-0"
                >
                  <v-icon small left>mdi-alert-circle</v-icon>
                  {{ $t('Jobs.form.date_error') }}
                </v-alert>
              </v-col>

              <!-- LOGO SECTION -->
              <v-col cols="6">
                <label class="image-label">{{ $t("Jobs.form.logo") }}</label>

                <div class="upload-image" v-if="previewLogo == null">
                  <div class="content">
                    <i class="fas fa-plus-circle"></i>
                    <h3>Logo</h3>
                  </div>
                  <input
                    type="file"
                    class="choose-file"
                    name="upload-logo"
                    accept="image/*"
                    @change="uploadLogo"
                  />
                </div>

                <!-- ✅ Added class "logo-box" -->
                <div class="image logo-box" v-else>
                  <img :src="previewLogo" alt="Logo preview" class="image-files" />
                  <div class="increase-decrease-image">
                    <v-btn class="mx-2" color="error" dark fab small @click="removeLogo">
                      <v-icon dark>mdi-close</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" color="primary" dark fab small @click="$refs.logoUploader.click()">
                      <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                    <input
                      ref="logoUploader"
                      accept="image/*"
                      class="d-none"
                      type="file"
                      @change="uploadLogo"
                    />
                  </div>
                </div>
                <p class="text-caption grey--text mt-2">{{ $t('Jobs.form.max_file_size') }}</p>
              </v-col>

              <!-- IMAGE DETAILS SECTION -->
              <v-col cols="6">
                <label class="image-label">{{ $t('Jobs.form.image_details') }}</label>

                <div class="upload-image" v-if="previewImageDetails == null">
                  <div class="content">
                    <i class="fas fa-plus-circle"></i>
                    <h3>Jobs Image Details</h3>
                  </div>
                  <input
                    type="file"
                    class="choose-file"
                    name="upload-details"
                    accept="image/*"
                    @change="uploadImageDetails"
                  />
                </div>

                <!-- ✅ Added class "details-box" -->
                <div class="image details-box" v-else>
                  <img :src="previewImageDetails" alt="Image details preview" class="image-files" />
                  <div class="increase-decrease-image">
                    <v-btn class="mx-2" color="error" dark fab small @click="removeImageDetails">
                      <v-icon dark>mdi-close</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" color="primary" dark fab small @click="$refs.detailsUploader.click()">
                      <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                    <input
                      ref="detailsUploader"
                      accept="image/*"
                      class="d-none"
                      type="file"
                      @change="uploadImageDetails"
                    />
                  </div>
                </div>
                <p class="text-caption grey--text mt-2">{{ $t('Jobs.form.max_file_size') }}</p>
              </v-col>

              <!-- IS ACTIVE -->
              <v-col cols="12">
                <v-switch
                  v-model="DataJob.is_active"
                  :label="$t('Jobs.form.is_active')"
                  color="success"
                ></v-switch>
              </v-col>
            </v-row>
          </v-form>

          <!-- ACTION BUTTONS -->
          <div class="text-right mt-4">
            <v-btn
              @click.prevent="ResetForm"
              color="success"
              text
              large
            >
              {{ $t("Jobs.options.cancel") }}
            </v-btn>
            <v-btn
              @click.prevent="SubmitJob"
              :loading="isLoading"
              :disabled="!isValid"
              class="btn btn-create ml-3"
              color="primary"
              large
            >
              {{ $t("Jobs.options.save") }}
            </v-btn>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const JOB_TYPES = [
  { text: "Full-time", value: "Full-time" },
  { text: "Part-time", value: "Part-time" },
  { text: "Contract", value: "Contract" },
];

const REDIRECT_DELAY = 300;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default {
  name: "CreateJob",

  data() {
    return {
      isValid: false,
      isLoading: false,
      isLoadingTypeJobs: false,
      startDateMenu: false,
      endDateMenu: false,
      typeItems: JOB_TYPES,
      typeJobItems: [],
      DataJob: {
        title: null,
        type_job_id: null,
        company: null,
        logo_url: null,
        image_details: null,
        location: null,
        description: null,
        type: null,
        salary: null,
        start_date: null,
        end_date: null,
        is_active: true,
      },
      previewLogo: null,
      previewImageDetails: null,
    };
  },

  computed: {
    todayDate() {
      const today = new Date();
      return today.toISOString().substr(0, 10);
    },

    formattedStartDate() {
      if (!this.DataJob.start_date) return '';
      return this.formatDateDisplay(this.DataJob.start_date);
    },

    formattedEndDate() {
      if (!this.DataJob.end_date) return '';
      return this.formatDateDisplay(this.DataJob.end_date);
    },

    durationDays() {
      if (!this.DataJob.start_date || !this.DataJob.end_date) return null;
      const start = new Date(this.DataJob.start_date);
      const end = new Date(this.DataJob.end_date);
      const diffTime = end - start;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  },

  methods: {
    formatDateDisplay(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    SubmitJob() {
      if (this.$refs.form.validate()) {
        this.PostDataJob();
      }
    },

    validateDates() {
      if (!this.DataJob.start_date || !this.DataJob.end_date) return true;
      const start = new Date(this.DataJob.start_date);
      const end = new Date(this.DataJob.end_date);
      return end > start || this.$t('Jobs.form.date_error');
    },

    buildFormData() {
      const formData = new FormData();
      const fields = [
        'title', 'company', 'location', 'description',
        'type', 'salary', 'start_date', 'end_date', 'is_active'
      ];

      fields.forEach(field => {
        if (this.DataJob[field] != null) {
          formData.append(field, this.DataJob[field]);
        }
      });

      if (this.DataJob.type_job_id) {
        formData.append('type_job_id', this.DataJob.type_job_id);
      }

      ['logo_url', 'image_details'].forEach(fileField => {
        if (this.DataJob[fileField]) {
          formData.append(fileField, this.DataJob[fileField]);
        }
      });

      return formData;
    },

    async PostDataJob() {
      this.isLoading = true;
      try {
        const bodyFormData = this.buildFormData();
        const res = await this.$axios.post('create-job', bodyFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (res.status === 200 || res.status === 201) {
          this.$store.dispatch({
            type: 'action_Notifi_Success',
            message: this.$t('Notification.saveDataSuccess'),
          });
          setTimeout(() => {
            this.$router.push({ name: 'jobs.index' });
          }, REDIRECT_DELAY);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error?.message
          || error.message
          || this.$t('Notification.unknownError');
        this.$store.dispatch({
          type: 'action_Notifi_Error',
          message: errorMessage,
        });
      } finally {
        this.isLoading = false;
      }
    },

    ResetForm() {
      this.$refs.form.reset();
      this.previewLogo = null;
      this.previewImageDetails = null;
      this.$router.push({ name: 'jobs.index' });
    },

    async fetchTypeJobs() {
      this.isLoadingTypeJobs = true;
      try {
        const response = await this.$axios.get('find-all-type-job');
        if (response.status === 200 && response.data) {
          this.typeJobItems = response.data.data || response.data;
        }
      } catch (error) {
        console.error('Error fetching type jobs:', error);
        this.$store.dispatch({
          type: 'action_Notifi_Error',
          message: 'Failed to load job types',
        });
      } finally {
        this.isLoadingTypeJobs = false;
      }
    },

    uploadLogo(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > MAX_FILE_SIZE) {
        this.$store.dispatch({
          type: 'action_Notifi_Error',
          message: 'ໄຟລ່ມີຂະໜາດໃຫຍ່ເກີນໄປ (ສູງສຸດ 5MB)',
        });
        return;
      }
      this.DataJob.logo_url = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.previewLogo = e.target.result;
      };
    },

    removeLogo() {
      this.DataJob.logo_url = null;
      this.previewLogo = null;
      if (this.$refs.logoUploader) {
        this.$refs.logoUploader.value = '';
      }
    },

    uploadImageDetails(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > MAX_FILE_SIZE) {
        this.$store.dispatch({
          type: 'action_Notifi_Error',
          message: 'ໄຟລ່ມີຂະໜາດໃຫຍ່ເກີນໄປ (ສູງສຸດ 5MB)',
        });
        return;
      }
      this.DataJob.image_details = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.previewImageDetails = e.target.result;
      };
    },

    removeImageDetails() {
      this.DataJob.image_details = null;
      this.previewImageDetails = null;
      if (this.$refs.detailsUploader) {
        this.$refs.detailsUploader.value = '';
      }
    },
  },

  mounted() {
    this.fetchTypeJobs();
  },
};
</script>

<style lang="scss" scoped>
.create-contents {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    width: 80%;
    padding: 20px 0;
  }
}

[class*="col-"] {
  width: 100%;
  padding: 0 10px;
}

.v-divider {
  margin: 16px 0;
}

.v-alert {
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
}

.btn-create {
  min-width: 120px;
}

.image-label {
  display: block;
  font-size: 14px;
  color: #616161;
  margin-bottom: 8px;
  font-weight: 500;
}

.upload-image {
  width: 100%;
  height: 200px;
  border-radius: 4px;
  position: relative;
  transition: all ease 0.3s;
  border: 2px dashed #e0e0e0;
  background-color: #fafafa;
  cursor: pointer;

  &:hover {
    border-color: #1976d2;
    background-color: #f5f8ff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;

    i {
      font-size: 2.5rem;
      color: #9e9e9e;
      margin-bottom: 10px;
      display: block;
    }

    h3 {
      font-size: 0.95rem;
      font-weight: 500;
      color: #757575;
    }
  }

  .choose-file {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
  }
}

.image {
  position: relative;
  width: 100%;
  height: 200px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f5f5;

  .image-files {
    width: 100%;
    height: 100%;
    object-fit: cover; // default
  }

  // ✅ Logo: show full image, never crop
  &.logo-box .image-files {
    object-fit: contain;
  }

  // ✅ Details: show full image, never crop
  &.details-box .image-files {
    object-fit: cover;
  }

  .increase-decrease-image {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;
    display: flex;
    gap: 8px;
  }
}
</style>