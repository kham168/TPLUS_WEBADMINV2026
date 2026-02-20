<template>
  <div id="Edit-Jobs">
    <section class="Edit-jobs">
      <div class="header contact-header">
        <h1>{{ $t("Jobs.Edit.header") }}</h1>
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
                    ຊ່ວງເວລາເປີດຮັບສະໝັກ
                  </h3>
                </div>
                <p class="text-caption grey--text text--darken-1 ml-8 mb-3">
                  ກຳນົດວັນທີ່ປະກາດວຽກຈະສະແດງ ແລະ ຮັບສະໝັກວຽກ
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
                      label="ວັນເລີ່ມເປີດຮັບສະໝັກ"
                      prepend-inner-icon="mdi-calendar-start"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      hint="ຄລິກເພື່ອເລືອກວັນທີ່ເລີ່ມສະແດງປະກາດວຽກ"
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
                      label="ວັນປິດຮັບສະໝັກ"
                      prepend-inner-icon="mdi-calendar-end"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      hint="ວັນສຸດທ້າຍທີ່ຜູ້ສະໝັກສາມາດສະໝັກວຽກໄດ້"
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
                    :min="DataJob.start_date"
                    locale="lo"
                    scrollable
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!-- Duration Alert -->
              <v-col cols="12" v-if="durationDays && durationDays > 0">
                <v-alert color="success" dense text outlined class="mb-0">
                  <div class="d-flex align-center">
                    <v-icon small left color="success">mdi-information-outline</v-icon>
                    <span>ເປີດຮັບສະໝັກທັງໝົດ: <strong>{{ durationDays }} ມື້</strong></span>
                  </div>
                </v-alert>
              </v-col>

              <!-- LOGO SECTION -->
              <v-col cols="6">
                <label class="image-label">{{ $t("Post.Create.form.picture") }}</label>
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
                <p class="text-caption grey--text mt-2">ຂະໜາດໄຟລ່ສູງສຸດ 5MB</p>
              </v-col>

              <!-- IMAGE DETAILS SECTION -->
              <v-col cols="6">
                <label class="image-label">{{ $t('Jobs.form.image_details') }}</label>
                <div class="upload-image" v-if="previewImageDetails == null">
                  <div class="content">
                    <i class="fas fa-plus-circle"></i>
                    <h3>Image Details</h3>
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
                <p class="text-caption grey--text mt-2">ຂະໜາດໄຟລ່ສູງສຸດ 5MB</p>
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
            <v-btn @click.prevent="ResetForm" color="success" text large>
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
// Extract constants
const JOB_TYPES = [
  { text: "Full-time", value: "Full-time" },
  { text: "Part-time", value: "Part-time" },
  { text: "Contract", value: "Contract" },
];

