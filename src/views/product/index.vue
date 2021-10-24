<template>
  <div id="Product">
    <section class="product--section">
      <div class="header product-header">
        <h1>{{ $t("Product.title") }}</h1>
        <v-btn @click="CreateProduct" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("Product.button") }}</v-btn
        >
      </div>
      <div class="product-content">
        <v-data-table
          :headers="$t('Product.table.headers')"
          :items="myProducts"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('Product.loadingtext')"
          v-if="myProducts != ''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('Product.txtsearch')"
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
              <td>{{ item.ProductName }}</td>
              <td>{{ item.CateProduct }}</td>
              <td>{{ item.decription }}</td>
              <td>{{ item.Picture }}</td>
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'product.edit'}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Product.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Product.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Product.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Product.table.options.delete')}}
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
          <h3>{{ $t("Product.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Product",

  data() {
    return {
      loading: false,
      myProducts: [
        {
          ProductName: "Phone",
          CateProduct: "Hardware",
          decription: "message something",
          Picture: "feokfkowofweorwo",
        },
      ],
      searchItem: "",
    };
  },

  mounted() {},

  methods: {
    CreateProduct() {
      this.$router
        .push({
          name: "product.create",
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.product--section {
  width: 100%;
  background-color: $white-color;

  .product-content {
    width: 100%;
    padding: 1rem;

  }
}
</style>