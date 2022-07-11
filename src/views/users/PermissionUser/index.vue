<template>
  <div id="Index">
    <section class="role-container">
      <div class="header role-header">
        <h1><span @click="back" style="margin-right: 10px;color: #4b96da;cursor: pointer">
          <i class="fas fa-arrow-circle-left"></i></span>Permission User
        </h1>
        <v-btn
            @click="onCreate"
            class="btn btn-create"
        >
          <v-icon>fal fa-plus-circle</v-icon>
          ເພີ່ມຂໍ້ມູນ
        </v-btn>
      </div>
      <!-- end -->
      <!-- content -->
      <div class="role-content">
        <v-data-table
            :headers="$t('permissionRole.table.headers')"
            :search="searchItem"
            :loading="loading"
            :items="listUserPermission"
            :loading-text="$t('permissionRole.loadingtext')"
            v-if="listUserPermission != ''"
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
                  :label="$t('permissionRole.txtsearch')"
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
              <td>{{ item.createdAt }}</td>
              <td>{{ item.updatedAt }}</td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                            $t("permissionRole.table.options.delicon")
                          }}
                        </v-icon>
                        <v-list-item-title>
                          {{ $t("permissionRole.table.options.delete") }}
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
            <v-img :src="require('@/assets/Images/NoData.png')"></v-img>
          </div>
          <h3>{{ $t("permissionRole.table.dontdata") }}</h3>
        </div>
        <!-- end -->
      </div>
      <ModalAdd>
        <template v-slot="{ close }">
          <addPermissionUser @close="close" @success="fetchPermissionUser"/>
        </template>
      </ModalAdd>

      <ModalDelete>
        <template v-slot="{close}">
          <deletePermissionUser @close="close" :permission_id="permission_id" :user_id="user_id"
                                @success="fetchPermissionUser()"/>
        </template>
      </ModalDelete>
      <!-- end -->
    </section>
  </div>
</template>

<script>
import addPermissionUser from "./addPermissionUser";
import deletePermissionUser from "@/views/users/PermissionUser/deletePermissionUser.vue"

export default {
  components: {
    addPermissionUser,
    deletePermissionUser
  },
  data() {
    return {
      searchItem: "",
      loading: false,
      user_id: this.$route.params.user_id,
      permission_id: "",
      listUserPermission: [],

    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "users.index"
      })
    },
    fetchPermissionUser() {
      this.$axios.get(`users-permissions/${this.user_id}`).then((res) => {
        if (res.status === 200) {
          this.listUserPermission = res.data.data.permissions;
          console.log(this.listUserPermission)
        }
      })
    },
    onCreate() {
      this.$store.commit("modalAdd_State", true);
    },
    onDelete(permission_id) {
      this.permission_id = permission_id;
      this.$store.commit("modalDelete_State", true);
    },

  },
  created() {
    this.fetchPermissionUser();
  }
};
</script>

<style lang="scss" scoped>
</style>
