<template>
  <div id="Contact">
    <section class="contact-section">
      <v-skeleton-loader
        class="mx-auto"
        type="table"
        :loading="loading"
        v-if="firstLoad"
      ></v-skeleton-loader>
      <div class="header contact-header" v-show="!firstLoad">
        <h1>{{ $t("Contact.title") }}</h1>
        <v-btn @click="CreateContact" class="btn btn-create" v-if="false">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("Contact.button") }}</v-btn
        >
      </div>
      <div class="contact-content" v-show="!firstLoad">
        <v-data-table
          :headers="$t('Contact.table.headers')"
          :items="contact['data']"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('Contact.loadingtext')"
          v-if="contact['data'] != ''"
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
                :label="$t('Contact.txtsearch')"
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
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.title }}</td>
              <td
                style=" max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;"
              >
                {{ item.description }}
              </td>
              <td>
                <v-btn icon @click="onShow(item.id)">
                  <v-icon large>
                    mdi-eye
                  </v-icon></v-btn
                >
              </td>

              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      link
                      @click="
                        $router
                          .push({
                            name: 'contact.edit',
                            params: { contact_id: item.id },
                          })
                          .catch(() => {})
                      "
                    >
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
      <ModalDelete>
        <template v-slot="{ close }">
          <Delete :contact_id="contact_id" @close="close" />
        </template>
      </ModalDelete>

      <ModalShow>
        <template v-slot="{ close }">
          <Show :contact_id="contact_id" @close="close" />
        </template>
      </ModalShow>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Delete from "../../components/forms/contact/Delete";
import Show from "../../components/forms/contact/Show";
import ModalShow from "../../components/Modals/modalShow";
export default {
  name: "Contact",

  components: {
    Delete,
    Show,
    ModalShow,
  },
  data() {
    return {
      contact_id: "",
      loading: false,

      searchItem: "",
      firstLoad: true,
    };
  },

  mounted() {
    this.getContact().then((res) => {
      if (res.success) {
        this.firstLoad = false;
      }
    });
  },

  methods: {
    CreateContact() {
      this.$router
        .push({
          name: "contact.create",
        })
        .catch(() => {});
    },
    onDelete(contact_id) {
      this.contact_id = contact_id;

      this.$store.commit("modalDelete_State", true);
    },
    onShow(contact_id) {
      this.contact_id = contact_id;

      this.$store.commit("modalShow_State", true);
    },

    ...mapActions({
      getContact: "Contact/getContact",
    }),
  },

  computed: {
    ...mapGetters({
      contact: "Contact/contact",
    }),
  },
};
</script>

<style lang="scss" scoped>
.contact-section {
  width: 100%;
  background-color: $white-color;

  .contact-content {
    width: 100%;
    padding: 1rem;
  }
}
</style>
