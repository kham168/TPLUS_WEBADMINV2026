<template>
  <div id="Index">
    <section class="role-container">
     
     <!-- header -->
      <div class="header role-header">
        <h1>{{ $t("Role.title") }}</h1>

        <v-btn
          @click="$store.commit('IncrementRole')"
          class="btn btn-create"
        >
          <v-icon>fal fa-plus-circle</v-icon>
          {{ $t("Role.button") }}
        </v-btn>
      </div>

      <!-- end -->

      <!-- content -->
      <div class="role-content">
          <v-data-table
          :headers="$t('Role.table.headers')"
          :items="myUser"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('Role.loadingtext')"
          v-if="myUser != ''"
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
              <td>{{ item }}</td>
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
                        $router.push({ name: 'roles.edit' }).catch(() => {})
                      "
                    >
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Role.table.options.iconEdit")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("Role.table.options.edit") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Role.table.options.delicon")
                        }}</v-icon>
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

      <!-- end -->

      <AddRoleDialog/>
    </section>
  </div>
</template>

<script>

import AddRoleDialog from "../../components/dialog/addRole.vue"

export default {
  name: "Index",
  components:{
    AddRoleDialog,
  },
  data() {
    return {
        myUser:[],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>