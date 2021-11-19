<template>
  <div id="Login">
    <div class="login-container">
      <div class="card-login">
        <div class="card--title">
          <v-menu offset-y rounded="round">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on">
                <v-icon class="mx-3">fas fa-language</v-icon>
                <h3>{{ $i18n.locale }}</h3>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                link
                v-for="locale in locales"
                :key="locale"
                @click="switchLocales(locale)"
              >
                <span class="locale--title">{{ localeNames[locale] }}</span>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-row>
          <v-col cols="6">
            <div class="header">
              <h3>{{ $t("Login.header") }}</h3>
            </div>
            <h5 class="show-error">{{$store.getters['User/ShowMsgErrors']}}</h5>
            <div class="form">
              <v-form ref="form" lazy-validation v-model="valid">
                <v-text-field
                  v-model="users.username"
                  :label="$t('Login.form.email')"
                  required
                  placeholder="jon.doe@example.com"
                  outlined
                  dense
                  append-icon="fas fa-envelope"
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                ></v-text-field>
                <v-text-field
                  v-model="users.password"
                  :label="$t('Login.form.pass')"
                  required
                  outlined
                  dense
                  :append-icon="showpass ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  :type="showpass ? 'password' : 'text'"
                  @click:append="showpass = !showpass"
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                ></v-text-field>
              </v-form>
              <v-btn
                :loading="loading"
                @click="Login"
                :disabled="!valid"
                class="btn-login"
                >{{ $t("Login.form.button") }}</v-btn
              >
              <div class="forget-pass">
                <a href="#" class="forget-pass">{{
                  $t("Login.form.forget pass")
                }}</a>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="image">
              <v-img src="../assets/Images/Secure.png"></v-img>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
  name: "Login",

  data() {
    return {
      locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(","),
      localeNames: { en: "EN", la: "LA" },
      showpass: true,
      valid: true,
      users: {
        username: "",
        password: "",
      },
      loading: false,
    };
  },

  mounted() {},

  methods: {
     ...mapActions({
      AdminLogin: 'User/LoginUser'
    }),

    Login() {
      this.loading = true;
      this.$refs.form.validate();
      this.AdminLogin(this.users).then(()=>{
       setTimeout(() => {
          this.$store.dispatch({
          type:"action_Notifi_Success",
          message:this.$t('Notification.loginSuccess')
        })
       }, 300);
      }).catch(()=>{
        this.loading=false;
      })
    },
    // switch language
    switchLocales(locale) {
      console.log(locale);
      if (this.$i18n.locale !== locale) {
        this.$i18n.locale = locale;
        localStorage.setItem("lang", locale);
        window.location.reload();
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
    109.6deg,
    rgba(255, 219, 47, 1) 11.2%,
    rgba(244, 253, 0, 1) 100.2%
  );

  .card-login {
    width: 70%;
    background-color: $white-color;
    border-radius: 0.5rem;
    padding: 2rem 2rem;

    .card--title {
      display: flex;
      justify-content: flex-end;
    }

    .image {
      width: 80%;
      padding: 2rem 1rem;
      overflow: hidden;
      object-fit: cover;
    }

    .header {
      width: 100%;
      padding: 1rem 0;

      h3 {
        font-size: 1.5rem;
        font-weight: 800;
        color: $primary-color;
      }
    }

    .form {
      width: 100%;
      padding: 1rem 0;
    }

    .btn-login {
      width: 100%;
      padding: 0.5rem 2rem;
      background-color: $primary-color;
      font-size: 1.1rem;
      transition: all ease-in-out 0.3s;
      border-radius: 0.1rem;

      &:hover {
        background-color: $secondary-color;
      }
      &:active {
        background-color: $primary-color;
      }
      &:disabled {
        background-color: $primary-light;
      }
    }

    .forget-pass {
      text-align: right;
      width: 100%;
      padding: 0.5rem 0;

      a.forget-pass {
        text-align: center;
        color: $primary-color;
        margin: 1rem 0;
        text-decoration: none;
        transition: all 0.5s ease;

        &:hover {
          text-decoration: underline $primary-color;
        }
      }
    }
  }
}
</style>