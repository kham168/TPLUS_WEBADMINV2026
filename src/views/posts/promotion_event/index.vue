<template>
  <div id="PromotionEvent">
    <section class="promotionEvent-section">
        
      <div class="header promotionEvent-header">
        <h1>{{ $t("PromotionEvent.title") }}</h1>
        <v-btn @click="CreatePost" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("PromotionEvent.button") }}</v-btn
        >
      </div>
     
      <div class="promotionEvent-content">
        <v-data-table
          :headers="$t('PromotionEvent.table.headers')"
          :items="promotion_event['data']"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('PromotionEvent.loadingtext')"
          v-if="promotion_event['data'] != ''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('PromotionEvent.txtsearch')"
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
        
          <template v-slot:item="{item , index}">
            <tr class="table-content" v-if="isLaoLanguage">
              <td>{{ index + 1 }}</td>
              <td><v-img :src="item.PostImages[0].image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.title }}</td>
              <td v-if="item.postTypeId === 1">ໂປຣໂມຊັນ</td>
              <td v-else-if="item.postTypeId === 3">ກິດຈະກຳ</td>
              <td style="   max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;">{{ item.description }}</td>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>

              <td>{{ item.status }}</td>
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
                   <v-list-item link @click="$router.push({name:'promotion_event.edit',params:{
                   'promotion_event_id':item.id,
      }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('PromotionEvent.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('PromotionEvent.title')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Post.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Post.table.options.delete')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                 </v-list>
               </v-menu>
              </td>
            </tr>
            <tr class="table-content" v-else>
              <td>{{ index + 1 }}</td>
              <td><v-img :src="item.PostImageTrans[0].image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.PostTrans[0].title }}</td>
              <td>{{ item.postTypeId }}</td>
              <td style="   max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;">{{ item.PostTrans[0].description }}</td>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.status }}</td>
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
                   <v-list-item link @click="$router.push({name:'promotionEvent.edit',params:{      
                     'promotion_event_id':item.id,
      }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('PromotionEvent.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('PromotionEvent.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('PromotionEvent.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('PromotionEvent.table.options.delete')}}
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
          <h3>{{ $t("PromotionEvent.table.dontdata") }}</h3>
        </div>
      </div>
                   <ModalDelete>
        <template v-slot="{close}">
          <Delete :promotion_event_id="promotion_event_id" @close="close" />
        </template>
      </ModalDelete>

      <ModalShow>
        <template v-slot="{close}">
          <Show :promotion_event_id="promotion_event_id" @close="close" />
        </template>
      </ModalShow>
    </section>
  </div>
  
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Delete from "@/components/forms/posts/promotion_event/Delete";
import Show from "@/components/forms/posts/promotion_event/Show";
import ModalShow from "@/components/Modals/modalShow";
export default {
  
  name: "PromotionEvent",

components: {
    Delete,
  Show,
  ModalShow
  },
  data() {
    return {
      promotion_event_id:'',
      isLaoLanguage:localStorage.getItem('lang') === 'la',
      image:'@/src/assets/logo.png',
      loading: false,
    
      searchItem: "",
   
 
    };
  },

  mounted() {
    
    this.getPromotionEvent()

  },

  methods: {
    load(){
      console.log('load')

    
    },

    CreatePost() {
      this.$router
        .push({
          name: "promotion_event.create",
        })
        .catch(() => {});
    },
     onDelete(promotion_event_id) {
        this.promotion_event_id = promotion_event_id
     
      this.$store.commit("modalDelete_State", true);
    },
    onShow(promotion_event_id) {
      this.promotion_event_id = promotion_event_id

      this.$store.commit("modalShow_State", true);
    },

           ...mapActions({
getPromotionEvent:'PromotionEvent/getPromotionEvent',
getCatePostOne:'CatePost/getCatePostOne'


        } 
        )
  },
 
  computed:{
    ...mapGetters({
        promotion_event:'PromotionEvent/promotion_event',
        cate_post_one:'CatePost/cate_post_one'
    

        })
  }
};
</script>

<style lang="scss" scoped>
.promotionEvent-section {
  width: 100%;
  background-color: $white-color;

  .promotionEvent-content {
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