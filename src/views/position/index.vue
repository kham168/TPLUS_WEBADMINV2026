<template>
  <div id="Logo">
    <section class="logo-section">
      <div class="header logo-header">
        <h1>{{ $t("position.title") }}</h1>
        <v-btn @click="onCreate" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>
          {{ $t("position.button") }}
        </v-btn>
      </div>
      <div class="logo-content">
        <v-data-table
            :headers="$t('position.table.headers')"
            :items="position"
            :itemid="position"
            :search="searchItem"
            :loading="loading"
            :loading-text="$t('position.loadingtext')"
            v-if="position !==''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                  :label="$t('position.txtsearch')"
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
              <td>{{ item.description }}</td>
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
                    <v-list-item link @click="onEdit(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{ $t('position.table.options.iconEdit') }}</v-icon>
                        <v-list-item-title>
                          {{ $t('Logo.table.options.edit') }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{ $t('position.table.options.delicon') }}</v-icon>
                        <v-list-item-title>
                          {{ $t('position.table.options.delete') }}
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
          <h3>{{ $t("position.table.dontdata") }}</h3>
        </div>
      </div>
      <ModalDelete>
        <template v-slot="{close}">
          <Delete :position_id="position_id" @close="close" @success="fetchPosition()"/>
        </template>
      </ModalDelete>

    </section>
  </div>
</template>

<script>
import Delete from "../../components/forms/position/Delete";

export default {
  components: {
    Delete
  },
  data() {
    return {
      loading: false,
      searchItem: "",
      position: [],
      position_id: ""
    };
  },

  methods: {
    onCreate() {
      this.$router.push({
        name: "position.create"
      })
    },
    onDelete(position_id) {
      this.position_id = position_id;
      this.$store.commit("modalDelete_State", true);
    },
    fetchPosition() {
      this.$axios.get(`position`).then((res) => {
        if (res.status === 200) {
          this.position = res.data.data;
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    onEdit(position_id) {
      this.$store.commit("position/SET_POSITION_ID", position_id)
      this.$router.push({
        name: "position.edit",
        query: {
          position_id: position_id
        }
      });
    }
  },
  created() {
    this.fetchPosition();
  }
};
</script>

<style lang="scss" scoped>
.logo-section {
  width: 100%;
  background-color: $white-color;

  .logo-content {
    width: 100%;
    padding: 1rem;

  }
}
</style>
