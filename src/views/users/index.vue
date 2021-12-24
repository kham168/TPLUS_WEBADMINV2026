<template>
  <div id="">
    <section class="user-container">
      <v-skeleton-loader
          class="mx-auto"

          type="table"
          :loading="loading"
          v-if="firstLoad"
      ></v-skeleton-loader>
      <div class="header user-header" v-show="!firstLoad">
        <h1>{{ $t('Users.title') }}</h1>
        <v-btn @click="onCreate" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>
          {{ $t('Users.button') }}
        </v-btn>
      </div>
      <div class="user-content" v-show="!firstLoad">
        <v-data-table
            :headers="$t('Users.table.headers')"
            :items="listUser"
            :search="searchItem"
            :loading="loading"
            :loading-text="$t('Users.loadingtext')"
            v-if="listUser != ''">
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                  :label="$t('Users.txtsearch')"
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
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>
                <!--                {{ item.status }}-->
                <div v-if="item.status === 'active'">
                  <span class="active">Active</span>
                </div>
                <div v-if="item.status === 'inactive'">
                  <span class="inactive">inactive</span>
                </div>
                <div v-if="item.status === 'suspended'">
                  <span class="suspended">suspended</span>
                </div>
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
                            $t("Users.table.options.iconEdit")
                          }}
                        </v-icon>
                        <v-list-item-title>
                          {{ $t("Users.table.options.edit") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="addRole(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                            $t("Users.table.options.aroleicon")
                          }}
                        </v-icon>
                        <v-list-item-title>
                          {{ $t("Users.table.options.addRole") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="addPermission(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                            $t("Users.table.options.aroleicon")
                          }}
                        </v-icon>
                        <v-list-item-title>
                          ເພີ່ມສິດການໃຊ້ງານ
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
          <h3>{{ $t("Users.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchItem: null,
      loading: false,
      listUser: [],
      firstLoad:true,
    };
  },
  methods: {
    addRole(user_id) {
      this.$router.push({
        name: "roleUser.index",
        params: {
          user_id: user_id,
        }
      })
    },
    addPermission(user_id) {
      this.$router.push({
        name: "permissionUser.index",
        params: {
          user_id: user_id
        }
      })
    },
    fetchUser() {
      this.$axios.get(`users`).then((res) => {
        if (res.status === 200) {
          this.listUser = res.data.data;
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
        name: "users.create"
      })
    },

    onEdit(user_id) {
      this.$store.commit("users/SET_USER_ID", user_id)
      this.$router.push({
        name: "users.edit",
        query: {
          user_id: user_id,
        }
      })
    }
  },

  created() {
    this.fetchUser();
  },
};
</script>

<style lang="scss" scoped>
.active {
  background: rgba(38, 222, 129, 1.0);
  padding: 1px 8px;
  color: #ffffff;
  border-radius: 30px;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 300;
}

.inactive {
  padding: 1px 8px;
  color: #ffffff;
  border-radius: 30px;
  background: rgba(252, 92, 101, 1.0);
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 300;
}

.suspended {
  padding: 1px 8px;
  color: #ffffff;
  border-radius: 30px;
  background: rgba(75, 101, 132, 1.0);
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 300;
}
</style>
