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
          :items="product['data']"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('Product.loadingtext')"
          v-if="product['data'] != ''"
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
            <tr class="table-content" v-if="isLaoLanguage">
              <td>{{ index + 1 }}</td>
                <td><v-img :src="item.ProductImages[0].image" alt="preview" max-height="50" max-width="50"></v-img></td>
                 <td>{{ item.productName }}</td>
              <td ><p v-for="data in item.ProductCategories" :key="data.id" >{{data.cateProductId}}</p></td>
          
              <td style="   max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;">{{ item.description }}</td>
              <td><v-btn icon @click="onShow(item.id)"> <v-icon large>
                mdi-eye
              </v-icon></v-btn></td>
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'product.edit',params:{
                       'product_id':item.id,

                   }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Product.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Product.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
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
             <tr class="table-content" v-else>
              <td>{{ index + 1 }}</td>
                <td><v-img :src="item.ProductImages[0].image" alt="preview" max-height="50" max-width="50"></v-img></td>
                <td>{{ item.ProductTrans[0].productName }}</td>
              <td ><p v-for="data in item.ProductCategories" :key="data.id" >{{data.cateProductId}}</p></td>
          
           
              <td style="   max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;">{{ item.description }}</td>
               <td><v-btn icon @click="onShow(item.id)"> <v-icon large>
                 mdi-eye
               </v-icon></v-btn></td>
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'product.edit',params:{
                       'product_id':item.id,

                   }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Product.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Product.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
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
            <v-img src="@/assets/Images/NoData.png"></v-img>
          </div>
          <h3>{{ $t("Product.table.dontdata") }}</h3>
        </div>
      </div>
                               <ModalDelete>
        <template v-slot="{close}">
          <Delete :product_id="product_id" @close="close" />
        </template>
      </ModalDelete>

      <ModalShow>
        <template v-slot="{close}">
          <Show :product_id="product_id" @close="close" />
        </template>
      </ModalShow>
    </section>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import Delete from "@/components/forms/products/Product/Delete";
import Show from "@/components/forms/products/Product/Show";
import ModalShow from "@/components/Modals/modalShow";
export default {
  name: "Product",

components: {
    Delete,
  Show,
  ModalShow
  },
  data() {
    return {
      product_id:'',
      isLaoLanguage:localStorage.getItem('lang') === 'la',
      loading: false,
      searchItem: "",
    };
  },

  mounted() {
   
    this.getProduct();
  },


  methods: {
   



    CreateProduct() {
      this.$router
        .push({
          name: "product.create",
        })
        .catch(() => {});
    },
          onDelete(product_id) {
        this.product_id = product_id
     
      this.$store.commit("modalDelete_State", true);
    },
    onShow(product_id) {
      this.product_id = product_id

      this.$store.commit("modalShow_State", true);
    },

    ...mapActions({
      getProduct:'Product/getProduct',
      getCateProductOne:'CateProduct/getCateProductOne'
    })
  },

  computed:{
    ...mapGetters({
      product:'Product/product',
      cate_product_one:'CateProduct/cate_product_one'
    })
  }
};
</script>

<style lang="scss" scoped>
.product--section {
  width: 100%;
  background-color: $white-color;

  .product-content {
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