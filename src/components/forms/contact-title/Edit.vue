<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="text-h6 grey lighten-2">
          <h4>{{ $t("Contact.Add-title-contact.form.editTitle") }}</h4>
        </v-card-title>

        <v-card-text>
          <div class="item-center">
            <v-form lazy-validation v-model="isValid" ref="form">
              <v-text-field
                :label="$t('Contact.Add-title-contact.form.label')"
                outlined
                required
                :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                v-model="titles.title_lao"
                :placeholder="$t('Contact.Add-title-contact.lao')"
              ></v-text-field>
              <v-text-field
                :label="$t('Contact.Add-title-contact.form.label')"
                outlined
                required
                :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                v-model="titles.title_eng"
                :placeholder="$t('Contact.Add-title-contact.english')"
              ></v-text-field>
            </v-form>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text @click="$store.commit('Contact/isEditModal', '')">
            {{ $t("Contact.Create.form.button.cancel") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            @click.prevent="UpdateContactTitle"
            color="yellow"
            :disabled="!isValid"
            :loading="isLoading"
          >
            {{ $t("Contact.Create.form.button.save") }}
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
      isValid: true,
      titles: {
        title_lao: null,
        title_eng: null,
        title_id:null
      },
      isLoading: false,
    };
  },
  mounted() {},

  watch: {
    getDataEdit() {
      this.titles = {
        title_lao: this.getDataEdit.title_lao,
        title_eng: this.getDataEdit.title_eng,
        title_id: this.getDataEdit.id
      };
    },
  },

  computed: {
    dialog() {
      return this.$store.getters["Contact/getEditModal"];
    },

    getDataEdit() {
      return this.$store.getters["Contact/Edits"];
    },
  },

  methods: {
    async UpdateContactTitle() {
      this.isLoading = true;
      await this.$axios
        .put(`titleContacts/${this.titles.title_id}`, {
          title: this.titles.title_lao,
          description: "",
          other_lang: [
            {
              title: this.titles.title_eng,
              description: "",
              language_id: 2,
            },
          ],
        })
        .then((res) => {
          if (res.status == 200) {
            this.$store.dispatch({
              type: "action_Notifi_Success",
              message: this.$t("Notification.editDataSuccess"),
            });
            setTimeout(() => {
              window.location.reload();
            }, 300);
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          if (error.response.data.error.status) {
            setTimeout(() => {
              this.$store.dispatch({
                type: "action_Notifi_Error",
                message: `${error.response.data.error.message}`,
              });
            }, 300);
          }
        });
    },
  },
};
</script>

<style scoped>
.item-center {
  text-align: center;
  width: 100%;
  padding-top: 30px;
}
</style>
