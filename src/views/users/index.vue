<template>
  <div id="">
    <section class="user-container">
      <div class="header user-header">
        <h1>{{$t('Users.title')}}</h1>
        <v-btn @click="$router.push({name:'users.create'}).catch(()=>{})" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>
          {{$t('Users.button')}}
        </v-btn>
      </div>
      <div class="user-content">
        <v-data-table
          :headers="$t('Users.table.headers')"
          :items="myUser"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('Users.loadingtext')"
          v-if="myUser != ''"
        >
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
                        $router.push({ name: 'users.edit' }).catch(() => {})
                      "
                    >
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Users.table.options.iconEdit")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("Users.table.options.edit") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Users.table.options.delicon")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("Users.table.options.delete") }}
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
  name: "Index",

  data() {
    return {
        myUser:[],
        searchItem:null,
        loading:true,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>