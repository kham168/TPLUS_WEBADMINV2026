<template>
   <div id="DataPackage">
    <section class="data_package-section">
      <div class="header data_package-header">
        <h1>{{ $t("DataPackage.title") }}</h1>
        <v-btn @click="CreateDataPackage" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("DataPackage.button") }}</v-btn
        >
      </div>
      <div class="data_package-content">
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
              
              <td>{{ item.catePackageId }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
           
             
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'data_package.edit',params:{
                      'dataPackageId':item.id,
      'catePackageValue':item.catePackageId,
      'name':item.name,
      'nameEng':item.PackagesTrans[0].name,
      'description':item.description,
      'descriptionEng':item.PackagesTrans[0].description,
      'argImage':item.image,
      'argImageEng':item.PackagesTrans[0].image
                   }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('DataPackage.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('DataPackage.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
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
              <td><v-img :src="item.PackagesTrans[0].image" alt="preview" max-height="50" max-width="50"></v-img></td>
              
              <td>{{ item.catePackageId }}</td>
              <td>{{ item.PackagesTrans[0].name }}</td>
              <td>{{ item.PackagesTrans[0].description }}</td>
           
             
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'data_package.edit',params:{
                      'dataPackageId':item.id,
      'catePackageValue':item.catePackageId,
      'name':item.name,
      'nameEng':item.PackagesTrans[0].name,
      'description':item.description,
      'descriptionEng':item.PackagesTrans[0].description,
      'argImage':item.image,
      'argImageEng':item.PackagesTrans[0].image
                   }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('DataPackage.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('DataPackage.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
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
    </section>
  </div>
</template>

<script>

import {mapActions,mapGetters} from 'vuex'
export default {
    name: 'DataPackage',

    data() {
        return {
          isLaoLanguage:localStorage.getItem('lang') === 'la',
             loading: false,
         searchItem: "",
        };
    },

    mounted() {
        this.getDataPackage();
    },

    methods: {
        CreateDataPackage() {
      this.$router
        .push({
          name: "data_package.create",
        })
        .catch(() => {});
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

  }
}
</style>