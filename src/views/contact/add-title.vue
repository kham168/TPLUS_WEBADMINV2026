<template>
  <div id="add-title">
    <section class="contact-add-title">
      <v-skeleton-loader
        class="mx-auto"
        type="table"
        v-if="Loader"
      ></v-skeleton-loader>
      <div v-else>
        <div class="header contact-header">
          <h1>{{ $t("Contact.Add-title-contact.title") }}</h1>
          <v-btn @click="CreateTitleContact" class="btn btn-create">
            <v-icon>fal fa-plus-circle</v-icon>{{ $t("Contact.button") }}</v-btn
          >
        </div>
        <div class="contact-content">
          <v-data-table
            :headers="$t('Contact.Add-title-contact.table.headers')"
            :items="TitleContacts"
            :search="searchItem"
            :loading-text="$t('Contact.loadingtext')"
            v-if="TitleContacts.length > 0"
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
                <td>{{ item.title }}</td>
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
      </div>
    </section>
    <EditModal />
    <CreateModal />
    <DeleteModal />
  </div>
</template>

<script>
import EditModal from "../../components/forms/contact-title/Edit.vue";
import CreateModal from "../../components/forms/contact-title/Create.vue";
import DeleteModal from "../../components/forms/contact-title/Delete.vue";
import { mapMutations, Mutation } from "vuex";
export default {
  name: "TplusWebAdminAddTitle",
  components: { EditModal, CreateModal, DeleteModal },
  data() {
    return {
      isLoading: true,
      Loader: false,
      searchItem: null,
      TitleContacts: [],
      dataEdit: {},
    };
  },
  created() {
    this.fetchContactTitle();
  },

  mounted() {},

  methods: {
    ...mapMutations({
      isCreate: "Contact/isCreateModal",
      isDelete: "Contact/isDeleteModal",
    }),
    async fetchContactTitle() {
      this.Loader = true;
      await this.$axios
        .get("titleContacts")
        .then((res) => {
          if (res.status == 200) {
            const data = res.data.data;
            if (localStorage.getItem("lang") == "en") {
              // this.TitleContacts = data.map(item => item.TitleContactTrans)
              for (const value of data.map((item) => item.TitleContactTrans)) {
                this.TitleContacts.push(value[0]);
              }
            } else {
              this.TitleContacts = data;
            }
          }
          this.Loader = false;
        })
        .catch((error) => {
          this.Loader = false;
          console.log(error);
          if (error.response.data.error.status === 500) {
            setTimeout(() => {
              this.$store.dispatch({
                type: "action_Notifi_Error",
                message: `${error.response.data.error.message}`,
              });
            }, 300);
          }
        });
    },
    CreateTitleContact() {
      this.isCreate();
    },
    async onEdit(id) {
      if (id) {
        await this.$axios
          .get(`titleContacts/${id}`, {
            headers: {
              content_language: "en",
            },
          })
          .then((res) => {
            if (res.status == 200) {
              const data = res.data.data;

              let args = {
                id: data.id,
                title_lao: data.title,
                title_eng: data.TitleContactTrans.find((item) => item.title)
                  .title,
              };
              this.$store.commit("Contact/isEditModal", args);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    onDelete(id) {
      this.isDelete(id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
