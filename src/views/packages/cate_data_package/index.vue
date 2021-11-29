<template>
   <div id="CateDataPackage">
    <section class="cate_data_package-section">
      <div class="header cate_data_package-header">
        <h1>{{ $t("CateDataPackage.title") }}</h1>
        <v-btn @click="CreateCateDataPackage" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("CateDataPackage.button") }}</v-btn
        >
      </div>
      <div class="cate_data_package-content">
        <v-data-table
          :headers="$t('CateDataPackage.table.headers')"
          :items="cate_data_package['data']"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('CateDataPackage.loadingtext')"
          v-if="cate_data_package['data'] != ''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('CateDataPackage.txtsearch')"
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
                   <v-list-item link @click="$router.push({name:'cate_data_package.edit',params:{'cateId':item.id,'cateName':item.name,'cateDescription':item.description,'cateNameEng':item.CatePackageTrans[0].name ,'cateDescriptionEng':item.CatePackageTrans[0].description }}).catch(()=>{console.log('failed')})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CateDataPackage.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CateDataPackage.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CateDataPackage.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CateDataPackage.table.options.delete')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                 </v-list>
               </v-menu>
              </td>
            </tr>

            <tr class="table-content" v-else>
              <td>{{ index + 1 }}</td>
              <td>{{ item.CatePackageTrans[0].name }}</td>
              <td>{{ item.CatePackageTrans[0].description }}</td>
             
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'cate_data_package.edit',params:{'cateId':item.id,'cateName':item.name,'cateDescription':item.description,'cateNameEng':item.CatePackageTrans[0].name ,'cateDescriptionEng':item.CatePackageTrans[0].description }}).catch(()=>{console.log('failed')})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CateDataPackage.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CateDataPackage.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CateDataPackage.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CateDataPackage.table.options.delete')}}
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
          <h3>{{ $t("CateDataPackage.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    name: 'CateDataPackage',

    data() {
        return {
          isLaoLanguage:localStorage.getItem('lang') === 'la',
             loading: false,
             searchItem: "",
        };
    },

    mounted() {
        this.getCateDataPackage();
    },

    methods: {
        CreateCateDataPackage() {
      this.$router
        .push({
          name: "cate_data_package.create",
        })
        .catch(() => {});
    },

    ...mapActions({
      getCateDataPackage:'CateDataPackage/getCateDataPackage'
    })
    },

    computed:{
      ...mapGetters({
        cate_data_package:'CateDataPackage/cate_data_package'
      })
    }
};
</script>

<style lang="scss" scoped>
.cate_data_package-section {
  width: 100%;
  background-color: $white-color;

  .cate_data_package-content {
    width: 100%;
    padding: 1rem;

  }
}
</style>