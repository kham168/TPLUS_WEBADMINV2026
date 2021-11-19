<template>
  <div id="Create">
    <section class="user-create">
      <div class="header user-header">
        <h1>{{ $t("Users.Create.header") }}</h1>
      </div>
      <div class="user-content">
        <div class="user-form">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  :label="$t('Users.Create.form.firstname')"
                  required
                  outlined
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :label="$t('Users.Create.form.lastname')"
                  required
                  outlined
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :label="$t('Users.Create.form.email')"
                  required
                  outlined
                  type="email"
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                    $myValidator.EmailValidate($t('Validate.email')),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :label="$t('Users.Create.form.phone')"
                  required
                  type="number"
                  counter="10"
                  placeholder="20xxxxxxxx"
                  outlined
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                    $myValidator.MaxlengthValidate(
                      $t('Validate.maxmessage'),
                      11
                    ),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :label="$t('Users.Create.form.username')"
                  required
                  outlined
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :label="$t('Users.Create.form.pass')"
                  required
                  outlined
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                    $myValidator.PassValidate($t('Validate.password')),
                  ]"
                  :append-icon="showpass ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  :type="showpass ? 'password' : 'text'"
                  @click:append="showpass = !showpass"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <div class="form-actions">
            <v-btn plain @click="reset" class="mx-5">{{
              $t("Users.Create.form.button.cancel")
            }}</v-btn>
            <v-btn
              :loading="btnLoading"
              :disabled="!valid"
              @click="submitForm"
              class="btn btn-create"
            >
              {{ $t("Users.Create.form.button.save") }}</v-btn
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Create",

  data() {
    return {
      btnLoading: false,
      showpass: true,
      showconpass: true,
      valid: true,
      users: {
        firstname: "",
        lastname: "",
        email: "",
        phone: 20,
        username: "",
        password: "",
      },
    };
  },
  created(){
  this.submitForm();
  },
  mounted() {},

  methods: {
    submitForm() {
      this.btnLoading = true;
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.$axios.post(`/register`, this.users).then((res) => {
          if (res.data.code === 200) {
            setTimeout(() => {
              this.$store.dispatch({
                type: "action_Notifi_Success",
                message: this.$t("Notification.saveDataSuccess"),
              });
            }, 300);
          }
          this.btnLoading=false;
        }).catch(()=>{
          this.btnLoading=false;
        })
      }
    },
    reset() {
      this.$refs.form.reset();
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-content {
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .user-form {
    width: 70%;

    .form-actions {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>