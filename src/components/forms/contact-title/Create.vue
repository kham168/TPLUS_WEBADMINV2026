<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="text-h6 grey lighten-2">
          <h4>{{ $t("Contact.Add-title-contact.form.title") }}</h4>
        </v-card-title>

        <v-card-text>
          <div class="item-center">
            <v-form lazy-validation v-model="isValid" ref="form">
              <v-text-field
                :label="$t('Contact.Add-title-contact.form.label')"
                outlined
                required
                :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                placeholder="Lao"
                v-model="addTitle.title_lao"
              ></v-text-field>
              <v-text-field
                :label="$t('Contact.Add-title-contact.form.label')"
                outlined
                required
                :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                placeholder="English"
                v-model="addTitle.title_eng"
              ></v-text-field>
            </v-form>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text @click="$store.commit('Contact/isCreateModal')">
            {{ $t("Contact.Create.form.button.cancel") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="postTitle" color="yellow" :disabled="!isValid" :loading="isLoading">
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
      isLoading: false,
      addTitle: {
        title_lao: null,
        title_eng: null,
        description: null,
      },
    };
  },
  computed: {
    dialog() {
      return this.$store.getters["Contact/getCreateModal"];
    },
  },

  methods: {
    async postTitle() {
      this.isLoading = true;
      this.$axios.post("titleContacts", {
        title: this.addTitle.title_lao,
        description: this.addTitle.description,
        other_lang: [
          {
            title: this.addTitle.title_eng,
            description: this.addTitle.description,
            language_id:2
          },
        ],
      }).then((res)=>{
        if(res.status == 200){
          this.$store.dispatch({
              type: "action_Notifi_Success",
              message: this.$t("Notification.saveDataSuccess"),
            });
            setTimeout(() => {
              window.location.reload();
            }, 300);
        }
        this.isLoading = false;
      }).catch((error)=>{
        this.btnLoading = false;
        if (error.response.data.error.status === 422) {
          setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Error",
              message: `${error.response.data.error.message}`
            })
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
