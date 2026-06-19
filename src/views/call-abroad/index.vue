<template>
  <div id="Call-Abroad">
    <section class="Call-Abroad">
      <v-skeleton-loader
        class="mx-auto"
        type="table"
        v-if="Loader"
      ></v-skeleton-loader>
      <div class="header contact-header">
        <h1>{{ $t("Call-Abroad.title") }}</h1>
        <v-btn @click="onCreate" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("Contact.button") }}</v-btn
        >
      </div>
      <div class="contact-content">
        <v-data-table
          :headers="$t('Call-Abroad.table.headers')"
          :items="dataCall"
          :search="searchItem"
          :loading-text="$t('Contact.loadingtext')"
          v-if="dataCall.length > 0"
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
                :label="$t('Call-Abroad.search')"
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
              <td v-if="!item.countryName_en">{{ item.countryName_la }}</td>
              <td v-if="item.countryName_en">{{ item.countryName_en }}</td>
              <td>{{ item.code }}</td>
              <td v-if=" !item.Zones.zoneName_en">{{ item.Zones.zoneName_la }}</td>
              <td v-if="item.Zones.zoneName_en">
                {{ item.Zones.zoneName_en }}
              </td>
              <td>{{ item.price_minute }}</td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link @click="onEdit(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Contact.table.options.iconEdit")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("Contact.table.options.edit") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Contact.table.options.delicon")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("Contact.table.options.delete") }}
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
          <h3>{{ $t("Contact.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
    <DeleteModal />
  </div>
</template>
<script>
import DeleteModal from "../../components/forms/call-abroad/Delete.vue";
export default {
  components: { DeleteModal },
  data() {
    return {
      Loader: false,
      dataCall: [],
      searchItem: null,
    };
  },
  methods: {
    onCreate() {
      this.$router.push({ name: "call-abroad.create" }).catch({});
    },
    onEdit(id) {
      console.log(id);
      this.$router
        .push({ name: "call-abroad.edit", params: { id: id } })
        .catch({});
    },
    onDelete(id) {
      this.$store.commit("isDeleteCallAbroadModal",id);
    },
    async fetchDataCall() {
      this.Loader = true;
      const lang = localStorage.getItem('lang') || 'la';
      await this.$axios
        .get(`internationCalls?lang=${lang}`)
        .then((res) => {
          if (res.status == 200) {
            this.dataCall = res.data.data;
          }
          this.Loader = false;
        })
        .catch((error) => {
          this.Loader = false;
          setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Error",
              message: `${error.response.data.error.message}`,
            });
          }, 300);
        });
    },
  },

  created() {
    this.fetchDataCall();
  },
};
</script>
