<template>
   <div id="CateProduct">
    <section class="cate_product-section">
      <div class="header cate_product-header">
        <h1>{{ $t("CateProduct.title") }}</h1>
        <v-btn @click="CreateCateProduct" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("CateProduct.button") }}</v-btn
        >
      </div>
      <div class="cate_product-content">
        <v-data-table
          :headers="$t('CateProduct.table.headers')"
          :items="myCateProduct"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('CateProduct.loadingtext')"
          v-if="myCateProduct != ''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('CateProduct.txtsearch')"
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
              <td>{{ item.CateProductName }}</td>
          
              <td>{{ item.description }}</td>
             
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'cate_product.edit'}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CateProduct.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CateProduct.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CateProduct.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CateProduct.table.options.delete')}}
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
          <h3>{{ $t("CateProduct.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
    name: 'CateProduct',

    data() {
        return {
             loading: false,
      myCateProduct: [
        {
          CateProductName: "M1",
       
          description: "1024MB",
      
        },
     
        
      ],
      searchItem: "",
        };
    },

    mounted() {
        
    },

    methods: {
        CreateCateProduct() {
      this.$router
        .push({
          name: "cate_product.create",
        })
        .catch(() => {});
    },
    },
};
</script>

<style lang="scss" scoped>
.cate_product-section {
  width: 100%;
  background-color: $white-color;

  .cate_product-content {
    width: 100%;
    padding: 1rem;

  }
}
</style>