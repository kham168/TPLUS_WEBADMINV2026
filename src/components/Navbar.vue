<template>
  <div id="#Navbar">
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-avatar size="30" color="red">
        <img src="../assets/Images/logo.png" alt="K"/>
      </v-avatar>
      <v-btn icon class="mx-3">
        <v-icon>fas fa-bell</v-icon>
      </v-btn>
      <v-menu offset-y rounded="round">
        <template v-slot:activator="{ attrs, on }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-icon>fas fa-ellipsis-v</v-icon>
          </v-btn>
        </template>
        <div class="list">
          <v-list>
            <div class="language">
              <v-icon>fas fa-language</v-icon>
              <h3>{{ $t("Navbar.selectLanguage") }}</h3>
            </div>
            <v-list-item-group active-class="deep-black--text text--accent-4">
              <v-list-item
                  link
                  v-for="locale in locales"
                  :key="locale"
                  @click="switchLocales(locale)"
              >
                <span class="locale--title">
                  <span><i class="far fa-globe-europe"></i></span>{{ localeNames[locale] }}</span>
              </v-list-item>
            </v-list-item-group>

<!--            <div class="setting">-->
<!--              <v-icon>fas fa-cog</v-icon>-->
<!--              <h3>{{ $t("Navbar.setting") }}</h3>-->
<!--            </div>-->
            <v-list-item link @click="LoggoutUser">
              <v-list-item-icon>
                <v-icon medium>fas fa-power-off</v-icon>
              </v-list-item-icon>
              <v-list-item-title text-center>
                {{ $t("Navbar.logout") }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-menu>
    </v-app-bar>

    <div class="drawer">
      <v-navigation-drawer app v-model="drawer">
        <template v-slot:prepend>
          <v-list-item two-line>
            <div class="logo">
              <img
                  width="50"
                  height="50"
                  constain
                  class="shrink"
                  transition="scale-transition"
                  src="../assets/Images/logo.png"
                  alt="alt"
              />
              <h1>TPLUS</h1>
            </div>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group active-class="deep-black--text text--accent-4">
            <v-list-item
                link
                v-for="(item, index) in $t('MyMenuDashboard')"
                :key="index"
                @click="ClickTo(item.router)"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>

            <v-list-group color="black">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>far fa-newspaper</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ $t('Postmenu.title') }}</v-list-item-title>
              </template>
              <v-list-item
                  link
                  v-for="subtitle in $t('Postmenu.subtitle')"
                  :key="subtitle.key"
                  @click="$router.push(subtitle.router)"
              >
                <v-list-item-icon>
                  <v-icon small>{{ subtitle.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ subtitle.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-list-group color="black" v-if="$store.state.menus.users.roles.includes(authRole)">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>fas fa-users</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ $t('Usermenu.title') }}</v-list-item-title>
              </template>
              <v-list-item
                  link
                  v-for="subtitle in $t('Usermenu.subtitle')"
                  :key="subtitle.key"
                  @click="$router.push(subtitle.router)"
              >
                <v-list-item-icon>
                  <v-icon small>{{ subtitle.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ subtitle.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list-group>
            <v-list-group color="black">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>fab fa-product-hunt</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ $t('Productmenu.title') }}</v-list-item-title>
              </template>
              <v-list-item
                  link
                  v-for="subtitle in $t('Productmenu.subtitle')"
                  :key="subtitle.key"
                  @click="$router.push(subtitle.router)"
              >
                <v-list-item-icon>
                  <v-icon small>{{ subtitle.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ subtitle.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list-group>
            <v-list-group color="black">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>fas fa-gift</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ $t('Packagemenu.title') }}</v-list-item-title>
              </template>
              <v-list-item
                  link
                  v-for="subtitle in $t('Packagemenu.subtitle')"
                  :key="subtitle.key"
                  @click="$router.push(subtitle.router)"
              >
                <v-list-item-icon>
                  <v-icon small>{{ subtitle.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ subtitle.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list-group>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"


export default {
  name: "Navbar",

  data() {
    return {
      locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(","),
      localeNames: {en: "English", la: "Lao"},
      drawer: true,
    };
  },
  mounted() {

  },

  methods: {
    ...mapActions({
      LogoutUser: "User/destroyToken"
    }),
    ClickTo(router) {
      this.$router.push(router);
    },
    // switch language
    switchLocales(locale) {
      if (this.$i18n.locale !== locale) {
        this.$i18n.locale = locale;
        localStorage.setItem("lang", locale);
        window.location.reload();
      }
    },
    // Loggout
    LoggoutUser() {
      this.LogoutUser().then(res => {
        if (res) {
          alert("Loggout Success")
        }
      })
    }
  },
  computed: {
    authRole() {
      return (localStorage.getItem('roleUser') || "").toLowerCase();
    }
  }
};
</script>

<style lang="scss" scoped>
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: $primary-color;

  .v-btn > .v-btn__content .v-icon {
    color: $black-color;
  }
}

.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #3d3d3d !important;
}

.list {
  width: 200px;

  .language {
    display: flex;
    gap: 1rem;
    padding: 0 1rem;
    font-size: 14px;
  }
}
.locale--title{
  padding: 0 8px;
  span{
    i{
      font-size: 16px;
    }
  }
}

.setting {
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
  margin: 1rem 0;
}
</style>
