<template>
  <div id="Logo">
    <section class="logo-section">
      <v-skeleton-loader
          class="mx-auto"

          type="table"
          :loading="loading"
          v-if="firstLoad"
      ></v-skeleton-loader>
      <div class="header logo-header" v-show="!firstLoad">
        <h1>{{ $t("Logo.title") }}</h1>
        <!--        <v-btn @click="CreateLogo" class="btn btn-create">-->
        <!--          <v-icon>fal fa-plus-circle</v-icon>-->
        <!--          {{ $t("Logo.button") }}-->
        <!--        </v-btn>-->
      </div>
      <div class="logo-content" v-show="!firstLoad">
        <v-data-table
            :headers="$t('Logo.table.headers')"
            :items="logo['data']"
            :search="searchItem"
            :loading="loading"
            :loading-text="$t('Logo.loadingtext')"
            v-if="logo['data'] !==''"

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
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'Logo',


  data() {
    return {
      loading: false,
      searchItem: "",
      // logo: [],
      firstLoad:true
    };
  },

  mounted() {
    this.getLogo().then(res => {
      if (res && res.success) {
        this.firstLoad = false;
      } else {
        this.firstLoad = false;
        console.error("Failed to load logo", res);
      }
    }).catch(error => {
      this.firstLoad = false;
      console.error("Error fetching logo", error);
    });
  },
  methods: {
    fetchLogo() {
      this.$axios.get(`siteInfo`).then((res) => {
        if (res.status === 200) {
          this.logo = res.data.data;
          this.firstLoad=false
        }
      })
    },
    onEdit(logo_id) {
     // this.$store.commit("logo/SET_LOGO_ITEM", logo_id)
      this.$router.push({
        name: "logo.edit",
        params: {
          logo_id: logo_id
        }
      }).catch((error) => {
        console.log(error)
      });
    },

    ...mapActions({
      getLogo:'Logo/getLogo',
    })
  },
  created() {
    //this.fetchLogo();


  },

  computed:{
    ...mapGetters({
      logo:'Logo/logo'
    })
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
