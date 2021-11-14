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
          :items="myDataPackage"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('DataPackage.loadingtext')"
          v-if="myDataPackage != ''"
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
            <tr class="table-content">
              <td>{{ index + 1 }}</td>
              <td>{{ item.DataPackageName }}</td>
              <td>{{ item.CateDataPackage }}</td>
              <td>{{ item.description }}</td>
             
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'data_package.edit'}).catch(()=>{})">
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
export default {
    name: 'DataPackage',

    data() {
        return {
             loading: false,
      myDataPackage: [
        {
          DataPackageName: "M1",
          CateDataPackage: "on day",
          description: "1024MB",
          Picture:"",
      
        },
        {
          DataPackageName: "M2",
          CateDataPackage: "on week",
          description: "5120MB",
           Picture:"",
      
        },
        
      ],
      searchItem: "",
        };
    },

    mounted() {
        
    },

    methods: {
        CreateDataPackage() {
      this.$router
        .push({
          name: "data_package.create",
        })
        .catch(() => {});
    },
    },
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