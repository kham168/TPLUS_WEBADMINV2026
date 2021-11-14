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
          :items="myCateDataPackage"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('CateDataPackage.loadingtext')"
          v-if="myCateDataPackage != ''"
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
            <tr class="table-content">
              <td>{{ index + 1 }}</td>
              <td>{{ item.CateDataPackageName }}</td>
          
              <td>{{ item.description }}</td>
             
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'cate_data_package.edit'}).catch(()=>{})">
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
export default {
    name: 'CateDataPackage',

    data() {
        return {
             loading: false,
      myCateDataPackage: [
        {
          CateDataPackageName: "M1",
       
          description: "1024MB",
      
        },
     
        
      ],
      searchItem: "",
        };
    },

    mounted() {
        
    },

    methods: {
        CreateCateDataPackage() {
      this.$router
        .push({
          name: "cate_data_package.create",
        })
        .catch(() => {});
    },
    },
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