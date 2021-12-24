<template>
   <div id="DataPackage">
    <section class="data_package-section">
      <v-skeleton-loader
          class="mx-auto"
          type="table"
          v-if="firstLoad"
      ></v-skeleton-loader>
      <div class="header data_package-header" v-show="!firstLoad">
        <h1>{{ $t("DataPackage.title") }}</h1>


          <v-btn @click="CreateDataPackage" class="btn btn-create">
            <v-icon>fal fa-plus-circle</v-icon>{{ $t("DataPackage.button") }}</v-btn>

      </div>

      <div class="data_package-content" v-show="!firstLoad">
        <v-data-table
          :headers="$t('DataPackage.table.headers')"
          :items="data_package['data']"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('DataPackage.loadingtext')"
          v-if="data_package['data'] != ''"
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
              <td>{{ item.la_name }}</td>

              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="onSimType(item.id)">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('DataPackage.table.options.simtypeIcon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('DataPackage.table.options.simtype')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                   <v-list-item link @click="$router.push({name:'data_package.edit',params:{
                      'data_package_id':item.id,
 
                   }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('DataPackage.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('DataPackage.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('DataPackage.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('DataPackage.table.options.delete')}}
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
              <td>{{ item.en_name }}</td>
           

           
             
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="onSimType(item.id)">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('DataPackage.table.options.simtypeIcon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('DataPackage.table.options.simtype')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                   <v-list-item link @click="$router.push({name:'data_package.edit',params:{
                      'data_package_id':item.id,
     
                   }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('DataPackage.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('DataPackage.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('DataPackage.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('DataPackage.table.options.delete')}}
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
       <ModalDelete>
        <template v-slot="{close}">
          <Delete :data_package_id="package_id" @close="close"/>
        </template>
      </ModalDelete>
    </section>

  </div>
</template>

<script>

import {mapActions,mapGetters} from 'vuex'
import Delete from "@/components/forms/packages/data_package/Delete";

export default {
    name: 'DataPackage',

components: {
    Delete
  },
    data() {
        return {
          package_id:'',
          isLaoLanguage:localStorage.getItem('lang') === 'la',
             loading: false,
         searchItem: "",
          firstLoad:true,

        };
    },

    mounted() {
        this.getDataPackage().then((res)=>{
          this.firstLoad = false;
        });
    },

    methods: {
      onSimType(data_package_id) {
        this.$router
            .push({
              name: "data_package.simtype",
              params:{'data_package_id':data_package_id,}
            })
            .catch(() => {});
      },
        CreateDataPackage() {
      this.$router
        .push({
          name: "data_package.create",
        })
        .catch(() => {});
    },
       onDelete(package_id) {
        this.package_id = package_id
     
      this.$store.commit("modalDelete_State", true);
    },

    ...mapActions({
      getDataPackage:'DataPackage/getDataPackage',
      getCateDataPackageOne:'CateDataPackage/getCateDataPackageOne'
    })
    },

    computed:{
      ...mapGetters({
        data_package:'DataPackage/data_package',
        cate_data_package_one:'CateDataPackage/cate_data_package_one'
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