const REDIRECT_DELAY = 300;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default {
  name: "EditJob",

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
      originalData: null,
    };
  },

  computed: {
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
      return `${day}/${month}/${date.getFullYear()}`;
    },

    resolveImageUrl(path) {
      if (!path) return null;
      if (path.startsWith('http')) return path;
      const baseUrl = process.env.VUE_APP_BASE_SOCKET || 'http://192.168.43.219:7000';
      return `${baseUrl}/${path.replace(/^\//, '')}`;
    },

    validateDates() {
      if (!this.DataJob.start_date || !this.DataJob.end_date) return true;
      const start = new Date(this.DataJob.start_date);
      const end = new Date(this.DataJob.end_date);
      return end > start || 'ວັນປິດຮັບສະໝັກຕ້ອງມາຫຼັງວັນເລີ່ມເປີດຮັບສະໝັກ';
    },

    async getDataJobById() {
      try {
        const res = await this.$axios.get(`find-job-by-id/${this.$route.params.id}`);
        if (res.status === 200) {
          const data = res.data.data;
          this.DataJob = {
            title: data.title,
            type_job_id: data.type_job_id,
            company: data.company,
            logo_url: data.logo_url,
            image_details: data.image_details,
            location: data.location,
            description: data.description,
            type: data.type,
            salary: data.salary,
            start_date: data.start_date,
            end_date: data.end_date,
            is_active: data.is_active,
          };
          this.originalData = { ...this.DataJob };

          // Set previews for existing images
          if (data.logo_url) this.previewLogo = this.resolveImageUrl(data.logo_url);
          if (data.image_details) this.previewImageDetails = this.resolveImageUrl(data.image_details);
        }
      } catch (error) {
        this.showErrorNotification(error);
      }
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
      } finally {
        this.isLoadingTypeJobs = false;
      }
    },

    uploadLogo(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > MAX_FILE_SIZE) {
        this.$store.dispatch({ type: 'action_Notifi_Error', message: 'ໄຟລ່ມີຂະໜາດໃຫຍ່ເກີນໄປ (ສູງສຸດ 5MB)' });
        return;
      }
      this.DataJob.logo_url = file;
      const reader = new FileReader();
      reader.onload = (e) => this.previewLogo = e.target.result;
      reader.readAsDataURL(file);
    },

    removeLogo() {
      this.DataJob.logo_url = null;
      this.previewLogo = null;
    },

    uploadImageDetails(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > MAX_FILE_SIZE) {
        this.$store.dispatch({ type: 'action_Notifi_Error', message: 'ໄຟລ່ມີຂະໜາດໃຫຍ່ເກີນໄປ (ສູງສຸດ 5MB)' });
        return;
      }
      this.DataJob.image_details = file;
      const reader = new FileReader();
      reader.onload = (e) => this.previewImageDetails = e.target.result;
      reader.readAsDataURL(file);
    },

    removeImageDetails() {
      this.DataJob.image_details = null;
      this.previewImageDetails = null;
    },

    buildFormData() {
      const formData = new FormData();
      const fields = ['title', 'company', 'location', 'description', 'type', 'salary', 'start_date', 'end_date', 'is_active'];
      fields.forEach(f => {
        if (this.DataJob[f] != null) formData.append(f, this.DataJob[f]);
      });
      if (this.DataJob.type_job_id) formData.append('type_job_id', this.DataJob.type_job_id);

      // Only append files if they are new File objects
      if (this.DataJob.logo_url instanceof File) formData.append('logo_url', this.DataJob.logo_url);
      if (this.DataJob.image_details instanceof File) formData.append('image_details', this.DataJob.image_details);

      return formData;
    },

    async onEditDataJob() {
      this.isLoading = true;
      try {
        const bodyFormData = this.buildFormData();
        const res = await this.$axios.put(`update-job/${this.$route.params.id}`, bodyFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (res.status === 200) {
          this.$store.dispatch({ type: 'action_Notifi_Success', message: this.$t('Notification.editDataSuccess') });
          setTimeout(() => this.$router.push({ name: 'jobs.index' }), REDIRECT_DELAY);
        }
      } catch (error) {
        this.showErrorNotification(error);
      } finally {
        this.isLoading = false;
      }
    },

    SubmitJob() {
      if (this.$refs.form.validate()) this.onEditDataJob();
    },

    ResetForm() {
      this.$refs.form.reset();
      this.$router.push({ name: 'jobs.index' });
    },

    showErrorNotification(error) {
      const message = error.response?.data?.error?.message || error.message;
      this.$store.dispatch({ type: 'action_Notifi_Error', message });
    }
  },

  created() {
    this.getDataJobById();
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
  border: 2px dashed #e0e0e0;
  border-radius: 4px;
  position: relative;
  background-color: #fafafa;
  cursor: pointer;
  &:hover {
    border-color: #1976d2;
    background-color: #f5f8ff;
  }
  .content {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    text-align: center;
    i { font-size: 2.5rem; color: #9e9e9e; margin-bottom: 10px; display: block; }
    h3 { font-size: 0.95rem; font-weight: 500; color: #757575; }
  }
  .choose-file {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }
}

.image {
  position: relative;
  width: 100%;
  height: 200px;
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

  // ✅ Details: fill the box
  &.details-box .image-files {
    object-fit: cover;
  }

  .increase-decrease-image {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 8px;
  }
}

.btn-create { min-width: 120px; }
</style>