<template>
  <div id="Index">
    <section class="role-container">
      <v-skeleton-loader
          class="mx-auto"
          type="table"
          :loading="loading"
          v-if="firstLoad"
      ></v-skeleton-loader>
      <div class="header role-header" v-show="!firstLoad">
        <h1>{{ $t("Role.title") }}</h1>
        <v-btn
            @click="onCreate"
            class="btn btn-create"
        >
          <v-icon>fal fa-plus-circle</v-icon>
          {{ $t("Role.button") }}
        </v-btn>
      </div>
      <!-- end -->
      <!-- content -->
      <div class="role-content" v-show="!firstLoad">
        <v-data-table
            :headers="$t('Role.table.headers')"
            :items="listRole"
            :search="searchItem"
            :loading="loading"
            :loading-text="$t('Role.loadingtext')"
            v-if="listRole != ''"
            :footer-props="{
            'items-per-page-text': $t('row_per_page'),
          }"
          :no-data-text="$t('no_data')"
        >
          <template v-slot:[`footer.page-text`]="items">
            {{ items.pageStart }} - {{ items.pageStop }} {{ $t("of") }}
            {{ items.itemsLength }}
          </template>
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                  :label="$t('Role.txtsearch')"
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
              <td>
                <div v-if="item.description">
                  {{ item.description }}
                </div>
                <div v-else>
                  <span><i style="color: #ff001b" class="far fa-minus"></i></span>
                </div>
              </td>
              <td>{{ item.createdAt }}</td>
              <td>{{ item.updatedAt }}</td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-on="on" v-bind="attrs" @click="addPermissionInRole(item.id)">
                      <i style="font-size: 20px" class="far fa-plus-circle"></i>
                    </v-btn>
                  </template>
                </v-menu>
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
                        @click="onEdit(item.id)"
                    >
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                            $t("Role.table.options.iconEdit")
                          }}
                        </v-icon>
                        <v-list-item-title>
                          {{ $t("Role.table.options.edit") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                            $t("Role.table.options.delicon")
                          }}
                        </v-icon>
                        <v-list-item-title>
                          {{ $t("Role.table.options.delete") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </template>
        </v-data-table>
        <!-- Table is empty -->
        <div class="Table-empty" v-else>
          <div class="image">
            <v-img src="../../assets/Images/NoData.png"></v-img>
          </div>
          <h3>{{ $t("Role.table.dontdata") }}</h3>
        </div>
        <!-- end -->
      </div>
      <ModalDelete>
        <template v-slot="{close}">
          <Delete :role_id="role_id" @close="close" @success="fetchRole()"/>
        </template>
      </ModalDelete>
      <!-- end -->
    </section>
  </div>
</template>

<script>
import Delete from "../../components/forms/role/Delete";

export default {
  components: {
    Delete
  },
  data() {
    return {
      listRole: [],
      searchItem: "",
      loading: false,
      role_id: "",
      firstLoad:true
    };
  },
  methods: {

    fetchRole() {
      this.$axios.get(`roles`).then((res) => {
        if (res.status === 200) {
          this.listRole = res.data.data;
          this.firstLoad=false
        }
      }).catch((error) => {
        if (error.response.status === 403) {
          setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Error",
              message: `${error.response.data.message}`
            })
            this.$router.push({
              name:"ErrorRole"
            })
          }, 300);
        }
      })
    },
    onCreate() {
      this.$router.push({
        name: "roles.create"
      })
    },
    onEdit(role_id) {
      this.$store.commit("role/SET_ROLE_ID", role_id);
      this.$router.push({
        name: "roles.edit",
        query: {
          role_id: role_id
        }
      })
    },
    onDelete(role_id) {
      this.role_id = role_id;
      this.$store.commit("modalDelete_State", true);
    },
    addPermissionInRole(role_id) {
      console.log(role_id)
      this.$router.push({
        name: "permissionRole.index",
        params: {
          role_id: role_id
        }
      })
    }
  },
  created() {
    this.fetchRole();
  }
};
</script>

<style lang="scss" scoped>
</style>
