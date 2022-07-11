<template>
  <div id="CatePost">
    <section class="cate_post-section">
      <div class="header cate_post-header">
        <h1>{{ $t("CatePost.title") }}</h1>
        <v-btn @click="CreateCatePost" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("CatePost.button") }}</v-btn
        >
      </div>
      <div class="cate_post-content">
        <v-data-table
          :headers="$t('CatePost.table.headers')"
          :items="cate_post['data']"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('CatePost.loadingtext')"
          v-if="cate_post['data'] != []"
          :footer-props="{
            'items-per-page-text': $t('row_per_page'),
          }"
          :no-data-text="$t('no_data')"
        >
          <template v-slot:[`footer.page-text`]="items">
            {{ items.pageStart }} - {{ items.pageStop }} {{ $t("of") }}
            {{ items.itemsLength }}
          </template>
        
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('CatePost.txtsearch')"
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



              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'cate_post.edit',params:{
                         'cate_post_id':item.id,
     }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CatePost.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CatePost.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CatePost.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CatePost.table.options.delete')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                 </v-list>
               </v-menu>
              </td>
            </tr>

            <tr class="table-content" v-else>
              <td>{{ index + 1 }}</td>
              <td>{{ item.NewsCategoryTrans[0].name }}</td>


              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'cate_post.edit',params:{
                         'cate_post_id':item.id
     }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CatePost.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CatePost.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CatePost.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CatePost.table.options.delete')}}
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
          <h3>{{ $t("CatePost.table.dontdata") }}</h3>
        </div>
      </div>
             <ModalDelete>
        <template v-slot="{close}">
          <Delete :cate_post_id="cate_post_id" @close="close"/>
        </template>
      </ModalDelete>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Delete from "@/components/forms/posts/cate_post/Delete";
export default {
  name: "CatePost",

components: {
    Delete
  },
  data() {
    return {
      cate_post_id:'',
      isLaoLanguage:localStorage.getItem('lang')==='la',
      loading: false,
     
      searchItem: "",
    };
  },

  mounted() {
    this.getCatePostAll();

  },

  methods: {
    CreateCatePost() {
      this.$router
        .push({
          name: "cate_post.create",
        })
        .catch(() => {});
    },
         onDelete(cate_post_id) {
        this.cate_post_id = cate_post_id
     
      this.$store.commit("modalDelete_State", true);
    },

    ...mapActions({
      getCatePostAll:'CatePost/getCatePostAll'
    })
  },
  computed:{
    ...mapGetters({
      cate_post:'CatePost/cate_post'
    })
  }
};
</script>

<style lang="scss" scoped>
.cate_post-section {
  width: 100%;
  background-color: $white-color;

  .cate_post-content {
    width: 100%;
    padding: 1rem;
    
    

  }
}
</style>