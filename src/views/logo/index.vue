<template>
  <div id="Logo">
    <section class="logo-section">
      <div class="header logo-header">
        <h1>{{ $t("Logo.title") }}</h1>
        <!--        <v-btn @click="CreateLogo" class="btn btn-create">-->
        <!--          <v-icon>fal fa-plus-circle</v-icon>-->
        <!--          {{ $t("Logo.button") }}-->
        <!--        </v-btn>-->
      </div>
      <div class="logo-content">
        <v-data-table
            :headers="$t('Logo.table.headers')"
            :items="logo"
            :search="searchItem"
            :loading="loading"
            :loading-text="$t('Logo.loadingtext')"
            v-if="logo !==''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                  :label="$t('Logo.txtsearch')"
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
              <td>{{ index + 1 }}</td>
              <td>
                <v-img class="image-table" :src="item.websiteLogo"/>
              </td>
              <td>
                <div v-if="item.SiteInfoTrans && item.SiteInfoTrans.length">
                  {{ item.SiteInfoTrans[0].siteName }}
                </div>
                <div v-else>
                  {{ item.siteName }}
                </div>
              </td>
              <td>
                <div v-if="item.SiteInfoTrans && item.SiteInfoTrans.length">
                  {{ item.SiteInfoTrans[0].address }}
                </div>
                <div v-else>
                  {{ item.address }}
                </div>
              </td>
              <td>{{ item.email }}</td>
              <td>{{ item.facebook }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{on,attrs}">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link @click="onEdit(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{ $t('Logo.table.options.iconEdit') }}</v-icon>
                        <v-list-item-title>
                          {{ $t('Logo.table.options.edit') }}
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
          <h3>{{ $t("Logo.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Logo',

  data() {
    return {
      loading: false,
      searchItem: "",
      logo: [],
    };
  },

  methods: {
    fetchLogo() {
      this.$axios.get(`siteInfo`).then((res) => {
        if (res.status === 200) {
          this.logo = res.data.data;
        }
      })
    },
    onEdit(logo_id) {
      this.$store.commit("logo/SET_LOGO_ITEM", logo_id)
      this.$router.push({
        name: "logo.edit",
        query: {
          logo_id: logo_id
        }
      });
    }
  },
  created() {
    this.fetchLogo();
  }
};
</script>

<style lang="scss" scoped>
.logo-section {
  width: 100%;
  background-color: $white-color;

  .logo-content {
    width: 100%;
    padding: 1rem;

  }
}
</style>
