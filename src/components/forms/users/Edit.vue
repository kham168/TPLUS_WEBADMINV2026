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
                    v-model="users.Employee.firtName"
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
                    v-model="users.Employee.surName"
                    required
                    outlined
                    :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    :label="$t('Users.Create.form.email')"
                    v-model="users.email"
                    required
                    outlined
                    type="email"
                    :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                    $myValidator.EmailValidate($t('Validate.email')),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    :label="$t('Users.Create.form.username')"
                    v-model="users.username"
                    required
                    outlined
                    :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" class="field-change-password">
                <v-select
                    outlined
                    label="Status"
                    :items="userStatus"
                    item-value="name"
                    item-text="name"
                    v-model="users.status"
                >

                </v-select>
              </v-col>
              <div class="hide-password" style="width: 100%">
                <v-switch class="switch-change" @change="changeStatus"
                          v-model="hiddenChangePassword"
                          :label="`ປ່ຽນລະຫັດຜ່ານ`"
                ></v-switch>
                <v-col cols="12" md="12" class="field-change-password" v-if="hiddenChangePassword ===true">
                  <v-text-field
                      :label="$t('Users.Create.form.pass')"
                      v-model="users.password"
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
              </div>
            </v-row>
          </v-form>
          <div class="form-actions">
            <v-btn plain @click="resetForm" class="mx-5">{{
                $t("Users.Create.form.button.cancel")
              }}
            </v-btn>
            <v-btn
                :loading="btnLoading"
                :disabled="!valid"
                @click="submitForm"
                class="btn btn-create"
            >
              {{ $t("Users.Create.form.button.save") }}
            </v-btn
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
      user_id: this.$route.query.user_id,
      valid: true,
      users: {},
      hiddenChangePassword: false,

      userStatus: [
        {
          name: "active",
        },
        {
          name: "inactive",
        },
        {
          name: "suspended",
        }
      ]

    };
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.$router.back();
    },
    changeStatus(val) {
      this.hiddenChangePassword = val;
    },
    submitForm() {
      this.btnLoading = true;

      const item = {
        firstName: this.users.Employee.firtName,
        surName: this.users.Employee.surName,
        email: this.users.email,
        username: this.users.username,
        password: this.users.password,
        status: this.users.status
      }
      this.$axios.put(`users/${this.users.id}`, item).then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Success",
              message: this.$t("Notification.saveDataSuccess"),
            });
          }, 300);
        }
        this.btnLoading = false;
        this.resetForm();
      }).catch((error) => {
        this.btnLoading = false;
        if (error.response.data.error.status === 422) {
          setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Error",
              message: `${error.response.data.error.message}`
            })
          }, 300);
        }
      })
    },

  },

  created() {
    this.$store.dispatch("users/fetchUser", this.user_id).then((res) => {
      if (res.status === 200) {
        this.users = res.data.data;
      }
    })
  }
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
