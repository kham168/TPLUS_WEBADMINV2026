<template>
  <div id="Index">
    <section class="role-container">
      <div class="header role-header">
        <h1><span @click="back" style="margin-right: 10px;color: #4b96da;cursor: pointer">
          <i class="fas fa-arrow-circle-left"></i></span>{{ $t("permissionRole.title") }}
        </h1>
        <v-btn
            @click="onCreate"
            class="btn btn-create"
        >
          <v-icon>fal fa-plus-circle</v-icon>
          {{ $t("permissionRole.button") }}
        </v-btn>
      </div>
      <!-- end -->
      <!-- content -->
      <div class="role-content">
        <v-data-table
            :headers="$t('permissionRole.table.headers')"
            :search="searchItem"
            :loading="loading"
            :items="permissionRole"
            :loading-text="$t('permissionRole.loadingtext')"
            v-if="permissionRole != ''"
        >
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
            <v-img src="../../assets/Images/NoData.png"></v-img>
          </div>
          <h3>{{ $t("permissionRole.table.dontdata") }}</h3>
        </div>
        <!-- end -->
      </div>
      <ModalAdd>
        <template v-slot="{ close }">
          <addPermissionInRole @close="close" @success="fetchPermissionRole()"/>
        </template>
      </ModalAdd>

      <ModalDelete>
        <template v-slot="{close}">
          <deletePermissionRole :role_id="role_id" :permissionRole_id="permissionRole_id" @close="close"
                                @success="fetchPermissionRole()"/>
        </template>
      </ModalDelete>
      <!-- end -->
    </section>
  </div>
</template>

<script>
import addPermissionInRole from "./addPermissionInRole";
import deletePermissionRole from "./deletePermissionRole"

export default {
  components: {
    addPermissionInRole,
    deletePermissionRole
  },
  data() {
    return {
      searchItem: "",
      loading: false,
      role_id: this.$route.params.role_id,
      permissionRole: [],
      permissionRole_id: "",

    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "roles.index"
      })
    },
    fetchPermissionRole() {
      this.$axios.get(`roles/${this.role_id}/permissions`).then((res) => {
        if (res.status === 200) {
          this.permissionRole = res.data.data.permissions;
          console.log(this.permissionRole, 555555555555)
        }
      })
    },
    onCreate() {
      this.$store.commit("modalAdd_State", true);
    },
    onDelete(permissionRole_id) {
      this.permissionRole_id = permissionRole_id;
      this.$store.commit("modalDelete_State", true);
    },

  },
  created() {
    this.fetchPermissionRole();
  }
};
</script>

<style lang="scss" scoped>
</style>
