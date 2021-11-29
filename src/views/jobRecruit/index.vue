<template>
  <div id="Index">
    <section class="permisstion-container">
      <div class="header permission-header">
        <h1>JobRecruit</h1>
      </div>
      <div class="permission-content">
        <v-data-table
            :headers="$t('permission.table.headers')"
            :items="listJobRecruit"
            :search="searchItem"
            :loading="loading"
            :loading-text="$t('permission.loadingtext')"
            v-if="listJobRecruit != ''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                  :label="$t('permission.txtsearch')"
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
              <template v-for="(item) in item.JobSeekers">
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.surName }}
                </td>
                <td>
                  {{ item.phone }}
                </td>
                <td>{{ item.email }}</td>
              </template>
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
                  <template v-slot:activator="{on,attrs}">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{ $t('permission.table.options.delicon') }}</v-icon>
                        <v-list-item-title>
                          {{ $t('permission.table.options.delete') }}
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
            <v-img src="../../assets/Images/NoData.png"></v-img>
          </div>
          <h3>{{ $t("permission.table.dontdata") }}</h3>
        </div>
      </div>
      <ModalDelete>
        <template v-slot="{close}">
          <Delete @close="close"/>
        </template>
      </ModalDelete>
    </section>
  </div>
</template>

<script>
import Delete from "../../components/forms/permission/Delete";

export default {
  components: {
    Delete
  },

  data() {
    return {
      listJobRecruit: [],
      searchItem: "",
      loading: false,
    };
  },
  methods: {
    onDelete(permission_id) {
      this.permission_id = permission_id;
      this.$store.commit("modalDelete_State", true);
    },

    fetchJobRecruit() {
      this.$axios.get(`jobRecuit`).then((res) => {
        if (res.status === 200) {
          this.listJobRecruit = res.data.data;
          console.log(this.listJobRecruit)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  created() {
    this.fetchJobRecruit();
  }
};
</script>

<style lang="scss" scoped>
</style>
