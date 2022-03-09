<template>
  <div id="DataPackage">
    <section class="data_package-section">
      <v-skeleton-loader
          class="mx-auto"
          type="table"
          v-if="firstLoad"
      ></v-skeleton-loader>
      <div class="header data_package-header" v-show="!firstLoad">
        <h1><span @click="onBack" style="margin-right: 10px;color: #4b96da;cursor: pointer">
          <i class="fas fa-arrow-circle-left"></i></span>{{ $t("DataPackage.button_fill") }}</h1>

        <v-btn @click="onCreate" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("DataPackage.button_fill") }}</v-btn>

      </div>

      <div class="data_package-content" v-show="!firstLoad">
        <v-data-table
            :headers="$t('DataPackage.table.headers_simtype')"
            :items="package_simtype_one"
            :search="searchItem"
            :loading="loading"
            :loading-text="$t('DataPackage.loadingtext')"
            v-if="package_simtype_one != ''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                  :label="$t('DataPackage.txtsearch')"
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

            <tr class="table-content" v-if="isLaoLanguage">
              <td>{{ index + 1 }}</td>
              <td><v-img :src="item.image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.typePackage.type_name }}</td>
              <td>{{ item.categoryPackage.cateName }}</td>

              <td><p v-for="element in item.simTypes">{{element.detail}}</p>
                <v-icon color="red" v-if="item.simTypes.length===0">mdi-minus</v-icon>
              </td>

              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{on,attrs}">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>

                    <v-list-item link @click="onDelete">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{$t('DataPackage.table.options.delsimtypeIcon')}}</v-icon>
                        <v-list-item-title>
                          {{$t('DataPackage.table.options.delsimtype')}}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>

            <tr class="table-content" v-else>
              <td>{{ index + 1 }}</td>
              <td><v-img :src="item.image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.code }}</td>
              <td>{{ item.NewPackageTrans[0].name }}</td>
              <td>{{ item.typePackage.TypePackagTrans[0].type_name }}</td>
              <td>{{ item.categoryPackage.CatePackageTrans[0].cateName }}</td>

              <td >
                <p v-for="element in item.simTypes" >{{element.detail}}</p>
                <v-icon color="red" v-if="item.simTypes.length===0">mdi-minus</v-icon>
              </td>

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
                        <v-icon class="mr-3" small>{{$t('DataPackage.table.options.delsimtypeicon')}}</v-icon>
                        <v-list-item-title>
                          {{$t('DataPackage.table.options.delsimtype')}}
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
          <h3>{{ $t("DataPackage.table.dontdata") }}</h3>
        </div>
      </div>
<!--      <ModalDelete>-->
<!--        <template v-slot="{close}">-->
<!--          <Delete :data_package_id="package_id" @close="close"/>-->
<!--        </template>-->
<!--      </ModalDelete>-->

      <ModalAdd>
        <template v-slot="{ close }">
          <fillSimType @close="close" @success="getSimTypePackage"/>
        </template>
      </ModalAdd>

      <ModalDelete>
        <template v-slot="{ close }">
          <removeSimType @close="close" @success="getSimTypePackage"/>
        </template>
      </ModalDelete>
    </section>

  </div>
</template>

<script>

import {mapActions,mapGetters} from 'vuex'
import Delete from "@/components/forms/packages/data_package/Delete";
import fillSimType from "@/components/forms/packages/data_package/fillSimType";
import removeSimType from "@/components/forms/packages/data_package/removeSimType";
export default {
  name: 'DataPackage',

  components: {
    Delete,
    fillSimType,
    removeSimType
  },
  data() {
    return {
      package_id:'',
      isLaoLanguage:localStorage.getItem('lang') === 'la',
      loading: false,
      searchItem: "",
      data_package_one:[],
      firstLoad:true,

    };
  },

  created() {
    this.packageSimTypeOne({'package_id':this.$route.params.data_package_id}).then(res=>{
      this.firstLoad=false;
    });

  },

  methods: {
    onBack(){
      this.$router.push({
        name: "data_package.index"
      })
    },
    onCreate() {
      this.$store.commit("modalAdd_State", true);
    },
    onDelete() {


      this.$store.commit("modalDelete_State", true);
    },

    ...mapActions({


      getDataPackageOne:'DataPackage/getDataPackageOne',
      getSimTypePackage:'SimTypePackage/getSimTypePackage',
      packageSimTypeOne:'DataPackage/packageSimTypeOne'
    })
  },

  computed:{
    ...mapGetters({
      package_simtype_one:'DataPackage/package_simtype_one',
      sim_type_package:'SimTypePackage/sim_type_package',
    })
  }
};
</script>

<style lang="scss" scoped>
.data_package-section {
  width: 100%;
  background-color: $white-color;

  .data_package-content {
    width: 100%;
    padding: 1rem;
    .text-limit{
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

  }
}
</style>