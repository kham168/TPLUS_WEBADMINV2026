<template>
  <div id="Index">
    <section class="role-container">
      <div class="header role-header">
        <h1>
          <span
            @click="back"
            style="margin-right: 10px; color: #4b96da; cursor: pointer"
          >
            <i class="fas fa-arrow-circle-left"></i></span
          >Role User
        </h1>
        <v-btn @click="onCreate" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>
          ເພີ່ມຂໍ້ມູນ
        </v-btn>
      </div>
      <!-- end -->
      <!-- content -->
      <div class="role-content">
        <v-data-table
          v-if="listUserRole != ''"
          :headers="$t('RoleUser.table.headers')"
          :search="searchItem"
          :loading="loading"
          :items="listUserRole"
          :loading-text="$t('RoleUser.loadingtext')"
          :footer-props="{
            'items-per-page-text': $t('row_per_page'),
          }"
          :no-data-text="$t('no_data')"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('RoleUser.txtsearch')"
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
                    <v-btn
                      icon
                      v-on="on"
                      v-bind="attrs"
                      @click="showPermission(item.id)"
                    >
                      <i class="fas fa-eye" style="font-size: 18px"></i>
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
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small
                          >{{ $t("RoleUser.table.options.delicon") }}
                        </v-icon>
                        <v-list-item-title>
                          {{ $t("RoleUser.table.options.delete") }}
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
          <h3>{{ $t("RoleUser.table.dontdata") }}</h3>
        </div>
        <!-- end -->
      </div>
      <ModalAdd>
        <template v-slot="{ close }">
          <addRoleUser @close="close" @success="fetchRoleUser" />
        </template>
      </ModalAdd>

      <ModalDelete>
        <template v-slot="{ close }">
          <deleteRoleUser
            @close="close"
            :role_id="role_id"
            :user_id="user_id"
            @success="fetchRoleUser()"
          />
        </template>
      </ModalDelete>

      <ModalShow>
        <template v-slot="{ close }">
          <showAllPermission
            @close="close"
            :listPermission="listPermission"
            @success="fetchRoleUser()"
          />
        </template>
      </ModalShow>

      <!-- end -->
    </section>
  </div>
</template>

<script>
import addRoleUser from "./addRoleUser";
import deleteRoleUser from "../../../views/users/RoleUser/deleteRoleUser";
import showAllPermission from "./showAllPermission";

export default {
  components: {
    addRoleUser,
    deleteRoleUser,
    showAllPermission,
  },
  data() {
    return {
      searchItem: "",
      loading: false,
      user_id: this.$route.params.user_id,
      role_id: "",
      listUserRole: [],
      listPermission: [],
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "users.index",
      });
    },
    showPermission(role_id) {
      this.role_id = role_id;
      this.$axios.get(`roles/${this.role_id}/permissions`).then((res) => {
        if (res.status === 200) {
          this.listPermission = res.data.data.permissions;
        }
      });
      this.$store.commit("modalShow_State", true);
    },
    fetchRoleUser() {
      this.$axios.get(`users-roles/${this.user_id}`).then((res) => {
        if (res.status === 200) {
          this.listUserRole = res.data.data.roles;
        }
      });
    },
    onCreate() {
      this.$store.commit("modalAdd_State", true);
    },
    onDelete(role_id) {
      this.role_id = role_id;
      this.$store.commit("modalDelete_State", true);
    },
  },
  created() {
    this.fetchRoleUser();
  },
};
</script>

<style lang="scss" scoped></style>
